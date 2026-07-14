import { useState, useEffect, useCallback } from "react";

export interface NotificationItem {
  id: string;
  category: "MAKER_CHECKER" | "COMPLIANCE" | "SYSTEM" | "TICKET";
  priority: "CRITICAL" | "WARNING" | "INFO";
  title: string;
  message: string;
  status: "UNREAD" | "READ";
  actionUrl: string;
  createdAt: string;
  metadata?: any;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const { apiFetch } = await import("shared_remote/apiHelper");
      const hostApiUrl =
        process.env.NEXT_PUBLIC_HOST_API_URL || "http://localhost:3341";
      const data = await apiFetch<{ notifications: NotificationItem[] }>(
        `${hostApiUrl}/api/notifications`,
      );
      setNotifications(data.notifications || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => n.status === "UNREAD").length;

  const markAsRead = async (id: string) => {
    try {
      const { apiFetch } = await import("shared_remote/apiHelper");
      const hostApiUrl =
        process.env.NEXT_PUBLIC_HOST_API_URL || "http://localhost:3341";
      await apiFetch(`${hostApiUrl}/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { apiFetch } = await import("shared_remote/apiHelper");
      const hostApiUrl =
        process.env.NEXT_PUBLIC_HOST_API_URL || "http://localhost:3341";
      await apiFetch(`${hostApiUrl}/api/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { apiFetch } = await import("shared_remote/apiHelper");
      const hostApiUrl =
        process.env.NEXT_PUBLIC_HOST_API_URL || "http://localhost:3341";
      await apiFetch(`${hostApiUrl}/api/notifications?id=${id}`, {
        method: "DELETE",
      });
      fetchNotifications();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
