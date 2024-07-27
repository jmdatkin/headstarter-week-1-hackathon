import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/classes(.*)",
  "/reading(.*)",
  "/homeworks(.*)",
  "/announcements(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    auth().protect((has) => {
      return has({ role: "org:admin" });
    });
  }
  if (isProtectedRoute(req)) {
    auth().protect();
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
