import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Quote from "@/pages/Quote";
import ThankYou from "@/pages/ThankYou";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import Bookings from "@/pages/Bookings";

// Location pages
import PalmCoast from "@/pages/locations/PalmCoast";
import DaytonaBeach from "@/pages/locations/DaytonaBeach";
import StAugustine from "@/pages/locations/StAugustine";
import OrmondBeach from "@/pages/locations/OrmondBeach";
import Jacksonville from "@/pages/locations/Jacksonville";
import Palatka from "@/pages/locations/Palatka";
import Gainesville from "@/pages/locations/Gainesville";
import DeLand from "@/pages/locations/DeLand";

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
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quote" component={Quote} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/bookings" component={Bookings} />
      
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
