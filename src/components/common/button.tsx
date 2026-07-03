import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
  secondary:
    "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800",
  ghost: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  variant?: Variant;
};

type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
