"use client";

import { Tabs } from "@/components/ui/tabs";

export function DesignSystemTabsDemo() {
  return (
    <Tabs
      label="Example tabs"
      items={[
        { id: "assess", label: "Assess", content: <p className="text-muted-foreground">Tab panel: Assess.</p> },
        { id: "design", label: "Design", content: <p className="text-muted-foreground">Tab panel: Design.</p> },
        { id: "implement", label: "Implement", content: <p className="text-muted-foreground">Tab panel: Implement.</p> },
      ]}
    />
  );
}
