import { PrismaClient } from '@prisma/frontend';
import { Server } from 'socket.io';
import { emitNotificationToUser } from '../sockets/notification.js';

const prisma = new PrismaClient();

export async function createAndNotify({ data, io }: { data: any, io: Server }) {
  // Create notification in DB
  const notification = await prisma.notification.create({ data });
  // Emit real-time notification if userId present
  if (notification.employeeId) {
    emitNotificationToUser(io, notification.employeeId, notification);
  }
  if (notification.adminId) {
    emitNotificationToUser(io, notification.adminId, notification);
  }
  return notification;
}
