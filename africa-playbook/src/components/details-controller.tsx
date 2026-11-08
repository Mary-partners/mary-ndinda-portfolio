"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for native <details> accordions:
 *  - Opens the <details> that matches (or contains) the URL hash, so deep
 *    links such as /playbook/slug#gates land on an open section.
 *  - Opens every <details> before printing so expanded content is always
 *    available in print, and restores the previous state afterwards.
 *  - Keeps the hash in sync when a section is opened via its summary.
 */
export function DetailsController() {
  useEffect(() => {
    const openForHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      let node: HTMLElement | null = el;
      while (node) {
        if (node instanceof HTMLDetailsElement) node.open = true;
        node = node.parentElement;
      }
      if (el instanceof HTMLDetailsElement) el.open = true;
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    };

    let previous: { el: HTMLDetailsElement; open: boolean }[] = [];
    const beforePrint = () => {
      previous = Array.from(document.querySelectorAll("details")).map((el) => ({ el, open: el.open }));
      previous.forEach(({ el }) => (el.open = true));
    };
    const afterPrint = () => {
      previous.forEach(({ el, open }) => (el.open = open));
      previous = [];
    };

    openForHash();
    window.addEventListener("hashchange", openForHash);
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      window.removeEventListener("hashchange", openForHash);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return null;
}
