import { CoordinateMapper } from './service/CoordinateMapper';
import { NormalizedLandmarkList } from '@mediapipe/pose';
import { HandPoseDetector } from "./service/poseCameraProcessor";
import { CanvasRenderer } from "./service/canvasRenderer";
import * as THREE from 'three';
import { config } from './config/HandTracker_config';
import { ThreeJsManager } from './service/ThreeManager';

const videoElement = document.getElementsByClassName('input_video')[0] as HTMLVideoElement;
const canvasElement = document.getElementById('canvasElement') as HTMLCanvasElement;
const canvasCtx = canvasElement.getContext('2d');
const threeManager = new ThreeJsManager();

const handPoseDetector = new HandPoseDetector(videoElement, config);
const canvasRenderer = new CanvasRenderer(canvasCtx)

handPoseDetector.start();


function animate() {
    requestAnimationFrame(animate);

    const normalizedLandmarkList = handPoseDetector.getHandPosition();
    const results = handPoseDetector.results;
    console.log(results);
    if (normalizedLandmarkList) {
        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;

        for (let i = 0; i < normalizedLandmarkList[0].length; i++) {
            const landmark = normalizedLandmarkList[0][i];
            const newPos = CoordinateMapper.mapToThreejsCoords(landmark.x * videoWidth, landmark.y * videoHeight, videoWidth, videoHeight, threeManager.getCamera());
            threeManager.setLandmarkPostions(i, -newPos.x, newPos.y,)
        }
    }


    threeManager.renderScene();
    canvasRenderer.render(results);
}

animate();





