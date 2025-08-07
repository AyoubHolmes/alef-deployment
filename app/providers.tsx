'use client'

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/language/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </LanguageProvider>
      </AdminProvider>
    </QueryClientProvider>
  )
}