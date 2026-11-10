import { Button } from "@/components/ui/button";

// Astro does not pass an <a> child into React as an element, so Slot cannot merge props there.
export function ButtonLink({
  href,
  children,
  current = false,
  variant = "default",
  external = false,
}: {
  href: string;
  children: string;
  current?: boolean;
  variant?: "default" | "secondary" | "outline";
  external?: boolean;
}) {
  return (
    <Button asChild variant={variant}>
      <a
        href={href}
        aria-current={current ? "page" : undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
      >
        {children}
      </a>
    </Button>
  );
}
