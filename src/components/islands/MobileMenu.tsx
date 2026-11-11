import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Item = { href: string; label: string };

function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return path === href;
}

export function MobileMenu({
  items,
  currentPath,
  instagramUrl = "",
}: {
  items: Item[];
  currentPath: string;
  instagramUrl?: string;
}) {
  const sections = items.filter((item) => item.href !== "/contactos/");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline" aria-controls="menu-principal" className="gap-2 border-primary/40 bg-transparent px-3 text-primary">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent id="menu-principal" side="right" className="menu-sheet">
        <SheetHeader className="menu-sheet__head">
          <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
          <SheetDescription>Secções do site do instituto.</SheetDescription>
        </SheetHeader>
        <nav className="menu-sheet__nav" aria-label="Secções">
          {sections.map((item, index) => (
            <a key={item.href} href={item.href} aria-current={isCurrent(currentPath, item.href) ? "page" : undefined}>
              <span className="menu-sheet__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu-sheet__foot">
          <Button asChild size="lg" className="w-full">
            <a href="/contactos/" aria-current={isCurrent(currentPath, "/contactos/") ? "page" : undefined}>
              Contactos
            </a>
          </Button>
          {instagramUrl ? (
            <a className="menu-sheet__social" href={instagramUrl} target="_blank" rel="noopener">
              Instagram
            </a>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
