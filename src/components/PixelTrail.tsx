import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial, useFBO } from '@react-three/drei';
import * as THREE from 'three';

// --- Shaders ---

// 1. Brush Shader: Draws the mouse trail with noise
const BrushMaterial = shaderMaterial(
    {
        uMap: new THREE.Texture(), // Previous frame
        uMouse: new THREE.Vector2(0, 0),
        uPrevMouse: new THREE.Vector2(0, 0),
        uAspect: 1,
        uSize: 0.1, // Brush size
        uTime: 0,
    },
    // Vertex
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment
    `
    uniform sampler2D uMap;
    uniform vec2 uMouse;
    uniform vec2 uPrevMouse;
    uniform float uAspect;
    uniform float uSize;
    uniform float uTime;
    varying vec2 vUv;

    // Simplex Noise (2D)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float line(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a;
        vec2 ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return length(pa - ba * h);
    }

    void main() {
        vec2 uv = vUv;
        vec2 mouse = uMouse;
        vec2 prevMouse = uPrevMouse;
        
        uv.x *= uAspect;
        mouse.x *= uAspect;
        prevMouse.x *= uAspect;

        float d = line(uv, prevMouse, mouse);
        
        // Add noise to the distance field to make edges abstract
        float n = snoise(uv * 10.0 + uTime * 5.0) * 0.05;
        d += n;

        float alpha = 1.0 - smoothstep(0.0, uSize, d);
        
        vec4 old = texture2D(uMap, vUv);
        // FIX: Write intensity to Red channel (not just full white)
        float final = max(old.r, alpha);
        gl_FragColor = vec4(final, final, final, 1.0);
    }
    `
);

// 2. Simulation/Feedback Shader: Enhanced distortion
const SimulationMaterial = shaderMaterial(
    {
        uMap: new THREE.Texture(),
        uDecay: 0.98,
        uTime: 0,
    },
    // Vertex
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment
    `
    uniform sampler2D uMap;
    uniform float uDecay;
    uniform float uTime;
    varying vec2 vUv;

    // Simple noise
     vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
        vec2 uv = vUv;
        
        // Fluid distortion: Curl noise approximation or simple offset noise
        float n = snoise(uv * 5.0 + uTime * 0.5); // Large scale flow
        vec2 offset = vec2(n, snoise(uv * 5.0 + uTime * 0.5 + 100.0)) * 0.003; // Small distortion
        
        uv += offset;

        vec4 color = texture2D(uMap, uv);
        
        // Decay
        color.r *= uDecay;
        
        gl_FragColor = color;
    }
    `
);

// 3. Display Shader: Uses the simulation texture as a mask
const DisplayMaterial = shaderMaterial(
    {
        uTexture: new THREE.Texture(), // The reveal image
        uMask: new THREE.Texture(),    // The simulation (FBO)
        uOpacity: 1.0,
    },
    // Vertex
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment
    `
    uniform sampler2D uTexture;
    uniform sampler2D uMask;
    uniform float uOpacity;
    varying vec2 vUv;

    void main() {
        vec4 tex = texture2D(uTexture, vUv);
        vec4 mask = texture2D(uMask, vUv);
        
        // Create smooth water edge
        float alpha = smoothstep(0.0, 0.2, mask.r);
        
        gl_FragColor = vec4(tex.rgb, tex.a * alpha * uOpacity);
    }
    `
);

// EXTEND must safely call now that shaders are defined
extend({ BrushMaterial, SimulationMaterial, DisplayMaterial });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            brushMaterial: any;
            simulationMaterial: any;
            displayMaterial: any; // FIX: Ensure this is typed as any or specific props
        }
    }
}

interface PixelTrailProps {
    image2: string; // The reveal image
    image1?: string; // Unused in this mode
    trailSize?: number; // Brush size
    maxAge?: number; // Decay speed (mapped)
    interpolate?: number; // Not heavily used here
    className?: string;
    active?: boolean; // FIX: Added active prop
    // Legacy props to ignore
    gridSize?: any;
    gooey?: any;
    gooeyStrength?: any;
}

function FluidReveal({ image2, trailSize = 0.1, maxAge = 0.98 }: any) {
    const { viewport, size, gl } = useThree();
    const texture = useTexture(image2);

    // FBOs for ping-pong buffering
    const simFBO = useFBO(size.width, size.height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat, // Use RGBA for safety against RED format issues
        type: THREE.FloatType,
    });
    const brushFBO = useFBO(size.width, size.height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    });

    const brushMat = useRef<any>(null);
    const simMat = useRef<any>(null);
    const displayMat = useRef<any>(null);

    // Remove memoized singletons that might cause issues if context is lost
    // Create meshes inside the component logic or use refs, but React Three Fiber usually handles reconstruction.
    // However, recreating geometries/materials every frame is bad.
    // Let's use standard refs and effects.

    const mouse = useRef(new THREE.Vector2(0.5, 0.5));
    const prevMouse = useRef(new THREE.Vector2(0.5, 0.5));

    // Initialization: Clear FBOs to black to ensure transparency
    useEffect(() => {
        const clearColor = gl.getClearColor(new THREE.Color());
        const clearAlpha = gl.getClearAlpha();

        gl.setClearColor(0x000000, 0);

        gl.setRenderTarget(simFBO);
        gl.clear();
        gl.setRenderTarget(brushFBO);
        gl.clear();

        gl.setRenderTarget(null);
        gl.setClearColor(clearColor, clearAlpha);
    }, [gl, simFBO, brushFBO]);

    useFrame((state) => {
        const currentMouseX = (state.mouse.x + 1) / 2;
        const currentMouseY = (state.mouse.y + 1) / 2;

        mouse.current.set(currentMouseX, currentMouseY);

        if (brushMat.current) {
            brushMat.current.uMouse = mouse.current;
            brushMat.current.uPrevMouse = prevMouse.current;
            brushMat.current.uMap = simFBO.texture;
            brushMat.current.uAspect = size.width / size.height;
            brushMat.current.uSize = trailSize;
            brushMat.current.uTime = state.clock.elapsedTime;
        }

        // 1. Draw Brush to BrushFBO
        gl.setRenderTarget(brushFBO);
        gl.render(sceneBrush, camera);

        // 2. Update Simulation (Decay)
        if (simMat.current) {
            simMat.current.uMap = brushFBO.texture;

            const decay = 1.0 - (1.0 / (Math.max(maxAge, 100) * 0.5));
            simMat.current.uDecay = decay;
            simMat.current.uTime = state.clock.elapsedTime;
        }

        gl.setRenderTarget(simFBO);
        gl.render(sceneSim, camera);

        gl.setRenderTarget(null); // Back to screen

        prevMouse.current.copy(mouse.current);
    });

    // Scene setup for offscreen rendering
    // We can use useMemo to create these once
    const sceneBrush = useMemo(() => new THREE.Scene(), []);
    const sceneSim = useMemo(() => new THREE.Scene(), []);
    const camera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

    // Create meshes once and add to scenes
    useMemo(() => {
        // Clear scenes first just in case
        sceneBrush.clear();
        sceneSim.clear();

        const brushMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
        brushMat.current = new BrushMaterial();
        brushMesh.material = brushMat.current;
        sceneBrush.add(brushMesh);

        const simMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
        simMat.current = new SimulationMaterial();
        simMesh.material = simMat.current;
        sceneSim.add(simMesh);
    }, [sceneBrush, sceneSim]);

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            {/* @ts-ignore */}
            <displayMaterial
                ref={displayMat}
                uTexture={texture}
                uMask={simFBO.texture}
                transparent
            />
        </mesh>
    );
}

export function PixelTrail({ image2, trailSize = 0.1, maxAge = 1000, className }: PixelTrailProps) {
    return (
        <div className={`w-full h-full ${className} pointer-events-none`}>
            <Canvas
                gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
                dpr={1}
                eventSource={document.getElementById('root') || document.body}
                eventPrefix="client"
                style={{ pointerEvents: 'none' }}
            >
                <FluidReveal image2={image2} trailSize={trailSize} maxAge={maxAge} />
            </Canvas>
        </div>
    );
}
