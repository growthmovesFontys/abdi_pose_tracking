import { Results } from "@mediapipe/hands";

export type HandPoseDetectorEvents = Record<string, (...args: any[]) => void>;

// Voorbeeld van hoe je specifieke events kunt definiëren:
// type HandPoseDetectorEvents = {
//   'results': (results: Results) => void;
//   // Voeg hier andere events toe indien nodig
// };
