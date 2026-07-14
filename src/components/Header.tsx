import React from "react";
import { Button } from "shared_remote/Button";
import { useDispatch } from "react-redux";
import { toggleTheme } from "shared_remote/store";
import {
  Sun,
  Moon,
  Search,
  Bell,
  ChevronDown,
  Check,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Info,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";

interface HeaderProps {
  theme: any;
  auth: any;
}

export default function Header({ theme, auth }: HeaderProps) {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [hoveredItemId, setHoveredItemId] = React.useState<string | null>(null);
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  React.useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "MAKER_CHECKER":
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case "COMPLIANCE":
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
      case "SYSTEM":
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case "TICKET":
        return <Info className="w-4 h-4 text-sky-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const getPriorityStyles = (priority: string, themeMode: string) => {
    const border =
      priority === "CRITICAL"
        ? "border-l-rose-500"
        : priority === "WARNING"
          ? "border-l-amber-500"
          : priority === "INFO"
            ? "border-l-sky-500"
            : "border-l-slate-500";

    const bg =
      themeMode === "dark"
        ? "bg-slate-900 hover:bg-slate-850 text-slate-100"
        : "bg-white hover:bg-slate-50 text-slate-900";

    return `${border} ${bg}`;
  };

  const getCategoryStyles = (category: string, themeMode: string) => {
    const isDark = themeMode === "dark";
    switch (category) {
      case "MAKER_CHECKER":
        return isDark
          ? "bg-slate-800 text-emerald-400"
          : "bg-emerald-50 text-emerald-700";
      case "COMPLIANCE":
        return isDark
          ? "bg-slate-800 text-amber-400"
          : "bg-amber-50 text-amber-700";
      case "SYSTEM":
        return isDark
          ? "bg-slate-800 text-rose-400"
          : "bg-rose-50 text-rose-700";
      case "TICKET":
        return isDark ? "bg-slate-800 text-sky-400" : "bg-sky-50 text-sky-700";
      default:
        return isDark
          ? "bg-slate-800 text-slate-400"
          : "bg-slate-100 text-slate-700";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "MAKER_CHECKER":
        return "Otorisasi";
      case "COMPLIANCE":
        return "Kepatuhan";
      case "SYSTEM":
        return "Sistem";
      case "TICKET":
        return "Aduan";
      default:
        return "Umum";
    }
  };

  return (
    <header
      className={`h-16 flex items-center justify-between px-6 border-b z-30 sticky top-0 transition-colors duration-350 ${
        theme?.mode === "dark"
          ? "bg-slate-950/80 border-slate-900/80 backdrop-blur-xl"
          : "bg-slate-50/80 border-slate-200 backdrop-blur-xl"
      }`}
    >
      {/* Search bar */}
      <div className="w-72 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search customers, transactions..."
          className="w-full bg-slate-900/50 border border-slate-800/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
        />
      </div>

      {/* Right Header Operations */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-colors"
        >
          {theme?.mode === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-xl border transition-colors relative ${
              showNotifications
                ? "text-teal-500 border-teal-500 bg-slate-900/50"
                : theme?.mode === "dark"
                  ? "border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  : "border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <Bell className="w-4 h-4" />
            {mounted && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border border-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </Button>

          {mounted && showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden transition-all duration-200 origin-top-right ${
                theme?.mode === "dark"
                  ? "border-slate-800 text-slate-100"
                  : "border-slate-200 text-slate-900"
              }`}
              style={{
                backgroundColor: theme?.mode === "dark" ? "#0f172a" : "#ffffff",
                opacity: 1,
              }}
            >
              {/* Dropdown Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-inherit"
                style={{
                  backgroundColor:
                    theme?.mode === "dark" ? "#0f172a" : "#ffffff",
                  opacity: 1,
                }}
              >
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">
                    Notifikasi Backoffice
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {unreadCount} belum dibaca
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead()}
                    className="flex items-center gap-1 text-[10px] font-semibold text-teal-500 hover:text-teal-400 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Tandai semua dibaca
                  </button>
                )}
              </div>

              {/* Dropdown Content */}
              <div className="max-h-[360px] overflow-y-auto divide-y divide-inherit">
                {isLoading ? (
                  <div
                    className="p-8 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2"
                    style={{
                      backgroundColor:
                        theme?.mode === "dark" ? "#0f172a" : "#ffffff",
                    }}
                  >
                    <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    <span>Memuat notifikasi...</span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div
                    className="p-8 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2"
                    style={{
                      backgroundColor:
                        theme?.mode === "dark" ? "#0f172a" : "#ffffff",
                    }}
                  >
                    <Bell className="w-8 h-8 text-slate-600 stroke-[1.5]" />
                    <span>Tidak ada notifikasi baru</span>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border-l-4 transition-colors flex gap-3 relative group ${
                        item.priority === "CRITICAL"
                          ? "border-l-rose-500"
                          : item.priority === "WARNING"
                            ? "border-l-amber-500"
                            : item.priority === "INFO"
                              ? "border-l-sky-500"
                              : "border-l-slate-500"
                      }`}
                      style={{
                        backgroundColor:
                          theme?.mode === "dark"
                            ? hoveredItemId === item.id
                              ? "#1e293b"
                              : "#0f172a"
                            : hoveredItemId === item.id
                              ? "#f1f5f9"
                              : "#ffffff",
                        opacity: 1,
                      }}
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                    >
                      {/* Left Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>

                      {/* Middle Content */}
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${getCategoryStyles(item.category, theme?.mode)}`}
                          >
                            {getCategoryLabel(item.category)}
                          </span>
                          <span className="text-[9px] text-slate-500">
                            {formatTime(item.createdAt)}
                          </span>
                        </div>
                        <h4
                          className={`text-xs mt-1 min-w-0 break-words leading-tight ${item.status === "UNREAD" ? "font-bold" : "font-normal"}`}
                        >
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                          {item.message}
                        </p>
                      </div>

                      {/* Right Action Hover Buttons */}
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.status === "UNREAD" && (
                          <button
                            onClick={() => markAsRead(item.id)}
                            title="Tandai dibaca"
                            className={`p-1 rounded border transition-colors ${
                              theme?.mode === "dark"
                                ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-teal-500 hover:border-teal-500"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:text-teal-650 hover:border-teal-550"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(item.id)}
                          title="Hapus"
                          className={`p-1 rounded border transition-colors ${
                            theme?.mode === "dark"
                              ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-500"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-500"
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Unread Indicator Dot */}
                      {item.status === "UNREAD" && (
                        <span className="absolute right-3.5 bottom-3.5 w-1.5 h-1.5 rounded-full bg-teal-500 group-hover:hidden" />
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Dropdown Footer */}
              <div
                className="px-4 py-2 border-t border-inherit text-center"
                style={{
                  backgroundColor:
                    theme?.mode === "dark" ? "#0b0f19" : "#f8fafc",
                  opacity: 1,
                }}
              >
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] font-semibold text-slate-500 hover:text-slate-400 transition-colors"
                >
                  Tutup Panel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="h-8 border-l border-slate-800" />
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
              {auth?.user?.email}
            </p>
            <p className="text-[10px] text-teal-500 font-bold">
              Session Active
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
        </div>
      </div>
    </header>
  );
}
