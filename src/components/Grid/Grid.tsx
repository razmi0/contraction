import type { ContractionData } from "../../types.ts";
import DurationColumn from "./DurationColumn";
import IntervalColumn from "./IntervalColumn";
import OrderColumn from "./OrderColumn";

export default function Grid({ contractions, active }: { contractions: ContractionData; active: boolean }) {
    return (
        <main className="bg-black text-white grid grid-cols-3 gap-4 px-4 py-6 text-sm flex-grow z-0">
            <DurationColumn contractions={contractions} active={active} />
            <OrderColumn contractions={contractions} active={active} />
            <IntervalColumn contractions={contractions} />
        </main>
    );
}
