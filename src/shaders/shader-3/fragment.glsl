varying vec2 vUvs;

uniform vec2 resolution;

void main() {
  vec3 color = vec3(0.75);

  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);
  vec3 yellow = vec3(1.0, 1.0, 0.0);
  vec3 white = vec3(1.0);
  vec3 black = vec3(0.0);

  // grid
  vec2 center = vUvs - 0.5;
  vec2 cell = fract(center * resolution / 100.0);
  cell = abs(cell - 0.5);

  float distToCell = 1.0 - 2.0 * max(cell.x, cell.y);
  float cellLine = smoothstep(0.0, 0.05, distToCell);
  
  float xAxis = smoothstep(0.0, 0.002, abs(vUvs.y - 0.5));
  float yAxis = smoothstep(0.0, 0.002, abs(vUvs.x - 0.5));

  // lines
  vec2 pos = center * resolution / 100.0;
  float value1 = pos.x;
  float value2 = abs(pos.x);
  float function1Line = smoothstep(0.0, 0.075, abs(pos.y - value1));
  float function2Line = smoothstep(0.0, 0.075, abs(pos.y - value2));

  color = mix(black, color, cellLine);
  color = mix(blue, color, xAxis);
  color = mix(blue, color, yAxis);
  color = mix(red, color, function1Line);
  color = mix(yellow, color, function2Line);

  gl_FragColor = vec4(color, 1.0);
}
