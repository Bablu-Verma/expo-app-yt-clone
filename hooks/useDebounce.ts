import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // ✅ Jab tak user type karta rahega, timer reset hota rahega
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}