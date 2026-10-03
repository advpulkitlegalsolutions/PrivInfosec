/**
 * Icon registry. Data files reference icons by kebab-case id; this map
 * resolves them to Lucide components so data stays serialisable and
 * icons can be swapped centrally.
 */
import {
  BadgeCheck,
  Blocks,
  Briefcase,
  ChartBar,
  CircleCheck,
  ClipboardCheck,
  Cloud,
  Cpu,
  CreditCard,
  Eye,
  FileCheck,
  Globe,
  HeartPulse,
  Landmark,
  Layers,
  Lock,
  Milestone,
  Network,
  Puzzle,
  Repeat,
  Rocket,
  Scale,
  ShieldCheck,
  ShieldUser,
  ShoppingCart,
  Target,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export const icons: Record<string, LucideIcon> = {
  "shield-user": ShieldUser,
  "network-lock": Network,
  "badge-check": BadgeCheck,
  "clipboard-check": ClipboardCheck,
  "shield-check": ShieldCheck,
  users: Users,
  globe: Globe,
  blocks: Blocks,
  repeat: Repeat,
  "user-check": UserCheck,
  milestone: Milestone,
  landmark: Landmark,
  "credit-card": CreditCard,
  cloud: Cloud,
  cpu: Cpu,
  "chart-bar": ChartBar,
  briefcase: Briefcase,
  "shopping-cart": ShoppingCart,
  "heart-pulse": HeartPulse,
  rocket: Rocket,
  layers: Layers,
  puzzle: Puzzle,
  "file-check": FileCheck,
  wrench: Wrench,
  scale: Scale,
  "check-circle": CircleCheck,
  lock: Lock,
  eye: Eye,
  target: Target,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name] ?? ShieldCheck;
  return <Cmp aria-hidden="true" focusable="false" strokeWidth={1.5} {...props} />;
}
