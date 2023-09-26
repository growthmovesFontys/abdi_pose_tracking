import { Pose, Results, InputMap } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { CanvasRenderer } from './canvasRenderer';

export class PoseCameraProcessor {
  private pose: Pose;
  private camera: Camera;
  private canvasRenderer:CanvasRenderer;

  constructor(private videoElement: HTMLVideoElement, canvasRenderer: CanvasRenderer) {
    this.initPose();
    this.initCamera();
    this.canvasRenderer = canvasRenderer;
  }

  private initPose() {
    this.pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    this.pose.onResults((results: Results) => this.canvasRenderer.render(results));


  }

  private initCamera() {
    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {
        const inputs: InputMap = { image: this.videoElement };
        await this.pose.send(inputs);
      },
      width: 1280,
      height: 720
    });
  }
  



  public start() {
    this.camera.start();
  }
}
