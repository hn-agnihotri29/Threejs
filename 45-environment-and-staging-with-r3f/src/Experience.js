import { useFrame } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky,ContactShadows,RandomizedLight,AccumulativeShadows,softShadows,BakeShadows,useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from "three"
import { useControls } from 'leva'

//If we have static shadow it is better to use bakeShadow to stop the redereing
//To avoid shadow cutting sent top right bottom left near and far length of shadow camera
//AccumulativeShadow can be rendered on plane only remove receiveShadow from floor to avoid double Shadow


// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// })

export default function Experience()
{
    const cube = useRef()
    const directionalLight = useRef()

    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    
    useFrame((state, delta) =>
    {   
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })


    const {color, opacity, blur} = useControls('contact shadows', {
        color: '#503007',
        opacity: {value: 0.5, min: 0, max: 1},
        blur: {value: 1, min: 0,max: 10 }
    })  

    const {sunPosition} = useControls('sky', {
        sunPosition: {value: [ 1,2,3 ]}
    })

    const {envMapIntensity, envMapHeight, envMapRadius, envMapScale} = useControls('environmnet map', {
        envMapIntensity: {value: 3.5, min: 0, max: 10},
        envMapHeight: {value: 7, min: 0,max: 100},
        envMapRadius: {value: 28, min:10, max: 1000},
        envMapScale: {value: 100, min: 10, max: 1000}
    } )

    return <>

        {/* <Environment 
            // background
            files={ './environmentMaps/the_sky_is_on_fire_2k.hdr' }
            // preset="night"
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale,
            }}
        > */}
            {/* <color args={ [ '#000000' ] } attach="background" />
            <Lightformer 
                position-z={ -5 }
                scale={10}
                color="red"
                intensity={10}
                form="ring"
            /> */}
            {/* <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={ [ 2,0,0 ] } />
            </mesh> */}
        {/* </Environment> */}

        

        {/* <BakeShadows /> */}

        {/* <color args={['ivory']} attach='background'/> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/*
        It need to be lttle above the floor
        It not take light that we have provided
        */}
        {/* <AccumulativeShadows
            position={ [ 0,-0.99,0 ] }
            scale={10}
            color='#316d39'
            opacity={0.8}
            frames={ Infinity }
            temporal
            blend={100}
        >
            <RandomizedLight 
                amount={8}
                radius={1}
                ambient={0.5}
                intensity={1}
                position={ [ 1,2,3 ] }
                bias={0.001}
            />
        </AccumulativeShadows> */}

        {/* <ContactShadows 
            position={ [ 0, 0,0 ] }
            scale={ 10 }
            resolution={ 512 }
            far={ 5 }
            color={color}
            opacity={opacity}
            blur={blur}
        /> */}

        {/* <directionalLight 
            ref={directionalLight} 
            position={ sunPosition } 
            intensity={ 1.5 } 
            castShadow
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-top = { 5 }
            shadow-camera-right = { 5 }
            shadow-camera-bottom = { -5 }
            shadow-camera-left = { -5 }
            shadow-camera-near = {1}
            shadow-camera-far = {10}
        />
        <ambientLight intensity={ 0.5 } />

        <Sky 
            sunPosition={sunPosition}
        /> */}
        
        {/* <mesh castShadow position-y= { 1 } position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange"  envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={ cube } position-y= { 1 } position-x={ 2 } scale={ 1.5 }  >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
        </mesh> */}

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh> */}

        <Stage>
            <mesh castShadow position-y= { 1 } position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange"  envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh castShadow ref={ cube } position-y= { 1 } position-x={ 2 } scale={ 1.5 }  >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity}/>
            </mesh>
        </Stage>

    </>
}