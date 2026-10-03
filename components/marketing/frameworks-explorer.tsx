"use client";

import { Tabs } from "@/components/ui/tabs";
import type { Framework } from "@/data/frameworks";
import { FrameworkCard } from "./framework-badge";

/** Client-side category filter for the frameworks grid. */
export function FrameworksExplorer({ frameworks, categories }: { frameworks: Framework[]; categories: string[] }) {
  const grid = (items: Framework[]) => (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((f) => (
        <li key={f.id}>
          <FrameworkCard framework={f} />
        </li>
      ))}
    </ul>
  );
  return (
    <Tabs
      label="Filter frameworks by category"
      items={[
        { id: "all", label: "All", content: grid(frameworks) },
        ...categories.map((c) => ({ id: c, label: c, content: grid(frameworks.filter((f) => f.category === c)) })),
      ]}
    />
  );
}
