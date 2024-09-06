// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up physics world with Cannon.js
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Gravity in y-axis

// Create the diver (sphere) using Cannon.js for physics
const diverShape = new CANNON.Sphere(1); // radius 1
const diverBody = new CANNON.Body({
  mass: 75, // kg
  position: new CANNON.Vec3(0, 10, 0), // Starting position
  shape: diverShape
});
world.addBody(diverBody);

// Create a simple Three.js mesh for the diver
const diverGeometry = new THREE.SphereGeometry(1, 32, 32);
const diverMaterial = new THREE.MeshBasicMaterial({ color: 0x0077ff });
const diverMesh = new THREE.Mesh(diverGeometry, diverMaterial);
scene.add(diverMesh);

// Create the water (a plane at y = 0)
const waterGeometry = new THREE.PlaneGeometry(100, 100);
const waterMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff, side: THREE.DoubleSide });
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = Math.PI / 2; // Rotate to be horizontal
scene.add(water);

// Position the camera
camera.position.z = 15;
camera.position.y = 5;

function animate() {
  requestAnimationFrame(animate);

  // Step the physics world
  world.step(1 / 60);

  // Update the Three.js diver mesh position based on the Cannon.js body
  diverMesh.position.copy(diverBody.position);

  // Render the scene
  renderer.render(scene, camera);
}

// Call the animate loop
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
