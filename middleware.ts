import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CLUSTER2_CANONICALS = new Map<string, string>([
  ["/christian-science", "/christian-science/"],
  ["/christian-science/beliefs", "/christian-science/beliefs/"],
]);

function redirectTo(request: NextRequest, pathname: string) {
  const destination = new URL(request.url);
  destination.pathname = pathname;
  return NextResponse.redirect(destination, 308);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const canonical = CLUSTER2_CANONICALS.get(pathname);
  if (canonical) {
    return redirectTo(request, canonical);
  }

  // Preserve the two approved Cluster 2 trailing-slash URLs as direct routes.
  if (pathname === "/christian-science/" || pathname === "/christian-science/beliefs/") {
    return NextResponse.next();
  }

  // The removed competitor must always resolve in one hop to the approved pillar.
  if (pathname === "/about/christian-science" || pathname === "/about/christian-science/") {
    return redirectTo(request, "/christian-science/");
  }

  // skipTrailingSlashRedirect disables Next.js's automatic slash removal globally.
  // Re-create the production baseline behavior for every unrelated non-root URL.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return redirectTo(request, pathname.slice(0, -1));
  }

  return NextResponse.next();
}
