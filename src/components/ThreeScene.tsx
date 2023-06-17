"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#fff");
    ambientLight.position.set(0, 0, 5);
    scene.add(ambientLight);

    const cubeSize = 1;
    const spacing = 0.05;
    const gridSpacing = cubeSize + spacing;

    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = [
      new THREE.MeshPhongMaterial({ color: "#8f1818" }), // Vermelho
      new THREE.MeshPhongMaterial({ color: "#488f18" }), // Verde
      new THREE.MeshPhongMaterial({ color: "#18488f" }), // Azul
      new THREE.MeshPhongMaterial({ color: "#b78108" }), // Amarelo
      new THREE.MeshPhongMaterial({ color: "#fff" }), // Branco
      new THREE.MeshPhongMaterial({ color: "#cc5e1b" }), // Laranja
    ];

    const cubeGroup = new THREE.Group();

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(x * gridSpacing, y * gridSpacing, z * gridSpacing);
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      cubeGroup.rotation.x += 0.01;
      cubeGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={sceneRef}></div>;
};

export default ThreeScene;
