import { useRef } from "react";

export default function useMetaTitle() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-type-assertion
    const ref = useRef(document.querySelector("title")! as HTMLTitleElement);
    return {
        insert: (text: string) => {
            ref.current.innerText = text;
        },
    };
}
