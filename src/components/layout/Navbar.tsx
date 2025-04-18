
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Beaker, 
  BookOpen, 
  BarChart, 
  User, 
  Menu, 
  Search,
  FlaskConical
} from "lucide-react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="border-b border-border bg-white dark:bg-gray-900 sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Link 
          to="/" 
          className="flex items-center gap-2 mr-6"
        >
          <FlaskConical size={28} className="text-lab-blue" />
          <span className="text-xl font-bold hidden md:inline-block bg-gradient-to-r from-lab-blue to-lab-teal bg-clip-text text-transparent">
            PractoLabs
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Beaker className="h-4 w-4" />
            <span>Experiments</span>
          </Link>
          <Link to="/library" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" />
            <span>Library</span>
          </Link>
          <Link to="/analytics" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search experiments..."
              className="rounded-md border border-input bg-background pl-8 h-9 w-[200px] sm:w-[300px] px-3"
            />
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
