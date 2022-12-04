varying vec2 vUvs;

uniform sampler2D diffuse;
uniform sampler2D overlay;
uniform vec4 tint;

void main() {
  vec4 diffuseSample = texture2D(diffuse, vec2(vUvs.x, vUvs.y));
  vec4 overlaySample = texture2D(overlay, vec2(vUvs.x, vUvs.y));

  gl_FragColor = mix(diffuseSample, overlaySample, overlaySample.w);
}
