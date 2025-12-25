import React from 'react';
import { Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function Layout({ children, action }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight">AuthVault</h1>
        </div>
        <div className="flex items-center gap-4">
          {action}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 pb-12 max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
}
