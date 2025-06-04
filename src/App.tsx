
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import SimplePendulum from "./pages/experiments/SimplePendulum";
import EnergyGap from "./pages/experiments/EnergyGap";
import FreeFall from "./pages/experiments/FreeFall";
import ProjectileMotion from "./pages/experiments/ProjectileMotion";
import DiodeCharacteristics from "./pages/experiments/DiodeCharacteristics";
import CircuitAnalysis from "./pages/experiments/CircuitAnalysis";
import Titration from "./pages/experiments/Titration";
import StudentDashboard from "./pages/StudentDashboard";
import Library from "./pages/Library";
import Analytics from "./pages/Analytics";
import ProgressTracking from "./pages/ProgressTracking";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/progress-tracking" element={<ProgressTracking />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/experiment/simple-pendulum" element={<SimplePendulum />} />
            <Route path="/experiment/energy-gap" element={<EnergyGap />} />
            <Route path="/experiment/free-fall" element={<FreeFall />} />
            <Route path="/experiment/projectile" element={<ProjectileMotion />} />
            <Route path="/experiment/diode" element={<DiodeCharacteristics />} />
            <Route path="/experiment/circuit" element={<CircuitAnalysis />} />
            <Route path="/experiment/titration" element={<Titration />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
