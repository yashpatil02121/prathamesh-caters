type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`
        max-w-2xl
        ${align === "center" ? "mx-auto text-center" : "text-left"}
      `}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold leading-tight text-brand sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}