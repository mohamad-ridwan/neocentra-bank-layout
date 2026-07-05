import React, { Suspense, lazy } from "react";
import LayoutSkeleton from "./loaders/LayoutSkeleton";

const LayoutViewWrapper = lazy(() => import("./LayoutViewWrapper"));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  React.useEffect(() => {
    console.log("Layout component initialized");
  }, []);

  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <LayoutViewWrapper>{children}</LayoutViewWrapper>
    </Suspense>
  );
}
