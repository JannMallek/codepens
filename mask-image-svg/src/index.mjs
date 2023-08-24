import "./styles.css";
import gsap from 'gsap'

const sizes = {
  x: 303.778 -17.941,
  y: 79.413 - 185.814
  
}
document.addEventListener("mousemove", (e)=>{

  gsap.to("ellipse", {attr:{
    cx: (e.offsetX / document.querySelector("svg").getBoundingClientRect().width) * sizes.x + 120,
    cy: (-e.offsetY / document.querySelector("svg").getBoundingClientRect().height) * sizes.y + 170
  },
  delay: 0.1
})
})

