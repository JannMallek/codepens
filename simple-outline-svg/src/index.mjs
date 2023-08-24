import "./styles.css";
import gsap from 'gsap'

const sizes = {
  x: 301.757,
  y: 74.464
}
const svg = document.querySelector("svg")
document.addEventListener("mousemove", (e)=>{
    gsap.to("ellipse", {attr:{
      cx: (e.offsetX / svg.getBoundingClientRect().width) * sizes.x,
      cy: (e.offsetY / svg.getBoundingClientRect().height) * sizes.y
    },
    delay: 0.1,
    ease:"expo.out",
    duration:1.4
  
  })
})