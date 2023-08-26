import "./styles.css";
import gsap from 'gsap'
const svg = document.querySelector("svg")
const tl = gsap.timeline({paused: true})
const filter = document.querySelector("filter")


tl.to(".composite", {attr:{height: 13, width:13}, duration:0.5, ease:"sin.out"}, 0)
tl.to("feMorphology", {attr: {radius: 6.5}, duration:0.5, ease:"sin.out"}, 0)
svg.addEventListener("mouseenter", (e)=>{
  filter.setAttribute("bx:preset", "pixelete 1 13")
  tl.play()
})

svg.addEventListener("mouseleave", (e)=>{
  filter.setAttribute("bx:preset", "pixelete 1 1")
  tl.reverse()
})