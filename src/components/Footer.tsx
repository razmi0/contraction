import type { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
    return <footer className="flex justify-center items-center bg-bg-main py-6">{children}</footer>;
}
