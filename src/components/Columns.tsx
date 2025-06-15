import { type ReactNode } from "react";
import type { ContractionData } from "../types.ts";
import { formatDuration, formatTime } from "../utils/format";

interface ColumnProps {
    cs: ContractionData;
    active: boolean;
    children: ReactNode;
}

export default function Main({ children }: { children: ReactNode }) {
    return (
        <main className="bg-bg-main text-white grid grid-cols-3 gap-4 px-4 py-6 text-sm flex-grow z-0 ">
            {children}
        </main>
    );
}

function Row({ children, dir = "horizontal", ...rest }: { children: ReactNode; dir?: "vertical" | "horizontal" }) {
    return (
        <div
            className={`w-12 h-12 flex ${dir === "vertical" ? "flex-col" : "flex-row"} items-center justify-center`}
            {...rest}>
            {children}
        </div>
    );
}

function Duration({ cs, active, children }: ColumnProps) {
    return (
        <section aria-labelledby="durée-title" className="flex flex-col gap-3 items-center pr-2">
            <h2 id="durée-title">{children}</h2>
            {active && cs.current && (
                <Row key={cs.current.order} dir="vertical">
                    <div className="text-lg text-red-500">{formatDuration(cs.current.duration)}</div>
                    <div className="text-xs text-gray-400">{formatTime(cs.current.start)}</div>
                </Row>
            )}
            {cs.history.map((c) => (
                <Row key={c.order} dir="vertical">
                    <div className="text-lg">{formatDuration(c.duration)}</div>
                    <div className="text-xs text-gray-400">{formatTime(c.start)}</div>
                </Row>
            ))}
        </section>
    );
}

function Order({ cs, active, children }: ColumnProps) {
    return (
        <section aria-label="ordre" className="flex flex-col gap-3 items-center">
            <span id="ordre" className="text-transparent">
                {children}
            </span>
            {active && cs.current && (
                <Row>
                    <div
                        key={cs.current.order}
                        className="rounded-full text-red-500 bg-[#3b3b3b] w-10 h-10 flex items-center justify-center text-lg font-medium drop-shadow-gray-400 drop-shadow-[0px_0px_5px]">
                        {cs.current.order}
                    </div>
                </Row>
            )}
            {cs.history.map((c) => (
                <Row key={c.order}>
                    <div className="rounded-full bg-[#3b3b3b] w-10 h-10 flex items-center justify-center text-lg font-medium drop-shadow-gray-400 drop-shadow-[0px_0px_5px]">
                        {c.order}
                    </div>
                </Row>
            ))}
        </section>
    );
}

function Interval({ cs, children }: Omit<ColumnProps, "active">) {
    return (
        <section aria-labelledby="espacement-title" className="flex flex-col gap-3 items-center pl-2">
            <h2 id="espacement-title">{children}</h2>
            {cs.history.map((c) => (
                <Row key={c.order}>
                    <div className="opacity-80 translate-y-[calc(100%_+_10px)] text-gray-400">
                        {formatDuration(c.intervalSinceLast)}
                    </div>
                </Row>
            ))}
        </section>
    );
}

export { Duration, Interval, Order };
