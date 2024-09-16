import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// TODO: for 2+ mvp version
const isPublicRoute = createRouteMatcher(["/", "/auth/(.*)", "/api/(.*)"]);
// const isPublicRoute = createRouteMatcher([
//   ProjectUrls.home,
//   ProjectUrls.roadMap,
// ]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    // TODO: for 2+ mvp version
    auth().protect();
    // return NextResponse.redirect(new URL(ProjectUrls.home, req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
