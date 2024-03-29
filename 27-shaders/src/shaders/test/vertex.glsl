uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 ufrequency;
uniform float utime;

attribute vec3 position;
attribute float aRandom;
attribute vec2 uv;

varying vec2 vUv;
// varying float vRandom;
varying float vElevation;


void main()
{    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);


    float elevation = sin(modelPosition.x * ufrequency.x - utime) * 0.1;
    elevation += sin(modelPosition.y * ufrequency.y - utime) * 0.1;

    modelPosition.z += elevation;

    // modelPosition.z += sin(modelPosition.x * ufrequency.x - utime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * ufrequency.y - utime) * 0.1;
    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;

    // vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;

    
}