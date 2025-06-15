import { type ReactNode } from "react";

function Stat({ children, quantity }: { children: ReactNode; quantity: ReactNode }) {
    return (
        <article className="flex-grow text-center max-w-[100px]">
            <p className="font-bold text-[1.5rem] text-primary-a1">{quantity ?? "-"}</p>
            <small className="text-gray-200">{children}</small>
        </article>
    );
}

export default function Header({ children }: { children: ReactNode }) {
    return (
        <header className="relative text-white py-8 flex flex-col items-center gap-6 bg-bg-header">
            <h1 className="text-xl font-semibold uppercase tracking-widest text-primary-a1">Contractions</h1>
            <section aria-label="Statistiques" className="flex justify-around w-full max-w-xl text-center text-sm">
                {children}
            </section>
        </header>
    );
}

export { Stat };
