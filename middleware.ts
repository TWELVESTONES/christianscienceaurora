import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const TRAILING_SLASH_CANONICALS = new Map<string, string>([
  ["/christian-science", "/christian-science/"],
  ["/christian-science/beliefs", "/christian-science/beliefs/"],
  ["/christian-science/god", "/christian-science/god/"],
  ["/christian-science/jesus-christ", "/christian-science/jesus-christ/"],
]);

const DIRECT_TRAILING_SLASH_PATHS = new Set(TRAILING_SLASH_CANONICALS.values());

function redirectTo(request: NextRequest, pathname: string) {
  const destination = new URL(request.url);
  destination.pathname = pathname;
  return NextResponse.redirect(destination, 308);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const canonical = TRAILING_SLASH_CANONICALS.get(pathname);
  if (canonical) {
    return redirectTo(request, canonical);
  }

  // Preserve approved Cluster 2, 3, and 4 trailing-slash authority URLs as direct routes.
  if (DIRECT_TRAILING_SLASH_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // The removed Cluster 2 competitor always resolves in one hop to the approved pillar.
  if (pathname === "/about/christian-science" || pathname === "/about/christian-science/") {
    return redirectTo(request, "/christian-science/");
  }

  // skipTrailingSlashRedirect disables Next.js automatic slash removal globally.
  // Re-create the established production behavior for every unrelated non-root URL.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return redirectTo(request, pathname.slice(0, -1));
  }

  return NextResponse.next();
}
