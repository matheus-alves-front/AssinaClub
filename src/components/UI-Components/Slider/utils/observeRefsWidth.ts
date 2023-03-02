import { RefObject, SetStateAction } from "react";

export default function observeRefsWidth(
    ref: RefObject<HTMLDivElement>,
    setRefsWidth: (value: SetStateAction<number>) => void

) {
    const resizeObserver = new ResizeObserver(entries => {
        setRefsWidth(entries[0].contentRect.width);
    });

    if (ref.current) resizeObserver.observe(ref.current);

    return () => {
        resizeObserver.disconnect();
    };
}