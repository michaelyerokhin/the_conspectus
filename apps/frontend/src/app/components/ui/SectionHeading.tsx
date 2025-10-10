type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "light";
  singleLine?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  singleLine,
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";

  const containerClasses = [
    "space-y-3",
    align === "center" ? "text-center" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const eyebrowStyles = isLight
    ? "text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
    : "text-xs font-semibold uppercase tracking-[0.3em] text-slate-400";

  const titleStyles = [
    "text-3xl font-semibold tracking-tight sm:text-4xl",
    isLight ? "text-white" : "text-slate-900",
    singleLine ? "whitespace-nowrap text-ellipsis overflow-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const descriptionStyles = isLight
    ? "max-w-2xl text-base text-white/70"
    : "max-w-2xl text-base text-slate-500";

  return (
    <div className={containerClasses}>
      {eyebrow ? <p className={eyebrowStyles}>{eyebrow}</p> : null}
      <h2 className={titleStyles}>{title}</h2>
      {description ? <p className={descriptionStyles}>{description}</p> : null}
    </div>
  );
}
