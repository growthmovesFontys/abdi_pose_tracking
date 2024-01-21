import * as THREE from 'three';

/**
 * The ThreeJsManager class manages Three.js-related tasks such as creating a scene, camera, and renderer.
 */
export class ThreeJsManager {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private landmarks: THREE.Mesh[];

    /**
     * Constructs a new ThreeJsManager instance.
     */
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
        this.landmarks = [];
        this.createLandmark();
    }

    /**
     * Get the Three.js scene.
     * @returns The Three.js scene.
     */
    public getScene(): THREE.Scene {
        return this.scene;
    }

    /**
     * Get the Three.js camera.
     * @returns The Three.js camera.
     */
    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    /**
     * Get the Three.js renderer.
     * @returns The Three.js renderer.
     */
    public renderScene(): THREE.WebGLRenderer {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Add a mesh to the scene.
     * @param mesh - The Three.js mesh to add to the scene.
     */
    public addMesh(mesh: THREE.Mesh): void {
        this.scene.add(mesh);
    }

    /**
     * set landmarksPostion.
     * @returns The array of landmarks (Three.js meshes).
     */
    public setLandmarkPostions(postion: number, x: number, y: number): void {
        this.landmarks[postion].position.set(x, y);
    }

    /**
     * Create a landmark mesh and add it to the scene.
     * @returns void
     */
    private createLandmark(): void {
        const landmarkGeometry = new THREE.SphereGeometry(0.02, 32, 32);
        const landmarkMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        for (let i = 0; i < 21; i++) {
            const landmarkMesh = new THREE.Mesh(landmarkGeometry, landmarkMaterial);
            this.addMesh(landmarkMesh);
            this.landmarks.push(landmarkMesh);
        }

    }
}


