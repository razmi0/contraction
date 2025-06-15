import type { Contraction, ContractionData, Times } from "../types";

type TimesKeys<T> = {
    [K in keyof T]: T[K] extends Times | null ? K : never;
}[keyof T];

export const mean = (arr: Contraction[], key: TimesKeys<Contraction>): number => {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, cur) => sum + (cur[key]?.totalms ?? 0), 0) / arr.length;
};

export const countQtyLastHour = (history: ContractionData["history"], stoppedAt: number) => {
    const lastHourStartAt = stoppedAt - 3600 * 1000;
    let qtyLastHour = 0;
    for (let i = 0; i < history.length; i++) {
        const start = history[i].start;
        if (!start || start < lastHourStartAt) break;
        qtyLastHour = i + 1;
    }
    return qtyLastHour;
};

export const msToHMSMS = (totalms: number): Times => {
    const totalSeconds = Math.floor(totalms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = totalms % 1000;

    return { hours, minutes, seconds, ms, totalms };
};

export const createContraction = ({ order }: { order: number }): Contraction => {
    return {
        order,
        start: Date.now(),
        stop: null,
        duration: { hours: 0, minutes: 0, seconds: 0, ms: 0, totalms: 0 },
        intervalSinceLast: null,
    };
};
