import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
    const [first, last] = name.split(" ");
    if (!first) return "";
    if (!last) return first[0];
    if (first.length > 1 && last.length > 1) return first[0] + last[0];
}
