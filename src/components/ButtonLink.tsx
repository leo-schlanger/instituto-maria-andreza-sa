import { Button } from "@/components/ui/button";

// Astro does not pass an <a> child into React as an element, so Slot cannot merge props there.
export function ButtonLink({
  href,
  children,
  current = false,
  variant = "default",
  size = "default",
  external = false,
}: {
  href: string;
  children: string;
  current?: boolean;
  variant?: "default" | "secondary" | "outline" | "ivory" | "outlineLight";
  size?: "default" | "lg";
  external?: boolean;
}) {
  return (
    <Button asChild variant={variant} size={size}>
      <a
        href={href}
        aria-current={current ? "page" : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
      >
        {children}
        {external ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        ) : null}
      </a>
    </Button>
  );
}
