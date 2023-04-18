import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import gsap from "gsap"

const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(3, 64, 64)

const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
})

const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight(" #6600ff", 1, 100)
light.position.set(0, 10, 10)
scene.add(light)
light.intensity = 1
// camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)

camera.position.z = 15
scene.add(camera)

// renderer
const canvas = document.querySelector(".webgl")

const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
// renderer.setSize(800, 600);
renderer.render(scene, camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = true
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3.5

const loop = () => {
  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(loop)
}
loop()

const tl = gsap.timeline({ defaults: { ease: "power1.out" } })

tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1, duration: 1 })
tl.fromTo("nav", { y: -100 }, { y: 0, duration: 1 })
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 })



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

//  mouse animation
let mouseDown = false
let rgb = []

addEventListener("mousedown", (e) => (mouseDown = true))
addEventListener("mouseup", (e) => (mouseDown = false))

addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      255,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})
