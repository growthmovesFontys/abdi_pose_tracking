import { Camera } from '@mediapipe/camera_utils';
import * as THREE from 'three';


/**
 * The CoordinateMapper class contains the logic for mapping coordinates.
 */
export class CoordinateMapper {
    /**
     * Maps coordinates to Three.js coordinates.
     * @param x - The x-coordinate to map.
     * @param y - The y-coordinate to map.
     * @param videoWidth - The width of the video.
     * @param videoHeight - The height of the video.
     * @param camera - The Three.js camera.
     * @returns The mapped coordinates as { x, y }.
     */
    public static mapToThreejsCoords(x: number, y: number, videoWidth: number, videoHeight: number, camera: THREE.Camera) {
        const vector = new THREE.Vector3(
            (x / videoWidth) * 2 - 1,
            - (y / videoHeight) * 2 + 1,
            0.5
        );

        vector.unproject(camera);

        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        return { x: pos.x, y: pos.y };
    }
}