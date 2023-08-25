import "./styles.css";
import gsap from 'gsap'

const svg = document.querySelector("svg")
const rect = svg.querySelector("ellipse")

svg.addEventListener("mousemove", (e)=>{
    gsap.to(rect,{ attr:{
      cx: ((e.offsetX / svg.getBoundingClientRect().width) * 500),
      cy: ((e.offsetY / svg.getBoundingClientRect().height) * 500)},
    delay: 0.1,
    ease: "sin.in"
  })
})

svg.addEventListener("dblclick", ()=>{
  gsap.to(rect, {attr:{
    rx: 800,
    ry: 800
  },
  duration:3,
  ease:"sin.out",

})
})