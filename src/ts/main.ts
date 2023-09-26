import { CanvasRenderer } from "./canvasRenderer";
import { PoseCameraProcessor } from "./poseCameraProcessor";

const videoElement = document.getElementsByClassName('input_video')[0] as HTMLVideoElement;
const canvasElement = document.getElementsByClassName('output_canvas')[0] as HTMLCanvasElement;
const canvasCtx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
const canvasRenderer = new CanvasRenderer(canvasCtx);

const poseCameraProcessor = new PoseCameraProcessor(videoElement, canvasRenderer);




poseCameraProcessor.start();