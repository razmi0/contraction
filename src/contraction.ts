import { useEffect, useState } from "react";
import type { ContractionData } from "./types";
import { formatDuration } from "./utils/format";
import { countQtyLastHour, createContraction, mean, msToHMSMS } from "./utils/timings";

let intervalId: ReturnType<typeof setInterval> | null = null;

export default function useContractionTimer({
    init,
    onChange,
}: {
    init?: ContractionData | null;
    onChange?: () => void;
}) {
    const [active, setActive] = useState<boolean>(false);
    const [contractions, setContractions] = useState<ContractionData>(
        init ?? {
            history: [],
            averageDuration: null,
            current: null,
            averageSinceLast: null,
            qtyLastHour: null,
        }
    );

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

            const averageDuration = formatDuration(
                updatedHistory.length > 0 ? msToHMSMS(mean(updatedHistory, "duration")) : null
            );
            const averageSinceLast = formatDuration(
                updatedHistory.length > 0 ? msToHMSMS(mean(updatedHistory, "intervalSinceLast")) : null
            );

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

    useEffect(() => {
        onChange?.();
    }, [onChange, active]);

    return {
        active,
        contractions,
        startTimer,
        stopTimer,
    };
}
