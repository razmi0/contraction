import { useState } from "react";

export type TimeStamp = ReturnType<Date["valueOf"]>;

export interface Contraction {
    order: number | null;
    start: TimeStamp;
    stop: TimeStamp | null;
    intervalSinceLast: Times | null;
    duration: Times | null;
}

export interface ContractionData {
    history: Contraction[];
    averageDuration: Times | null;
    qtyLastHour: number | null;
    averageSinceLast: Times | null;
    current: Contraction | null;
}

export interface Times {
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
    totalms: TimeStamp;
}

type TimesKeys<T> = {
    [K in keyof T]: T[K] extends Times | null ? K : never;
}[keyof T];

let intervalId: ReturnType<typeof setInterval> | null = null;

const mean = (arr: Contraction[], key: TimesKeys<Contraction>): number => {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, cur) => sum + (cur[key]?.totalms ?? 0), 0) / arr.length;
};

const countQtyLastHour = (history: ContractionData["history"], stoppedAt: number) => {
    const lastHourStartAt = stoppedAt - 3600 * 1000;
    let qtyLastHour = 0;
    for (let i = 0; i < history.length; i++) {
        const start = history[i].start;
        if (!start || start < lastHourStartAt) break;
        qtyLastHour = i + 1;
    }
    return qtyLastHour;
};

const msToHMSMS = (totalms: number): Times => {
    const totalSeconds = Math.floor(totalms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = totalms % 1000;

    return { hours, minutes, seconds, ms, totalms };
};

const createContraction = ({ order }: { order: number }): Contraction => {
    return {
        order,
        start: Date.now(),
        stop: null,
        duration: { hours: 0, minutes: 0, seconds: 0, ms: 0, totalms: 0 },
        intervalSinceLast: null,
    };
};

export default function useContractionTimer() {
    const [active, setActive] = useState<boolean>(false);
    const [contractions, setContractions] = useState<ContractionData>({
        history: [],
        averageDuration: null,
        current: null,
        averageSinceLast: null,
        qtyLastHour: null,
    });

    const startTimer = () => {
        setActive(true);

        setContractions((state) => {
            const newHistory = state.current ? [state.current, ...state.history] : [...state.history];
            const newContraction = createContraction({ order: newHistory.length + 1 });

            const lastStoppedAt = state.history[0] ? state.history[0].stop : null;
            newContraction.intervalSinceLast = lastStoppedAt ? msToHMSMS(newContraction.start - lastStoppedAt) : null;

            return {
                ...state,
                history: newHistory,
                current: newContraction,
            };
        });

        intervalId = setInterval(() => {
            setContractions((state) => {
                if (!state.current) return state;
                const newDuration = msToHMSMS(Date.now() - state.current.start);
                return {
                    ...state,
                    current: {
                        ...state.current,
                        duration: newDuration,
                    },
                };
            });
        }, 10);
    };

    const stopTimer = () => {
        setActive(false);
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        setContractions((state) => {
            if (!state.current) return state;
            const stoppedAt = Date.now();

            const updatedHistory: ContractionData["history"] = [
                {
                    ...state.current,
                    stop: stoppedAt,
                    duration: msToHMSMS(stoppedAt - state.current.start),
                },
                ...state.history,
            ];

            const averageDuration = updatedHistory.length > 0 ? msToHMSMS(mean(updatedHistory, "duration")) : null;
            const averageSinceLast =
                updatedHistory.length > 0 ? msToHMSMS(mean(updatedHistory, "intervalSinceLast")) : null;

            return {
                ...state,
                current: null,
                history: updatedHistory,
                qtyLastHour: countQtyLastHour(updatedHistory, stoppedAt),
                averageDuration,
                averageSinceLast,
            };
        });
    };

    return {
        active,
        contractions,
        startTimer,
        stopTimer,
    };
}
