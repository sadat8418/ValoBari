import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// working properly, used in allposts
export default function ThreeModelScene() {
  const mountRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth/2, mountRef.current.clientHeight/2);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.7;

    // Load model & fit camera
    const loader = new GLTFLoader();
    loader.load(
      '/models/house/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
          
        scene.add(model);
        // model.scale.set(0.1, 0.1, 0.1);
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = maxDim / (2 * Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );

    // Resize handler
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     renderer.dispose();
  //     controls.dispose();
  //     if (mountRef.current.contains(renderer.domElement)) {
  //       mountRef.current.removeChild(renderer.domElement);
  //     }
  //   };
  // }, 
  return () => {
  window.removeEventListener('resize', handleResize);
  renderer.dispose();
  controls.dispose();

  if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
    mountRef.current.removeChild(renderer.domElement);
  }
};},

  []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'relative',  // Ensures it covers whole screen
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '70vw',
        height: '70vh',
        margin: '0px -150px -250px 0px',
        padding: 0,
        zIndex: 0,
        backgroundColor: 'transparent',
      }}
    />
  );
}
