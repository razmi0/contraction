const load = <T = unknown>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    try {
        return JSON.parse(item) as T;
    } catch {
        return null;
    }
};

const save = (key: string, ...payload: Parameters<typeof JSON.stringify>) => {
    const json = JSON.stringify(...payload);
    localStorage.setItem(key, json);
};

export function store<G = unknown>({
    key,
}: {
    key: string;
}): {
    load: () => G | null;
    save: (...payload: Parameters<typeof JSON.stringify>) => void;
} {
    return {
        load: () => load(key),
        save: (...payload: Parameters<typeof JSON.stringify>) => {
            save(key, ...payload);
        },
    };
}
