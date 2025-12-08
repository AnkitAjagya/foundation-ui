import React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
  illustration?: React.ReactNode;
  illustrationSide?: "left" | "right";
  showPattern?: boolean;
}

export const AuthLayout = ({
  children,
  className,
  illustration,
  illustrationSide = "left",
  showPattern = true,
}: AuthLayoutProps) => {
  const IllustrationPanel = () => (
    <div className="relative hidden lg:flex lg:w-1/2 xl:w-[55%] items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Pattern overlay */}
      {showPattern && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      )}
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float delay-1000" />
      
      {/* Custom illustration or default */}
      <div className="relative z-10 p-12">
        {illustration || (
          <div className="text-center text-white space-y-6 max-w-md animate-fade-in-up">
            <div className="w-24 h-24 mx-auto rounded-2xl glass flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-white/80 text-lg">
              Sign in to access your dashboard and continue where you left off.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={cn("min-h-screen flex", className)}>
      {illustrationSide === "left" && <IllustrationPanel />}
      
      {/* Auth Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </div>
      
      {illustrationSide === "right" && <IllustrationPanel />}
    </div>
  );
};

export default AuthLayout;
