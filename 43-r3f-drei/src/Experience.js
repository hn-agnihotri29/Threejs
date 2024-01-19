import { MeshReflectorMaterial,Float, Text,Html,PivotControls,TransformControls, OrbitControls } from "@react-three/drei"
import { useRef } from "react"

/**
 * if meah is nested inside gizmo then transformControl first go on center then it 
 * need to take position of cube but still there is issue in this soltion
 * 2nd
 * Assigned TransformControl after mesh and use react useRef after then use ref in mesh
 * then associate it in TransformControl with object attribute.
 * 
 * HTML- Wrapclass let you add class to html parent class div of specific name
 *   occlude attribute use for masked the test form other object while overlapping
 *        we need to have a reference to the various objects that can occlude the label
 *        
 * 
*/

export default function Experience()
{

    const cube = useRef()
    const sphere = useRef()

    return <>

        <OrbitControls makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls 
            anchor={[0,0,0]} 
            depthTest={false}
            lineWidth={4}
            axisColors={ ['#9381ff', '#ff4d6d', '#7ae582'] }
            scale={100}
            fixed={true}
        >
            <mesh position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html 
                    position={[1,1,0]}
                    wrapperClass="label" 
                    center
                    distanceFactor={6}
                    occlude={ [sphere, cube] }
                >
                    That's a sphere 👍
                </Html>
            </mesh>
        </PivotControls>


        <mesh ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={ cube } mode="translate" />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial 
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.75}
                color="greenyellow"
            />
        </mesh>

        <Float speed={5} floatIntensity={2}>
            <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                color="salmon"
                position-y={2}
                maxWidth={2}
                textAlign="center"
            >I LOVE R3F</Text>
        </Float>
    </>
}