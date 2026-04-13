import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import EmergencyButton from "@/components/EmergencyButton";
import OfflineBanner from "@/components/OfflineBanner";
import Index from "./pages/Index";
import DiseaseDetection from "./pages/DiseaseDetection";
import WeatherAlerts from "./pages/WeatherAlerts";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Emergency from "./pages/Emergency";
import Marketplace from "./pages/Marketplace";
import Schemes from "./pages/Schemes";
import ProfitPredictor from "./pages/ProfitPredictor";
import SoilScanner from "./pages/SoilScanner";
import Expenses from "./pages/Expenses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OfflineBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/detect" element={<DiseaseDetection />} />
          <Route path="/weather" element={<WeatherAlerts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/profit" element={<ProfitPredictor />} />
          <Route path="/soil" element={<SoilScanner />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <EmergencyButton />
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
