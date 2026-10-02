import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-brand text-white hover:bg-accent hover:shadow-lg",

    secondary:
      "bg-accent text-white hover:bg-brand hover:shadow-lg",

    outline:
      "border border-brand bg-transparent text-brand hover:bg-brand hover:text-white",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}