import { type ReactNode } from "react";

export default function TimerTrigger({ children, onClick }: { children: ReactNode; onClick: () => void }) {
    return (
        <form aria-label="déclencheur de contraction">
            <input id="checkbox" type="checkbox" />
            <label className="switch" htmlFor="checkbox" onClick={onClick}>
                <svg className="svg" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M8.127 13.6c-.689 1.197-.225 2.18.732 2.732.956.553 2.041.465 2.732-.732.689-1.195 5.047-11.865 4.668-12.084-.379-.219-7.442 8.888-8.132 10.084zM10 6c.438 0 .864.037 1.281.109.438-.549.928-1.154 1.405-1.728A9.664 9.664 0 0 0 10 4C4.393 4 0 8.729 0 14.766c0 .371.016.742.049 1.103.049.551.54.955 1.084.908.551-.051.957-.535.908-1.086A10.462 10.462 0 0 1 2 14.766C2 9.85 5.514 6 10 6zm7.219 1.25c-.279.75-.574 1.514-.834 2.174C17.4 10.894 18 12.738 18 14.766c0 .316-.015.635-.043.943a1.001 1.001 0 0 0 1.992.182c.033-.37.051-.748.051-1.125 0-2.954-1.053-5.59-2.781-7.516z"></path>
                </svg>
                {children}
            </label>
        </form>
    );
}
