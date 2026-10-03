import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "prose";
  as?: "div" | "section" | "header" | "footer" | "nav";
};

const widths = {
  default: "max-w-[var(--layout-max)]",
  wide: "max-w-[var(--layout-wide)]",
  prose: "max-w-[var(--layout-prose)]",
};

export function Container({ size = "default", as: Tag = "div", className, ...props }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-[var(--layout-gutter)]", widths[size], className)} {...props} />;
}
