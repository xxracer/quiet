import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

export default function LoadingPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen pt-36 pb-16">
        <div className="container-main max-w-6xl">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-secondary rounded w-1/3" />
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="aspect-square bg-secondary rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-1/4" />
                <div className="h-6 bg-secondary rounded w-1/3" />
                <div className="h-24 bg-secondary rounded" />
                <div className="h-32 bg-secondary rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
