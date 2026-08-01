import Link from "next/link";

export function Breadcrumbs({ path, title }: { path: string; title: string }) {
  const parts = path.split("/").filter(Boolean);
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        {parts.map((part, index) => {
          const href = `/${parts.slice(0, index + 1).join("/")}`;
          const last = index === parts.length - 1;
          const label = last ? title : part.replaceAll("-", " ").replace(/\b\w/g, (m) => m.toUpperCase());
          return <li key={href}>{last ? <span aria-current="page">{label}</span> : <Link href={href}>{label}</Link>}</li>;
        })}
      </ol>
    </nav>
  );
}
