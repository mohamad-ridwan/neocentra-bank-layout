import React from 'react';
import { Button } from 'shared_remote/Button';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  Settings, 
  LogOut, 
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: any;
  auth: any;
  handleLogout: () => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  theme,
  auth,
  handleLogout,
}: SidebarProps) {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, badge: null },
    { name: 'KYC Verification', icon: UserCheck, badge: '4' },
    { name: 'Accounts CS', icon: Users, badge: null },
    { name: 'Security Audit', icon: ShieldCheck, badge: 'new' },
    { name: 'System Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col border-r transition-all duration-300 ${
      theme?.mode === 'dark' 
        ? 'bg-slate-900/60 border-slate-850/80 backdrop-blur-xl' 
        : 'bg-white border-slate-200'
    } ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-inherit">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/10">
            <span className="text-white font-black text-base tracking-tighter">N</span>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">NeoCentra</span>
              <span className="text-[10px] text-teal-500 font-bold tracking-wider uppercase">Backoffice</span>
            </div>
          )}
        </div>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-1.5 rounded-lg hover:bg-slate-800/30 transition-colors ${!sidebarOpen && 'mx-auto'}`}
        >
          {sidebarOpen ? <X className="w-4 h-4 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-gradient-to-r from-teal-500/10 to-indigo-500/10 text-teal-400 border-l-2 border-teal-500' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/10'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              {sidebarOpen && (
                <span className="text-sm font-medium flex-1 text-left">{item.name}</span>
              )}
              {sidebarOpen && item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  item.badge === 'new' 
                    ? 'bg-indigo-500/20 text-indigo-400' 
                    : 'bg-teal-500/20 text-teal-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-inherit flex flex-col gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-teal-400 font-bold uppercase text-xs">
            {auth?.user?.username?.substring(0, 2)}
          </div>
          {sidebarOpen && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">{auth?.user?.username}</span>
              <span className="text-[10px] text-slate-400 truncate">{auth?.user?.role}</span>
            </div>
          )}
        </div>
        {sidebarOpen && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/10 transition-colors text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        )}
      </div>
    </aside>
  );
}
