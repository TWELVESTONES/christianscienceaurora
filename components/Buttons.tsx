import Link from "next/link";
import type { LinkItem } from "@/lib/types";

export function ActionButton({ action }: { action: LinkItem }) {
  const className = `btn btn-${action.variant ?? "primary"}`;
  if (action.external || action.href.startsWith("http")) {
    return <a className={className} href={action.href} target="_blank" rel="noreferrer">{action.label} <span aria-hidden="true">↗</span></a>;
  }
  if (action.href.startsWith("tel:")) return <a className={className} href={action.href}>{action.label}</a>;
  return <Link className={className} href={action.href}>{action.label}</Link>;
}

export function ButtonRow({ actions }: { actions?: LinkItem[] }) {
  if (!actions?.length) return null;
  return <div className="button-row">{actions.map((action) => <ActionButton key={`${action.label}-${action.href}`} action={action} />)}</div>;
}
