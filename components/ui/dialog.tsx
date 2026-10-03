"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Modal + Drawer built on the native <dialog> element: focus is moved
 * into the dialog, the page behind becomes inert, Escape closes it, and
 * focus returns to the trigger on close.
 */
type BaseProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Visually hide the title (still announced). */
  hideTitle?: boolean;
  description?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

function useNativeDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Click on backdrop closes.
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) ref.current?.close();
  };
  return { ref, onClick };
}

function DialogHeader({
  title,
  hideTitle,
  description,
  onClose,
  slot,
}: Pick<BaseProps, "title" | "hideTitle" | "description" | "onClose"> & { slot?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {slot}
      <div className={cn(hideTitle && "sr-only")}>
        <h2 className="font-heading text-h4 font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-small text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="-mt-1 -mr-2 ml-auto inline-flex size-11 items-center justify-center rounded-md text-foreground hover:bg-muted"
      >
        <X aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}

export function Modal({ open, onClose, title, hideTitle, description, children, className, footer }: BaseProps) {
  const { ref, onClick } = useNativeDialog(open, onClose);
  return (
    <dialog
      ref={ref}
      onClick={onClick}
      aria-label={title}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-xl rounded-xl border border-border bg-surface-raised p-0 text-foreground shadow-lg",
        "backdrop:bg-transparent",
        className,
      )}
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="p-6 pb-0">
          <DialogHeader title={title} hideTitle={hideTitle} description={description} onClose={() => ref.current?.close()} />
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
        {footer && <div className="border-t border-border p-4 sm:px-6">{footer}</div>}
      </div>
    </dialog>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  hideTitle,
  description,
  children,
  className,
  footer,
  side = "right",
  headerSlot,
}: BaseProps & { side?: "right" | "left"; headerSlot?: React.ReactNode }) {
  const { ref, onClick } = useNativeDialog(open, onClose);
  return (
    <dialog
      ref={ref}
      onClick={onClick}
      aria-label={title}
      className={cn(
        "fixed inset-y-0 m-0 h-dvh max-h-dvh w-full max-w-md border-border bg-background p-0 text-foreground shadow-lg",
        side === "right" ? "right-0 left-auto border-l" : "left-0 border-r",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-5 py-3">
          <DialogHeader title={title} hideTitle={hideTitle} description={description} onClose={() => ref.current?.close()} slot={headerSlot} />
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className="border-t border-border p-5">{footer}</div>}
      </div>
    </dialog>
  );
}
