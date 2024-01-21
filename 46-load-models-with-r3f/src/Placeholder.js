

const PlacerHolder = (props) => {
    return (
        <mesh {...props}>
            <boxGeometry />
            <meshBasicMaterial wireframe color="red" />
        </mesh>
    )
}

export default PlacerHolder