import { useState } from "react";

export type TimeStamp = ReturnType<Date["valueOf"]>;

export interface Contraction {
    order: number | null;
    start: TimeStamp | null;
    stop: TimeStamp | null;
    duration: Times | null;
}

export interface ContractionData {
    history: Contraction[];
    averageDuration: Times | null;
    qlastHour: number | null;
    averageTimeBetween: Times | null;
    current: Contraction | null;
}

export interface Times {
    hours: number;
    minutes: number;
    seconds: number;
    ms: number;
    totalms: TimeStamp;
}

let intervalId: ReturnType<typeof setInterval> | null = null;

const msToHMS = (totalms: number): Times => {
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
    };
};

export default function useContractionTimer() {
    const [contractions, setContractions] = useState<ContractionData>({
        history: [],
        averageDuration: null,
        current: null,
        averageTimeBetween: null,
        qlastHour: null,
    });
    const [active, setActive] = useState<boolean>(false);

    const startTimer = () => {
        setActive(true);

        setContractions((state) => {
            const newHistory = state.current ? [state.current, ...state.history] : [...state.history];

            return {
                ...state,
                history: newHistory,
                current: createContraction({ order: newHistory.length + 1 }),
            };
        });

        intervalId = setInterval(() => {
            setContractions((state) => {
                if (!state.current) return state;
                const newDuration = msToHMS(Date.now() - (state.current.start ?? Date.now()));
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
            const updatedHistory = [
                {
                    ...state.current,
                    stop: stoppedAt,
                    duration: msToHMS(stoppedAt - (state.current.start ?? 0)),
                },
                ...state.history,
            ];
            return {
                ...state,
                current: null,
                history: updatedHistory,
                averageDuration:
                    updatedHistory.length > 0
                        ? msToHMS(
                              updatedHistory.reduce((sum, c) => sum + (c.duration?.totalms ?? 0), 0) /
                                  updatedHistory.length
                          )
                        : null,
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
