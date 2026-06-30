import React from "react";
import Layout from "../components/Layout";

export default function StandaloneLayoutPage() {
  return (
    <Layout>
      <div className="border border-dashed border-teal-500/30 rounded-2xl p-8 text-center bg-slate-900/20">
        <h2 className="text-xl font-bold text-teal-400 mb-2">
          Layout Remote Standalone
        </h2>
        <p className="text-sm text-slate-400">
          This layout is served from the layout micro-frontend.
        </p>
      </div>
    </Layout>
  );
}
