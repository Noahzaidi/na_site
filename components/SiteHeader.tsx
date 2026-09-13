"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type NavItem = { readonly label: string; readonly href: string };

type SiteHeaderProps = {
  items: readonly NavItem[];
  cta: NavItem;
};

export function SiteHeader({ items, cta }: SiteHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  // The mobile menu is a native <details>, so it works without JavaScript.
  // This only adds Escape, outside-click and close-on-navigate behaviour.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    };
    const onDocumentClick = (event: MouseEvent) => {
      if (menu.open && !menu.contains(event.target as Node)) menu.open = false;
    };
    const onMenuClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) menu.open = false;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocumentClick);
    menu.addEventListener("click", onMenuClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocumentClick);
      menu.removeEventListener("click", onMenuClick);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="NoahArk home">
          <Image
            src="/assets/noahark-lockup-horizontal.svg"
            alt="NoahArk"
            width={1450}
            height={300}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={cta.href} className="btn-route">
                {cta.label}
              </a>
            </li>
          </ul>
        </nav>

        <details ref={menuRef} className="menu md:hidden">
          <summary>
            <span className="menu-icon" aria-hidden="true" />
            Menu
          </summary>
          <nav aria-label="Primary" className="menu-panel">
            <ul>
              {[...items, cta].map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
