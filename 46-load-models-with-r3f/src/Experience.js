import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import Model from './Model.js'
import PlacerHolder from './Placeholder.js'
import Hamburger from './Hamburger.js'
import Fox from './Fox.js'


export default function Experience()
{

    // const model = useLoader(
    //     GLTFLoader, 
    //     './hamburger-draco.glb',
    //     (loader) => {
    //         const dracoLoader = new DRACOLoader()
    //         dracoLoader.setDecoderPath('./draco/')
    //         loader.setDRACOLoader(dracoLoader)
    //     }
    // )

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias />
        <ambientLight intensity={ 0.5 } />

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Suspense
            fallback={ <PlacerHolder position-y={0.5} scale={[2,3,2]}/> }
        >
            <Hamburger scale={0.35} />
        </Suspense>

        <Fox />

    </>
}