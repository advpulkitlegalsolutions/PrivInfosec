import Image from "next/image";
import { LinkedInIcon } from "@/components/brand/social-icons";
import { PlaceholderBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { team, type TeamMember } from "@/data/team";

export const visibleTeam = () => team.filter((m) => !m.placeholder || siteConfig.showContentPlaceholders);

function Initials({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div aria-hidden="true" className="flex aspect-square w-full items-center justify-center rounded-lg border border-border bg-surface-2">
      <span className="font-heading text-h2 font-semibold text-muted-foreground">{initials}</span>
    </div>
  );
}

/** Leadership profile rendered from data/team.ts. Never hard-code biographies here. */
export function LeaderProfile({ member }: { member: TeamMember }) {
  return (
    <Card as="article" className="grid gap-8 p-6 sm:p-8 md:grid-cols-12">
      <div className="md:col-span-4">
        {member.image ? (
          <Image src={member.image} alt={`${member.name}, ${member.title}`} width={480} height={480} className="aspect-square w-full rounded-lg object-cover" />
        ) : (
          <Initials name={member.name} />
        )}
      </div>
      <div className="md:col-span-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-heading text-h3 font-semibold text-foreground">{member.name}</h3>
          {member.placeholder && <PlaceholderBadge>Awaiting verified profile</PlaceholderBadge>}
        </div>
        <p className="mt-1 text-small text-accent-text">{member.title}</p>
        <p className="mt-5 text-body leading-relaxed text-subtle-foreground">{member.shortBio}</p>
        {member.longBio.map((para) => (
          <p key={para} className="mt-4 text-small leading-relaxed text-muted-foreground">
            {para}
          </p>
        ))}
        <dl className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          {member.areasOfExpertise.length > 0 && (
            <div>
              <dt className="text-caption font-medium text-foreground">Areas of expertise</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {member.areasOfExpertise.map((a) => (
                  <span key={a} className="rounded-pill border border-border px-2.5 py-0.5 text-caption text-subtle-foreground">
                    {a}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {member.qualifications.length > 0 && (
            <div>
              <dt className="text-caption font-medium text-foreground">Qualifications</dt>
              <dd className="mt-2 text-small text-muted-foreground">{member.qualifications.join(" · ")}</dd>
            </div>
          )}
          {member.recognitions.length > 0 && (
            <div>
              <dt className="text-caption font-medium text-foreground">Recognition</dt>
              <dd className="mt-2 text-small text-muted-foreground">{member.recognitions.join(" · ")}</dd>
            </div>
          )}
        </dl>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-small font-medium text-foreground hover:text-accent-text"
          >
            <LinkedInIcon className="size-4" /> LinkedIn<span className="sr-only"> profile of {member.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </Card>
  );
}
