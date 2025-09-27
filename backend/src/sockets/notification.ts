import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";

interface UserSocket extends Socket {
  userId?: string;
  role?: string[];
}

export function registerNotificationSocket(io: Server) {
  io.on("connection", (socket: UserSocket) => {
    // Authenticate user via JWT
    const token = socket.handshake.auth?.token;
    if (token) {
      try {
  const { verify } = jwt as typeof import("jsonwebtoken");
  const decoded: any = verify(token, process.env.JWT_SECRET!);
        socket.userId = decoded.sub;
        socket.role = decoded["cognito:groups"] || [];
      } catch {
        socket.disconnect();
        return;
      }
    } else {
      socket.disconnect();
      return;
    }

    // Join room by userId for targeted notifications
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Optionally: join role-based rooms
    if (socket.role) {
      for (const r of socket.role) {
        socket.join(`role:${r}`);
      }
    }

    // Handle client events if needed
    socket.on("disconnect", () => {
      // Cleanup if needed
    });
  });
}

export function emitNotificationToUser(io: Server, userId: string, notification: any) {
  io.to(`user:${userId}`).emit("notification", notification);
}
