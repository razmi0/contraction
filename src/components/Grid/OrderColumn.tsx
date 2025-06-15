import type { ContractionData } from "../../types.ts";

export default function OrderColumn({ contractions, active }: { contractions: ContractionData; active: boolean }) {
    return (
        <section className="flex flex-col gap-3 items-center">
            <div className="text-transparent">0rdre</div>
            {active && contractions.current && (
                <div className="w-12 h-12 flex items-center justify-center">
                    <div
                        key={contractions.current.order}
                        className="rounded-full text-red-500 bg-[#3b3b3b] w-10 h-10 flex items-center justify-center text-lg font-medium drop-shadow-gray-400 drop-shadow-[0px_0px_5px]">
                        {contractions.current.order}
                    </div>
                </div>
            )}
            {contractions.history.map((c) => (
                <div className="w-12 h-12 flex items-center justify-center" key={c.order}>
                    <div className="rounded-full bg-[#3b3b3b] w-10 h-10 flex items-center justify-center text-lg font-medium drop-shadow-gray-400 drop-shadow-[0px_0px_5px]">
                        {c.order}
                    </div>
                </div>
            ))}
        </section>
    );
}
