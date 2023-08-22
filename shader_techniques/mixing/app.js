import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

function Lerp(start, end, percentage)
{
    return (start + (end - start) * percentage);
}

export default class Sketch{
    constructor(options){
        this.container = options.dom;
        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.time = 0;
        this.lastTime = 0
        this.triggerdecay = {
            clientX: 0,
            clientY: 0,
            state: false
        }

        this.renderer = new THREE.WebGLRenderer({
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild(this.renderer.domElement);

       

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20);
        this.camera.position.z = 1;



        this.setupMouse()
        this.loadTextures()
        this.addObjects();
        this.setupResize()
        this.render();
    }

    loadTextures(){
        this.loader  = new THREE.TextureLoader()
    }

    setupResize(){
        window.addEventListener('resize', this.resize.bind(this));
    }

    setupMouse(){
        window.addEventListener("mousemove", (e)=>{
            
            this.triggerdecay.clientX = e.clientX
            this.triggerdecay.clientY = e.clientY
  
            })
            window.addEventListener("dblclick", (e)=>{
                this.triggerdecay.state = true
            })
    }


    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.angleMultiplier = 1291
        this.camera.updateProjectionMatrix();
        this.scale = 0
        const viewAspect = this.width / this.height
        const imageAspect = 1
        if(imageAspect > viewAspect){
            this.scale = [imageAspect/viewAspect, 1 ]
        } else {
            this.scale = [1, viewAspect/imageAspect]
        }
        this.mesh.scale.set( this.scale[0], this.scale[1], 1)
    }

    addObjects(){
        this.geometry = new THREE.PlaneGeometry(2,2,50,50);
        

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: {value: 0},
                uDark: { value: this.loader.load("./dark.png", (dark)=> dark)},
                uLight: {value: this.loader.load("./light.png", (light) => light)},
                uMouse: { value : { x: 0.0, y: 0.0}},
                uProgress: {value: 0}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        })

        this.material.side = 2
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }


    

    render(){
        this.time += 0.05;

        this.material.uniforms.uTime.value = this.time;

            this.material.uniforms.uMouse.value = {
                x: Lerp(this.material.uniforms.uMouse.value.x, (this.triggerdecay.clientX / this.width), 0.07),
                y: Lerp(this.material.uniforms.uMouse.value.y,  ( this.triggerdecay.clientY / this.height), 0.07)

        }

        if(this.triggerdecay.state){
            this.material.uniforms.uProgress.value = Lerp(this.material.uniforms.uProgress.value, 1.0, 0.0001)
        }



        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom: document.getElementById('container')
})