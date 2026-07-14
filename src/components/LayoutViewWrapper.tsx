import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutViewWrapper({ children }: LayoutProps) {
  const auth = useSelector((state: any) => state.auth);
  const theme = useSelector((state: any) => state.theme);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const router = useRouter();

  const handleLogout = async () => {
    try {
      router.push("/logout");
    } catch (error) {
      alert("Logout failed, please try again later");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`min-h-screen flex font-sans relative overflow-hidden transition-colors duration-350 ${
        theme?.mode === "dark"
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-950"
      }`}
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        auth={auth}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
      >
        {/* Navbar / Header */}
        <Header theme={theme} auth={auth} />

        {/* Content Body */}
        <main className="flex-1 p-8 overflow-y-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
