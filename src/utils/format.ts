import type { Times } from "../timings";

export function formatDuration(duration: Times | null) {
    if (!duration) return null;
    const { minutes, seconds } = duration;
    return `${minutes.toString()}:${String(seconds).padStart(2, "0")}`;
}

export function formatTime(timestamp: number | null) {
    const date = new Date(Number(timestamp));
    return date.toTimeString().slice(0, 5); // "22:36"
}
