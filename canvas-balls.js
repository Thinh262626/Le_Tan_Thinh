const techIcons = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg'
];

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById('three-balls-wrapper');
    if (!wrapper || typeof THREE === 'undefined') return;

    techIcons.forEach(iconUrl => {
        const container = document.createElement('div');
        container.style.width = '112px';
        container.style.height = '112px';
        container.style.cursor = 'grab';
        
        // Add shadow under ball like in template
        const shadow = document.createElement('div');
        shadow.style.width = '60px';
        shadow.style.height = '10px';
        shadow.style.background = 'rgba(0,0,0,0.5)';
        shadow.style.borderRadius = '50%';
        shadow.style.margin = '0 auto';
        shadow.style.filter = 'blur(4px)';
        shadow.style.transform = 'translateY(-10px)';

        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = 'center';
        
        wrap.appendChild(container);
        wrap.appendChild(shadow);
        wrapper.appendChild(wrap);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2.8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(112, 112);
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        
        controls.addEventListener('start', () => { container.style.cursor = 'grabbing'; });
        controls.addEventListener('end', () => { container.style.cursor = 'grab'; });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(0, 0, 2);
        scene.add(dirLight);

        const group = new THREE.Group();
        scene.add(group);

        const geometry = new THREE.IcosahedronGeometry(1, 2);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3d3d3d,
            flatShading: true,
            polygonOffset: true,
            polygonOffsetFactor: -5
        });
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = "Anonymous";
        textureLoader.load(iconUrl, (texture) => {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            
            const decalMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                map: texture,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: -4,
                flatShading: true
            });
            
            // Decal position and orientation
            const position = new THREE.Vector3(0, 0, 1);
            const orientation = new THREE.Euler(0, 0, 0);
            const size = new THREE.Vector3(1.2, 1.2, 1.2);
            
            const decalGeo = new THREE.DecalGeometry(mesh, position, orientation, size);
            const decalMesh = new THREE.Mesh(decalGeo, decalMaterial);
            group.add(decalMesh);
        });

        let time = Math.random() * 100;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.03;
            const floatY = Math.sin(time) * 0.1;
            group.position.y = floatY;
            shadow.style.transform = `scale(${1 - floatY * 0.5}) translateY(-10px)`;
            shadow.style.opacity = 0.6 - floatY;

            group.rotation.x += 0.005;
            group.rotation.y += 0.005;
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    });
});
