import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse motion-reduce:animate-none rounded-md bg-slate-200/80",
        className
      )}
      {...props}
    />
  );
}
