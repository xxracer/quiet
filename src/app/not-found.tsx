import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "We couldn't find the page you were looking for. Explore our noise-free dinnerware collection.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-36 pb-16 flex items-center">
        <div className="container-main text-center max-w-xl">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-4">
            404
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 tracking-tight text-pretty">
            Page not found
          </h1>
          <p className="text-muted-foreground text-lg mb-10 text-pretty">
            The page you are looking for may have moved or no longer exists.
            Let us help you find your way back to peaceful dining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Back to home</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg">Shop products</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
