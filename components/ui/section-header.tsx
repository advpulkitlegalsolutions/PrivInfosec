import { cn } from "@/lib/utils";
import { Eyebrow, H2, Lead } from "./typography";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** id applied to the heading — pair with aria-labelledby on the section. */
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  actions?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as = "h2",
  className,
  actions,
}: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H2 as={as} id={id}>
        {title}
      </H2>
      {description && <Lead className={cn("max-w-[var(--layout-measure)]", centered && "mx-auto")}>{description}</Lead>}
      {actions && <div className={cn("mt-2 flex flex-wrap gap-3", centered && "justify-center")}>{actions}</div>}
    </div>
  );
}
