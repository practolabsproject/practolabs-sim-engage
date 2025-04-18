
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Beaker } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center">
            <Beaker className="h-12 w-12 text-lab-blue" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404: Experiment Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The virtual experiment you're looking for doesn't exist in our laboratory.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Return to Lab</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Browse Experiments</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
