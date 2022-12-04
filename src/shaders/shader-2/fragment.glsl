varying vec2 vUvs;

void main() {
  vec3 color = vec3(0.0);

  float value1 = vUvs.x;
  float value2 = smoothstep(0.0, 1.0, vUvs.x);
  // float value2 = clamp(vUvs.x, 0.25, 0.75);

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 white = vec3(1.0);

  if(vUvs.y > 0.5) {
    color = mix(red, blue, value1);
  } else {
    color = mix(red, blue, value2);
  }

  float line = smoothstep(0.0, 0.005, abs(vUvs.y - 0.5));
  float linearLine = smoothstep(0.0, 0.0075, abs(vUvs.y - mix(0.5, 1.0, value1)));
  float smoothLine = smoothstep(0.0, 0.0075, abs(vUvs.y - mix(0.0, 0.5, value2)));

  color = mix(white, color, line);
  color = mix(white, color, linearLine);
  color = mix(white, color, smoothLine);

  gl_FragColor = vec4(color, 1.0);
}
