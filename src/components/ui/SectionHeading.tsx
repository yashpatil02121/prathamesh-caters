type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`
        max-w-2xl
        ${align === "center" ? "mx-auto text-center" : "text-left"}
      `}
    >
      {eyebrow && (
        <p className="ornament mb-4 text-xs font-semibold uppercase tracking-[0.28em] sm:text-sm">
          {eyebrow}
        </p>
      )}

      <h2
        className={`
          font-display
          text-[1.85rem]
          font-semibold
          leading-[1.15]
          sm:text-4xl
          lg:text-5xl
          ${isDark ? "text-white" : "text-brand"}
        `}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`
            mt-3
            text-[15px]
            leading-7
            sm:mt-4
            sm:text-lg
            ${isDark ? "text-white/70" : "text-muted"}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}
