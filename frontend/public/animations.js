// Initialize Three.js scene with enhancements

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('animation-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create a more complex geometry with matching colors
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.5, roughness: 0.5 });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Adjusted animation for CTA button
    gsap.from('.cta-button', {
        duration: 1,
        y: 30,
        opacity: 1,
        delay: 1,
        ease: 'elastic.out(1, 0.5)'
    });

    // Adjusted animation for floating shapes
    gsap.to('.shape', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-360, 360)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
        stagger: {
            amount: 2,
            from: 'random'
        }
    });
}); 