precision mediump float;

// varying float vRandom;
uniform vec3 ucolor;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;


void main()
{   
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    // gl_FragColor = vec4(ucolor, 1.0);
    gl_FragColor = textureColor;
}