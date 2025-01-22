import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", 
  "/sign-up(.*)",
  "/landing", 
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    try {
      await auth.protect();
    } catch (error) {
      console.error("Authentication error in middleware:", error);
      return new Response("Unauthorized", { status: 401 });
    }
  }
});
export const config = {
  matcher: [
    // Match all application routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Match all API routes
    "/api/(.*)",
  ],
};
