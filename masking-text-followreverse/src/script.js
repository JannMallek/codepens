const follower= document.querySelector("ellipse")
const parent = document.querySelector("svg")
box = document.querySelector("svg").getBoundingClientRect()
parent.addEventListener("mousemove", (e)=>{
  gsap.to(follower, {attr: {
    cx:70 + (505- 70) * (e.offsetX / window.innerWidth),
    cy: 80 + (185- 80) *(e.offsetY / parent.getBoundingClientRect().height)
  }, ease:"power4", delay: 0.1})
  console.log(e.clientX / window.innerWidth)
})