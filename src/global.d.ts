import { Object3DNode } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

declare module '@react-three/fiber' {
    interface ThreeElements {
        brushMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
        simulationMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
        displayMaterial: Object3DNode<ShaderMaterial, typeof ShaderMaterial>
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            brushMaterial: any
            simulationMaterial: any
            displayMaterial: any
        }
    }
}
