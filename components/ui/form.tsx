import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const controlBase = [
  "w-full rounded-md border border-input-border bg-input px-3.5 text-body text-foreground",
  "placeholder:text-input-placeholder",
  "transition-[border-color,box-shadow] duration-200",
  "hover:border-faint-foreground",
  "focus:border-accent focus:shadow-focus focus:outline-none",
  "aria-invalid:border-danger",
  "disabled:cursor-not-allowed disabled:opacity-60",
].join(" ");

export function Label({ className, required, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("text-small font-medium text-foreground", className)} {...props}>
      {children}
      {required ? (
        <span className="ml-0.5 text-accent-text" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>
      )}
    </label>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlBase, "min-h-36 py-3 leading-normal", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(controlBase, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export function Checkbox({ className, ...props }: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "mt-0.5 size-5 shrink-0 cursor-pointer rounded-xs border border-input-border bg-input accent-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}

/** Field wrapper: label, control, hint and accessible error message. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-caption text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-caption font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
