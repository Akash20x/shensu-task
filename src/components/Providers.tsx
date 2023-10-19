"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster"


interface ProvidersProps {
  children: React.ReactNode
}


const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
      {children}
      <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;