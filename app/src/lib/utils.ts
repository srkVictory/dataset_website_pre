// clsx条件类名合并
import { clsx, type ClassValue } from "clsx"
// tailwind-merge解决Tailwind类名冲突
import { twMerge } from "tailwind-merge"

// 合并多个类名并处理Tailwind冲突
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
