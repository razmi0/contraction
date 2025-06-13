import type { ReactNode } from "react";
import useTimer, { type Times } from "./timings.ts";

function formatDuration(duration: Times | null) {
    if (!duration) return null;
    const { minutes, seconds } = duration;
    return `${minutes.toString()}:${String(seconds).padStart(2, "0")}`;
}

function formatTime(timestamp: number | null) {
    const date = new Date(Number(timestamp));
    return date.toTimeString().slice(0, 5); // "22:36"
}

function App() {
    const { contractions, stopTimer, startTimer, active } = useTimer();

    const toggle = () => {
        if (active) {
            stopTimer();
            return;
        }
        startTimer();
    };

    return (
        <>
            {/* HEADER */}
            <header className="relative text-white py-8 flex flex-col items-center gap-6">
                <h1 className="text-xl font-semibold uppercase tracking-widest">Contractions</h1>
                <div className="flex justify-around w-full max-w-xl text-center text-sm">
                    <HeaderElement quantity={formatDuration(contractions.averageDuration) ?? "-"}>
                        durée moy
                    </HeaderElement>
                    <HeaderElement quantity="6">contractions heure écoulée</HeaderElement>
                    <HeaderElement quantity={formatDuration(contractions.averageTimeBetween) ?? "-"}>
                        moy espacement
                    </HeaderElement>
                </div>
            </header>

            {/* MAIN */}
            <main className="bg-black text-white grid grid-cols-3 gap-4 px-4 py-6 text-sm flex-grow z-0">
                {/* Durée */}
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
                        <div className="w-12 h-12 flex items-center justify-center">
                            <div
                                key={c.order}
                                className="rounded-full bg-[#3b3b3b] w-10 h-10 flex items-center justify-center text-lg font-medium drop-shadow-gray-400 drop-shadow-[0px_0px_5px]">
                                {c.order}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Fréquence */}
                <section className="flex flex-col gap-4 items-start pl-2">
                    <h3>Espacement</h3>
                    {/* {contractions.frequencies.map((f, i) => (
                        <div key={i} className="opacity-80">
                            {f}
                        </div>
                    ))} */}
                </section>
            </main>

            {/* FOOTER */}
            <footer className="flex justify-center items-center bg-black py-6">
                <Button onClick={toggle}>
                    "DEBUT DES CONTRACTIONS"
                    {/* ) : (
                        <span className="text-lg">{formatDuration(contractions.current?.duration ?? null)}</span>
                    )} */}
                </Button>
            </footer>
        </>
    );
}

function HeaderElement({ children, quantity }: { children: ReactNode; quantity: ReactNode }) {
    return (
        <div className=" flex-grow text-center max-w-[100px]">
            <p className="font-bold text-[1.5rem]">{quantity}</p>
            <small className="text-gray-500">{children}</small>
        </div>
    );
}

function Button({ children, onClick }: { children: ReactNode; onClick: () => void }) {
    return (
        <>
            <input id={"checkbox"} type={"checkbox"} />
            <label className={"switch"} htmlFor={"checkbox"} onClick={onClick}>
                <svg className="svg" viewBox="0 0 20 20">
                    <path d="M8.127 13.6c-.689 1.197-.225 2.18.732 2.732.956.553 2.041.465 2.732-.732.689-1.195 5.047-11.865 4.668-12.084-.379-.219-7.442 8.888-8.132 10.084zM10 6c.438 0 .864.037 1.281.109.438-.549.928-1.154 1.405-1.728A9.664 9.664 0 0 0 10 4C4.393 4 0 8.729 0 14.766c0 .371.016.742.049 1.103.049.551.54.955 1.084.908.551-.051.957-.535.908-1.086A10.462 10.462 0 0 1 2 14.766C2 9.85 5.514 6 10 6zm7.219 1.25c-.279.75-.574 1.514-.834 2.174C17.4 10.894 18 12.738 18 14.766c0 .316-.015.635-.043.943a1.001 1.001 0 0 0 1.992.182c.033-.37.051-.748.051-1.125 0-2.954-1.053-5.59-2.781-7.516z"></path>
                </svg>
                {children}
            </label>
        </>
    );
}

export default App;
