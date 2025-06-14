import { type ReactNode } from "react";
import type { ContractionData } from "../timings.ts";
import { formatDuration } from "../utils/format";

function HeaderElement({ children, quantity }: { children: ReactNode; quantity: ReactNode }) {
    return (
        <div className="flex-grow text-center max-w-[100px]">
            <p className="font-bold text-[1.5rem]">{quantity}</p>
            <small className="text-gray-500">{children}</small>
        </div>
    );
}

export default function Header({ contractions }: { contractions: ContractionData }) {
    return (
        <header className="relative text-white py-8 flex flex-col items-center gap-6">
            <h1 className="text-xl font-semibold uppercase tracking-widest">Contractions</h1>
            <div className="flex justify-around w-full max-w-xl text-center text-sm">
                <HeaderElement quantity={formatDuration(contractions.averageDuration) ?? "-"}>durée moy</HeaderElement>
                <HeaderElement quantity={contractions.qtyLastHour ?? "-"}>contractions heure écoulée</HeaderElement>
                <HeaderElement quantity={formatDuration(contractions.averageSinceLast) ?? "-"}>
                    moy espacement
                </HeaderElement>
            </div>
        </header>
    );
}
