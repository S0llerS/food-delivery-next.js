// app/api/debug-env/route.ts
export async function GET() {
  return Response.json({
    DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
    NEXTAUTH_SECRET: process.env.AUTH_SECRET ? "set" : "missing",
    GOOGLE_ID: process.env.GOOGLE_ID ? "set" : "missing",
    GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? "set" : "missing",
  });
}
