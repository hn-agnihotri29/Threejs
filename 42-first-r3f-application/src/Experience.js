import { useThree , extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import CustomObject from "./CustomObject"

extend({OrbitControls})


const Experience = () => {

    const {camera, gl} = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    /**
     * For animating the camera. so camera rotate around center of scene
     * -state.camera  inside the useFrame()
     * 
     */

    useFrame((state, delta) => {

        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0,0,0)

        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta
    })
  
    return (
        <>
            <orbitControls args={ [camera, gl.domElement] }/>

            <directionalLight position={ [1,2,3] } intensity={1.5} />
            <ambientLight intensity={0.5}/>

            <group ref={groupRef}>
                <mesh position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial  color="orange"/>
                </mesh>

                <mesh ref={cubeRef} scale={ 1.5 } position-x={2} rotation-y={Math.PI * 0.25}>
                    <boxGeometry scale={1.5}/>
                    <meshStandardMaterial  color="mediumpurple"/>
                </mesh>
            </group>
            
            <mesh scale={10} rotation-x={ - Math.PI * 0.5} position-y = {-1}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <CustomObject />
        </>
    )
}

export default Experience