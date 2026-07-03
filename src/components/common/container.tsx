import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Size = "md" | "lg";

const sizeClasses: Record<Size, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: Size;
};

export function Container({ children, className, size = "md" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
