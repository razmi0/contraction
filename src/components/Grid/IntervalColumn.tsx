import type { ContractionData } from "../../timings.ts";
import { formatDuration } from "../../utils/format.ts";

export default function IntervalColumn({ contractions }: { contractions: ContractionData }) {
    return (
        <section className="flex flex-col gap-3 items-center pl-2">
            <h3>Espacement</h3>
            {contractions.history.map((c) => (
                <div className="w-12 h-12 flex items-center justify-center" key={c.order}>
                    <div className="opacity-80 translate-y-[calc(100%_+_10px)] text-gray-500">
                        {formatDuration(c.intervalSinceLast)}
                    </div>
                </div>
            ))}
        </section>
    );
}
