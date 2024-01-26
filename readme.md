# MediaPipe Hand Tracking with Three.js Example

This project demonstrates how to integrate MediaPipe Hand Tracking with Three.js to create interactive web applications that track hand movements in real-time.

## Overview

MediaPipe is a powerful library for performing hand tracking and pose estimation tasks. When combined with Three.js, a popular JavaScript library for 3D graphics, it becomes possible to create interactive 3D experiences driven by hand movements.

### Prerequisites

To use this project, you'll need the following:

- Node.js
- npm (Node Package Manager)
- An HTML file with a `<video>` element on your webpage

## Installation

```bash
git clone https://github.com/your-username/mediapipe-hand-tracking-threejs.git
cd mediapipe-hand-tracking-threejs
npm install
npm run build
```

## Usage
Include the following script tag in your HTML file to use the bundled JavaScript:

```html
<script src="dist/bundle.js"></script>
```

Add a <video> element to your HTML file to capture the input video stream. Ensure that the video element has the class input_video for the script to detect it:

```html
<video class="input_video" playsinline autoplay></video>
```

Initialize hand tracking, Three.js, and the CoordinationMapper in your JavaScript file:

```typescript
import { HandPoseDetector } from "./service/poseCameraProcessor";
import * as THREE from 'three';
import { CoordinateMapper } from "./service/CoordinateMapper"; // Corrected import path
import { CanvasRenderer } from "./service/canvasRenderer";
import { ThreeJsManager } from './service/ThreeManager';

const videoElement = document.querySelector('.input_video');
const canvasElement = document.getElementById('canvasElement');
const canvasCtx = canvasElement.getContext('2d');
const threeManager = new ThreeJsManager();

// Configuration options for hand tracking
const handTrackingConfig = {
  // Add your hand tracking configuration options here
};

// Initialize hand tracking
const handPoseDetector = new HandPoseDetector(videoElement, handTrackingConfig);
handPoseDetector.start();

// ... (Rest of your code)

```
Map MediaPipe coordinates to Three.js coordinates and visualize hand movements:

```typescript
const normalizedLandmarkList = handPoseDetector.getHandPosition();
const videoWidth = videoElement.videoWidth;
const videoHeight = videoElement.videoHeight;

// Iterate over each detected landmark
for (let i = 0; i < normalizedLandmarkList[0].length; i++) {
    const landmark = normalizedLandmarkList[0][i];
    
    // Map the normalized landmark coordinates to Three.js coordinates
    const mappedCoords = CoordinateMapper.mapToThreejsCoords(
        landmark.x * videoWidth,
        landmark.y * videoHeight,
        videoWidth,
        videoHeight,
        threeManager.getCamera()
    );

    // In this section, you can create and update 3D objects based on the mapped coordinates.
    // For example, you can create spheres or other 3D objects and set their positions using the mapped coordinates.

    // Here's a simplified example of creating and updating a sphere:
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    sphere.position.set(-mappedCoords.x, mappedCoords.y, 0); // Set the sphere's position

    // Add the sphere to the scene
    scene.add(sphere);
}

// Render the updated scene
renderer.render(scene, camera);

// Render hand tracking results on the canvas
canvasRenderer.render(results);
```

## Proof of Concept
This project serves as a proof of concept, demonstrating the integration of MediaPipe Hand Tracking with Three.js. It showcases how to track hand movements using the webcam, map the MediaPipe coordinates to Three.js coordinates, and visualize hand movements in a 3D environment.

## Examples
You can find example code snippets in the Typescript file (main.ts) that demonstrate how to initialize hand tracking, map coordinates, and use Three.js to visualize hand movements. Feel free to explore and modify the examples to suit your needs.


## Credits
This project is created by Abdi and is open-source under the MIT License. Contributions and feedback are welcome!

Happy coding!
