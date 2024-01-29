import { useGLTF,OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies,CylinderCollider,CuboidCollider, Debug, RigidBody, Physics } from '@react-three/rapier'

//trimesh, hull collider avoid for dynamic object create a custom collider settting collider to false

import { useMemo,useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"


/**
* onCollisionEnter  when the RigidBody hit something
  onCollisionExit --- when the RigidBody separates from the object it just hit
  onWake -- when rigid body stops sleeping
  onSleep --  when rigidbody starts sleeping 
*/


export default function Experience()
{

    const [ hitSound ] = useState(() => new Audio('./hit.mp3'))

  

    const cube  = useRef()
    const cubes = useRef()
    const twister = useRef()

    const cubeJump = () => {

        const mass = cube.current.mass()
        cube.current.applyImpulse({ x:0, y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({ 
            x: Math.random() - 0.5, 
            y: Math.random() - 0.5, 
            z: Math.random() - 0.5 
        })
    }

    useFrame((state) => {

        const time = state.clock.getElapsedTime()

        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)

        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle  = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2

        twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })

    })


    const collisionEnter = () => {

        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()

    }

    const hamburger = useGLTF('./hamburger.glb')

    const cubesCount = 100


    // useEffect(() => {

    //     for(let i = 0; i < cubesCount; i++) {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1,1,1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }

    // }, [])

    const cubesTransforms = useMemo(() => {
        const position = []
        const rotation = []
        const scales = []

        for(let i = 0; i < cubesCount; i++) {
            position.push([
                (Math.random() - 0.5) * 8,
                6 + i * 0.2,
                (Math.random() - 0.5) * 8
            ])
            rotation.push([
                Math.random(),
                Math.random(),
                Math.random()
            ])
            const scale = 0.2 + Math.random() * 0.8
            scales.push([scale, scale, scale])
        }

        return {
            position, rotation, scales
        }
    }, [])
    

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics>
            
            {/* <Debug />  */}

            <RigidBody colliders="ball">
                <mesh castShadow position={ [ -1.5, 2, 0 ] }>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/* <RigidBody colliders={ false } position={ [ 0, 1, 0 ] } rotation={ [Math.PI * 0.5, 0, 0 ] } >
                <CuboidCollider args={ [1.5, 1.5, 0.5] } />
                <mesh castShadow   >
                    <torusGeometry args={ [ 1, 0.5, 16, 32 ] }/>
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody> */}

            <RigidBody 
                ref={ cube } 
                position={ [ 1.5, 2, 0 ] } 
                gravityScale={ 1 } //default one 
                restitution={ 0 }
                friction={0.7}   
                colliders={false}
                onCollisionEnter={ collisionEnter }
                // onCollisionExit={ () => {console.log('exit')} }
            > 
                <mesh castShadow onClick={ cubeJump }  > 
                    <boxGeometry />
                    <meshStandardMaterial  color="mediumpurple" />
                </mesh>
                <CuboidCollider args={ [ 0.5, 0.5, 0.5 ] } mass={ 2 } />
            </RigidBody>
            

            <RigidBody 
                type='fixed'
                friction={ 0.7 }
            > 
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
            
            <RigidBody
                position={ [ 0, -0.8, 0 ] }
                friction={0}
                type="kinematicPosition"
                ref={ twister }
            >
                <mesh castShadow  scale={ [ 0.4, 0.4, 3 ] }>
                    <boxGeometry />
                    <meshStandardMaterial  color="red" />
                </mesh>
            </RigidBody>

            <RigidBody position={ [ 0, 4, 0 ] }  colliders={false} >
                <primitive object={hamburger.scene}  scale={0.25} />
                <CylinderCollider args={ [ 0.5, 1.25 ] }/>
            </RigidBody>

            <RigidBody>
                <CuboidCollider args={ [5, 2, 0.5] } position={ [ 0, 1, 5.25 ] }/>
                <CuboidCollider args={ [5, 2, 0.5] } position={ [ 0, 1, -5.25 ] }/>
                <CuboidCollider args={ [0.5, 2, 5] } position={ [ 5.25, 1, 0 ] }/>
                <CuboidCollider args={ [0.5, 2, 5] } position={ [ -5.25, 1, 0 ] }/>
            </RigidBody>

            <InstancedRigidBodies
                positions={ cubesTransforms.position }
                rotations={ cubesTransforms.rotation }
                scale={ cubesTransforms.scales }
            >
                <instancedMesh castShadow ref={cubes} args={ [ null, null, cubesCount ] } >
                    <boxGeometry />
                    <meshStandardMaterial color="tomato" /> 
                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>


    </>
}