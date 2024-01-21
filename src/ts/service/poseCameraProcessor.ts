import { Camera } from '@mediapipe/camera_utils';
import { Hands, NormalizedLandmarkListList, Results, InputMap, Options } from '@mediapipe/hands';

interface HandPoseDetectorEvents {
  'results': (results: Results) => void;
}

/**
 * HandPoseDetector manages hand tracking using MediaPipe Hands and a video feed.
 */
export class HandPoseDetector {
  private _hands: Hands;
  private videoElement: HTMLVideoElement;
  private _results: Results | null = null;
  private _camera: Camera;
  private eventListeners: Partial<HandPoseDetectorEvents> = {};

  /**
   * Creates a new HandPoseDetector instance.
   * @param {HTMLVideoElement} videoElement - The video element for hand tracking.
   * @param {Options} config - Configuration options for hand tracking.
   */
  constructor(videoElement: HTMLVideoElement, config: Options) {
    this.videoElement = videoElement;

    try {
      this.initHandtracking(config);
      this.initCamera();
    } catch (error) {
      console.error('Failed to initialize HandPoseDetector:', error);
    }
  }

  private initHandtracking(config: Options): void {
    this._hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    this._hands.setOptions(config);

    this._hands.onResults(results => this.onResults(results));
  }

  private initCamera(): void {
    try {
      this._camera = new Camera(this.videoElement, {
        onFrame: async () => {
          const inputs: InputMap = { image: this.videoElement };
          await this._hands.send(inputs);
        },
        width: this.videoElement.width,
        height: this.videoElement.height,
      });
    } catch (error) {
      console.error('Failed to initialize the camera:', error);
      throw error; // Rethrow the error to indicate a critical failure.
    }
  }

  private onResults(results: Results): void {
    this._results = results;
    this.emit('results', results);
  }

  /**
   * Starts the camera for hand tracking.
   */
  public start(): void {
    if (this._camera) {
      try {
        this._camera.start();
      } catch (error) {
        console.error('Failed to start the camera:', error);
      }
    } else {
      console.error('Camera not initialized');
    }
  }

  /**
   * Gets the detected hand positions.
   * @returns {NormalizedLandmarkListList | null} - The detected hand positions or null if not available.
   */
  public getHandPosition(): NormalizedLandmarkListList | null {
    return this._results?.multiHandLandmarks ?? null;
  }

  /**
   * Gets the latest tracking results.
   * @returns {Results | null} - The latest tracking results or null if not available.
   */
  public get results(): Results | null {
    return this._results;
  }

  /**
   * Registers an event listener for a specific event.
   * @param {T} event - The event to listen for.
   * @param {HandPoseDetectorEvents[T]} listener - The listener function.
   */
  public on<T extends keyof HandPoseDetectorEvents>(event: T, listener: HandPoseDetectorEvents[T]): void {
    this.eventListeners[event] = listener;
  }

  private emit<T extends keyof HandPoseDetectorEvents>(event: T, ...args: Parameters<HandPoseDetectorEvents[T]>): void {
    const listener = this.eventListeners[event];
    if (listener) {
      listener.apply(this, args);
    }
  }
}
