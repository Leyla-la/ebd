import { useEffect, useRef } from "react";
import io from "socket.io-client";
// @ts-ignore
import type { Socket as LegacySocket } from "socket.io-client";

export function useNotificationSocket(token: string, onNotification: (notification: any) => void) {
  // @ts-ignore
  const socketRef = useRef<LegacySocket | null>(null);

  useEffect(() => {
    if (!token) return;
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002", {
      auth: { token },
      transports: ["websocket"],
    });
    socketRef.current = socket;
    socket.on("notification", onNotification);
    return () => {
      socket.off("notification", onNotification);
      socket.disconnect();
    };
  }, [token, onNotification]);

  return socketRef;
}
