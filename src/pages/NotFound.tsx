import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h2>
        </div>
        <p className="text-muted-foreground max-w-[500px] text-balance">
          We couldn't find the page you were looking for. The page might have
          been removed, renamed, or doesn't exist.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <HomeIcon className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
