import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "light";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "group/button inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-3.5 text-sm sm:text-base",
  };

  const variants = {
    primary:
      "bg-brand text-white shadow-[0_8px_20px_rgba(90,24,39,0.18)] hover:bg-accent hover:shadow-[0_10px_25px_rgba(226,132,19,0.3)]",

    secondary:
      "bg-accent text-white shadow-[0_8px_20px_rgba(226,132,19,0.25)] hover:bg-brand hover:shadow-lg",

    outline:
      "border border-brand bg-transparent text-brand hover:bg-brand hover:text-white",

    light:
      "bg-white text-brand shadow-lg hover:bg-accent hover:text-white",
  };

  const styles = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        onClick={onClick}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
