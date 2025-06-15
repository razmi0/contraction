import type { ContractionData } from "../../types.ts";
import { formatDuration, formatTime } from "../../utils/format";

export default function DurationColumn({ contractions, active }: { contractions: ContractionData; active: boolean }) {
    return (
        <section className="flex flex-col gap-3 items-center pr-2">
            <h3>Durée</h3>
            {active && contractions.current && (
                <div key={contractions.current.order} className="text-center opacity-80 w-12 h-12">
                    <div className="text-lg text-red-500">{formatDuration(contractions.current.duration)}</div>
                    <div className="text-xs text-gray-400">{formatTime(contractions.current.start)}</div>
                </div>
            )}
            {contractions.history.map((c) => (
                <div key={c.order} className="text-center opacity-80 w-12 h-12">
                    <div className="text-lg">{formatDuration(c.duration)}</div>
                    <div className="text-xs text-gray-400">{formatTime(c.start)}</div>
                </div>
            ))}
        </section>
    );
}
