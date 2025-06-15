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

export type TimeStamp = ReturnType<Date["valueOf"]>;
