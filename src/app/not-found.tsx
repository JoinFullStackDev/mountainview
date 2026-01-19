import Link from "next/link";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
        </div>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border font-medium rounded-lg hover:bg-muted transition-colors"
          >
            <Phone className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
