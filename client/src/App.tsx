import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useTrafficTracker } from "@/hooks/use-traffic-tracker";
import Home from "@/pages/Home";
import Quote from "@/pages/Quote";
import ThankYou from "@/pages/ThankYou";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Bookings from "@/pages/Bookings";
import NotFound from "@/pages/not-found";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// SEO Landing Pages
import Emergency24HourTireRepair from "@/pages/Emergency24HourTireRepair";
import MobileTireRepairNearMe from "@/pages/MobileTireRepairNearMe";

// Location pages
import PalmCoast from "@/pages/locations/PalmCoast";
import DaytonaBeach from "@/pages/locations/DaytonaBeach";
import StAugustine from "@/pages/locations/StAugustine";
import OrmondBeach from "@/pages/locations/OrmondBeach";
import Jacksonville from "@/pages/locations/Jacksonville";
import Palatka from "@/pages/locations/Palatka";
import Gainesville from "@/pages/locations/Gainesville";
import DeLand from "@/pages/locations/DeLand";

function Router() {
  useTrafficTracker();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/quote" component={Quote} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/bookings" component={Bookings} />

      {/* SEO Landing Pages */}
      <Route path="/emergency-24-hour-tire-repair" component={Emergency24HourTireRepair} />
      <Route path="/mobile-tire-repair-near-me" component={MobileTireRepairNearMe} />

      {/* Location pages */}
      <Route path="/locations/palm-coast" component={PalmCoast} />
      <Route path="/locations/daytona-beach" component={DaytonaBeach} />
      <Route path="/locations/st-augustine" component={StAugustine} />
      <Route path="/locations/ormond-beach" component={OrmondBeach} />
      <Route path="/locations/jacksonville" component={Jacksonville} />
      <Route path="/locations/palatka" component={Palatka} />
      <Route path="/locations/gainesville" component={Gainesville} />
      <Route path="/locations/deland" component={DeLand} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;