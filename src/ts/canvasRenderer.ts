import { Results, POSE_CONNECTIONS, ResultsListener } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export class CanvasRenderer {
  private canvasCtx: CanvasRenderingContext2D;

  constructor(canvasCtx: CanvasRenderingContext2D) {
    this.canvasCtx = canvasCtx;
  }
  
  public render: ResultsListener = (results: Results) => {
    if (!results.poseLandmarks) return;

    this.canvasCtx.save();
    this.canvasCtx.scale(-1, 1);  
    this.canvasCtx.translate(-this.canvasCtx.canvas.width, 0);  
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    this.canvasCtx.drawImage(
      results.image as CanvasImageSource, 0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height
    );
    
    drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {color: '#00FF00', lineWidth: 4});
    drawLandmarks(this.canvasCtx, results.poseLandmarks, {color: '#FF0000', lineWidth: 2});

    this.canvasCtx.restore();
  }
}
