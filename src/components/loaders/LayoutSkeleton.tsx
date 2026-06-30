import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "shared_remote/Skeleton";

interface LayoutSkeletonProps {
  children?: React.ReactNode;
}

export default function LayoutSkeleton({ children }: LayoutSkeletonProps) {
  const theme = useSelector((state: any) => state.theme);

  return (
    <div
      className={`min-h-screen flex font-sans relative overflow-hidden transition-colors duration-350 ${
        theme?.mode === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-950"
      }`}
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Sidebar Skeleton */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col border-r w-64 ${
          theme?.mode === "dark" ? "bg-slate-900/60 border-slate-850/80 backdrop-blur-xl" : "bg-white border-slate-200"
        }`}
      >
        {/* Sidebar Header Skeleton */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-inherit">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Navigation Items Skeletons */}
        <nav className="flex-1 px-3 py-4 space-y-3.5">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 px-3 py-2.5">
              <Skeleton className="w-5 h-5 rounded-lg" />
              <Skeleton className="h-4 flex-1 max-w-[120px]" />
            </div>
          ))}
        </nav>

        {/* Sidebar Footer Skeleton */}
        <div className="p-4 border-t border-inherit flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-2 w-12" />
            </div>
          </div>
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        {/* Header Skeleton */}
        <header
          className={`h-16 flex items-center justify-between px-6 border-b z-10 sticky top-0 ${
            theme?.mode === "dark"
              ? "bg-slate-950/80 border-slate-900/80 backdrop-blur-xl"
              : "bg-slate-50/80 border-slate-200 backdrop-blur-xl"
          }`}
        >
          {/* Search bar */}
          <div className="w-72">
            <Skeleton className="w-full h-8 rounded-xl" />
          </div>

          {/* Right Header Operations */}
          <div className="flex items-center gap-4">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="w-8 h-8 rounded-xl" />
            <div className="h-8 border-l border-slate-800" />
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-2 w-16" />
              </div>
              <Skeleton className="w-4 h-4 rounded" />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          {children || <div className="min-h-[500px] animate-pulse bg-slate-900/10 rounded-2xl border border-slate-900/20" />}
        </main>
      </div>
    </div>
  );
}
