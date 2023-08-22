varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform float uProgress;
uniform sampler2D uDark;
uniform sampler2D uLight;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float noise(float p){
	float fl = floor(p);
  float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}
	
// float noise(vec2 n) {
// 	const vec2 d = vec2(0.0, 1.0);
//   vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
// 	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
// }

void main() {
    vec4 base = texture2D(uDark, vUv);
    vec4 target = texture2D(uLight, vUv);

    vec2 wavedUv = vec2( 
    vUv.x,
    vUv.y + sin(vUv.x * 10.0) * 0.3 * sin(uTime * 0.2) * 0.2
     );
    float mask =  1.0 - step(0.01, (distance(wavedUv, vec2(uMouse.x, -uMouse.y + 1.0)) - (0.15 + uProgress * 200.0)));

    vec4 outputColor = mix(base, target, mask);
    gl_FragColor = vec4(outputColor.xyz, 1.0);
}