import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const config = {
  info: { icon: Info, cls: "border-border bg-surface-2 text-foreground", iconCls: "text-info" },
  success: { icon: CircleCheck, cls: "border-transparent bg-success-soft text-foreground", iconCls: "text-success" },
  warning: { icon: TriangleAlert, cls: "border-transparent bg-warning-soft text-foreground", iconCls: "text-warning" },
  danger: { icon: CircleAlert, cls: "border-transparent bg-danger-soft text-foreground", iconCls: "text-danger" },
};

export function Alert({
  variant = "info",
  title,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof config; title?: string }) {
  const { icon: Icon, cls, iconCls } = config[variant];
  return (
    <div className={cn("flex gap-3 rounded-md border p-4 text-small", cls, className)} {...props}>
      <Icon aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", iconCls)} />
      <div className="space-y-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-subtle-foreground">{children}</div>
      </div>
    </div>
  );
}
