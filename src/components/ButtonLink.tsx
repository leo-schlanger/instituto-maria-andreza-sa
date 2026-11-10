import { Button } from "@/components/ui/button";

// Astro does not pass an <a> child into React as an element, so Slot cannot merge props there.
export function ButtonLink({
  href,
  children,
  current = false,
}: {
  href: string;
  children: string;
  current?: boolean;
}) {
  return (
    <Button asChild>
      <a href={href} aria-current={current ? "page" : undefined}>
        {children}
      </a>
    </Button>
  );
}
