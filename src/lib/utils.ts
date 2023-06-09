import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
    const [first, last] = name.split(" ");
    if (!first) return "";
    if (!last) return first[0];
    return `${first.charAt(0)}${last.charAt(0)}`;
}
