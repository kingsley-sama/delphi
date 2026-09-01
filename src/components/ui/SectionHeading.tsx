import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <h2 className="max-w-3xl text-[32px] font-bold leading-tight text-ink min-[400px]:text-[36px] sm:text-4xl lg:text-[48px]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-[17px] text-ink-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
