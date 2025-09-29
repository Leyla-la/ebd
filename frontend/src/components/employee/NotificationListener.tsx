"use client";
import { useState, useCallback } from "react";
import { useNotificationSocket } from "../../hooks/use-noti-socket";

export default function NotificationListener({ token }: { token: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleNotification = useCallback((notification: any) => {
    setNotifications((prev) => [notification, ...prev]);
    // Optionally: show toast, badge, etc.
  }, []);

  useNotificationSocket(token, handleNotification);

  return (
    <div>
      <h3>Real-time Notifications</h3>
      <ul>
        {notifications.map((n, i) => (
          <li key={n.id || i}>
            <b>{n.title}</b>: {n.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
