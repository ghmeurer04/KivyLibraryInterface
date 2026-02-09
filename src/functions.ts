export async function accessCamera(): Promise<boolean> {
    const video : HTMLVideoElement = document.getElementById("camera") as HTMLVideoElement;
    console.log("Accessing camera...");
    console.log(video);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
        });
        video.srcObject = stream;

        return true
    } catch (err) {
        console.error("Camera access denied:", err);
        return false
    }
}

export function stopCamera() {
    const video : HTMLVideoElement = document.getElementById("camera") as HTMLVideoElement;
    const stream: MediaStream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
}

