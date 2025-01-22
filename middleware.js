import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", // Sign-in page
  "/sign-up(.*)", // Sign-up page
  "/landing", // Landing page
]);

export default clerkMiddleware(async (auth, request) => {
  try {
    console.log("Middleware invoked for:", request.url); // Log the request URL

    // Skip authentication for public routes
    if (isPublicRoute(request)) {
      console.log("Public route accessed:", request.url);
      return;
    }

    // Protect non-public routes
    console.log("Protected route accessed:", request.url);
    await auth.protect();

    // If we reach this point, the user is authenticated
    console.log("Authentication successful for:", request.url);
  } catch (error) {
    console.error("Error in middleware:", error);

    // Return a 500 response for internal server errors
    return new Response("Internal Server Error", { status: 500 });
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
