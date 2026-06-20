import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
