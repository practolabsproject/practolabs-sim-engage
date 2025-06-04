
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Atom,
  Zap,
  Pill,
  FlaskConical,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Laptop,
  GraduationCap,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CategoryProps = {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  children?: React.ReactNode;
};

const Category = ({ icon, title, active, children }: CategoryProps) => {
  const [isOpen, setIsOpen] = React.useState(active);

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between font-normal",
          active ? "bg-muted/50" : ""
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        {children && (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      {isOpen && children && (
        <div className="ml-6 mt-2 space-y-1">{children}</div>
      )}
    </div>
  );
};

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-white dark:bg-gray-900 border-r border-border transform transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <FlaskConical size={28} className="text-lab-blue" />
          <span className="text-xl font-bold bg-gradient-to-r from-lab-blue to-lab-teal bg-clip-text text-transparent">
            PractoLabs
          </span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium px-3 mb-2">Student Portal</h3>
          <Button variant="ghost" className="w-full justify-start font-normal" asChild>
            <Link to="/student-dashboard">
              <GraduationCap className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal" asChild>
            <Link to="/progress-tracking">
              <BarChart className="h-4 w-4 mr-2" />
              Progress Tracking
            </Link>
          </Button>
          <Separator className="my-2" />
          <h3 className="text-sm font-medium px-3 mb-2">Experiment Categories</h3>
          <Separator className="my-1" />
          <Category
            icon={<Atom className="h-4 w-4" />}
            title="Physics"
            active
          >
            <Link 
              to="/experiment/simple-pendulum" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Simple Pendulum
            </Link>
            <Link 
              to="/experiment/energy-gap" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Energy Gap of P-N Junction
            </Link>
            <Link 
              to="/experiment/free-fall" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Free Fall Motion
            </Link>
            <Link 
              to="/experiment/projectile" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Projectile Motion
            </Link>
          </Category>
          <Category
            icon={<Zap className="h-4 w-4" />}
            title="Electrical Engineering"
          >
            <Link 
              to="/experiment/diode" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Diode Characteristics
            </Link>
            <Link 
              to="/experiment/circuit" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Circuit Analysis
            </Link>
            <Link 
              to="/experiment/rc-circuit" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              RC Circuits
            </Link>
          </Category>
          <Category
            icon={<FlaskConical className="h-4 w-4" />}
            title="Chemistry"
          >
            <Link 
              to="/experiment/titration" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Titration
            </Link>
            <Link 
              to="/experiment/acid-base" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Acid-Base Reactions
            </Link>
            <Link 
              to="/experiment/kinetics" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Chemical Kinetics
            </Link>
          </Category>
          <Category
            icon={<Laptop className="h-4 w-4" />}
            title="Advanced STEM"
          >
            <Link 
              to="/experiment/ai-learning" 
              className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              AI-based Learning
            </Link>
          </Category>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium px-3 mb-2">Resources</h3>
          <Button variant="ghost" className="w-full justify-start font-normal" asChild>
            <Link to="/library">
              <BookOpen className="h-4 w-4 mr-2" />
              Study Materials
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal" asChild>
            <Link to="/help-support">
              <Pill className="h-4 w-4 mr-2" />
              Help & Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
