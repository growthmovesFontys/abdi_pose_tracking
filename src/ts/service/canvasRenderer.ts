import { Results, HAND_CONNECTIONS } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

/**
 * CanvasRenderer is responsible for rendering hand pose results on a canvas.
 */
export class CanvasRenderer {
  private canvasCtx: CanvasRenderingContext2D;
  private connectorColor: string;
  private connectorLineWidth: number;
  private landmarkColor: string;
  private landmarkLineWidth: number;

  /**
   * Constructs a CanvasRenderer instance.
   * @param {CanvasRenderingContext2D} canvasCtx - The canvas rendering context.
   * @param {string} connectorColor - The color for drawing connectors. Default is '#00FF00'.
   * @param {number} connectorLineWidth - The line width for drawing connectors. Default is 4.
   * @param {string} landmarkColor - The color for drawing landmarks. Default is '#FF0000'.
   * @param {number} landmarkLineWidth - The line width for drawing landmarks. Default is 2.
   */
  constructor(
    canvasCtx: CanvasRenderingContext2D,
    connectorColor = '#00FF00',
    connectorLineWidth = 4,
    landmarkColor = '#FF0000',
    landmarkLineWidth = 2
  ) {
    if (!canvasCtx) throw new Error('Canvas context is required');
    this.canvasCtx = canvasCtx;
    this.connectorColor = connectorColor;
    this.connectorLineWidth = connectorLineWidth;
    this.landmarkColor = landmarkColor;
    this.landmarkLineWidth = landmarkLineWidth;
  }

  /**
   * Renders the hand pose results on the canvas.
   * @param {Results} results - The hand pose detection results from MediaPipe.
   */
  public render(results: Results) {
    if (!results || !results.multiHandLandmarks) return;

    this.clearCanvas();
    this.drawResults(results);
  }

  /**
   * Clears the canvas and prepares it for new drawing.
   */
  private clearCanvas() {
    this.canvasCtx.save();
    this.canvasCtx.scale(-1, 1);
    this.canvasCtx.translate(-this.canvasCtx.canvas.width, 0);
    this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
  }

  /**
   * Draws the hand pose results on the canvas.
   * @param {Results} results - The results to be drawn.
   */
  private drawResults(results: Results) {
    this.canvasCtx.drawImage(
      results.image as CanvasImageSource, 0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height
    );

    results.multiHandLandmarks.forEach(element => {
      drawConnectors(this.canvasCtx, element, HAND_CONNECTIONS, { color: this.connectorColor, lineWidth: this.connectorLineWidth });
      drawLandmarks(this.canvasCtx, element, { color: this.landmarkColor, lineWidth: this.landmarkLineWidth });
    });

    this.canvasCtx.restore();
  }
}
