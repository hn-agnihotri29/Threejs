import { useMatcapTexture ,Center ,Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef,useEffect, useState } from 'react'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{

    // const [ torusGeometry, setTorusGeometry ] = useState()
    // const [ material, setMaterial ] = useState()

    // const donutsGroup = useRef()
    const donuts = useRef( [] )

    const tempArray = [...Array(100)]
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)



    useEffect(() => {

        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])


    useFrame((state, delta) => {
        // for( const donut of donutsGroup.current.children ) {
        //     donut.rotation.y += delta * 0.2
        // }

         for(const donut of donuts.current) {
            donut.rotation.y += delta * 0.1
         }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry}  args={ [ 1, 0.6, 16, 32 ] } />
        <meshMatcapMaterial  ref={ setMaterial } matcap={ matcapTexture } /> */}

        <Center>
            <Text3D 
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.10 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
                material={ material }
            >
                HELLO R3F
            </Text3D>
        </Center>

        {/* <group ref={ donutsGroup }>
            { [...Array(100)].map((value, index)=> 
                <mesh
                    key={index}
                    geometry={torusGeometry}
                    material={ material }
                    position={ [
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15
                    ] }
                    scale={ 0.2 + Math.random() * 0.2 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ] }
                />
            ) }
        </group> */}

        { [...Array(100)].map((value, index)=> 
                <mesh
                    ref={ (element) => donuts.current[index] = element }
                    key={index}
                    geometry={torusGeometry}
                    material={ material }
                    position={ [
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15
                    ] }
                    scale={ 0.2 + Math.random() * 0.2 }
                    rotation={ [
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ] }
                />
            ) }
        

        
    </>
}