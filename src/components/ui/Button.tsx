import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[0.5rem] font-display uppercase tracking-wider " +
  "transition-[transform,box-shadow,background-color] duration-200 ease-[var(--ease-spring)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variants: Record<Variant, string> = {
  // design.md: primary uses accent fill, no outer glow, 8% darken on hover.
  primary:
    "bg-crt text-ink hover:brightness-[0.92] hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgb(0_0_0/0.4)]",
  ghost:
    "border-[1.5px] border-static text-crt bg-transparent hover:bg-crt/10",
  danger:
    "border-[1.5px] border-tape text-tape bg-transparent hover:bg-tape/15",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1 text-base",
  md: "px-5 py-2.5 text-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className = "", type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...rest} />
  );
});
