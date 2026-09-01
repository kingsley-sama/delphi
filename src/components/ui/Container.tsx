import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1312px] px-6 min-[400px]:px-7 sm:px-8", className)}>
      {children}
    </div>
  );
}
