import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Item = { href: string; label: string };

function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return path === href;
}

export function MobileMenu({ items, currentPath }: { items: Item[]; currentPath: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" aria-label="Menu" aria-controls="menu-principal">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent id="menu-principal" side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Ligações das secções do site.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Secções">
          {items.map((item) =>
            item.href === "/contactos/" ? (
              <Button key={item.href} asChild>
                <a href={item.href} aria-current={isCurrent(currentPath, item.href) ? "page" : undefined}>
                  {item.label}
                </a>
              </Button>
            ) : (
              <a
                key={item.href}
                href={item.href}
                aria-current={isCurrent(currentPath, item.href) ? "page" : undefined}
                className="flex min-h-11 items-center text-base font-medium text-text no-underline hover:text-primary hover:underline aria-[current=page]:text-primary aria-[current=page]:underline"
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
