import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { frameworkCategories, frameworks, frameworksSection } from "@/data/frameworks";
import { FrameworksExplorer } from "./frameworks-explorer";

export function FrameworksSection({ tone = "default" }: { tone?: "default" | "muted" }) {
  return (
    <Section tone={tone} aria-labelledby="frameworks-heading">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            eyebrow={frameworksSection.eyebrow}
            id="frameworks-heading"
            title={frameworksSection.heading}
            description={frameworksSection.description}
          />
        </div>
        <div className="lg:col-span-8">
          <FrameworksExplorer frameworks={frameworks} categories={frameworkCategories} />
        </div>
      </div>
    </Section>
  );
}
