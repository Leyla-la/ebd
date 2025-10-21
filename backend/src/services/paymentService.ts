import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type PaymentResult = {
  success: boolean;
  transactionId?: string;
  error?: string;
};

// Simulated AppotaPay transfer
export async function payPayrollItem(itemId: string): Promise<PaymentResult> {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 200));
  const txId = `APPOTA_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  try {
    await prisma.payrollItem.update({
      where: { id: itemId },
      data: {
        status: 'PAID',
        details: {
          payment: {
            provider: 'AppotaPay',
            transactionId: txId,
            attemptedAt: new Date().toISOString(),
            status: 'SUCCESS',
          },
        } as any,
      },
    });
    return { success: true, transactionId: txId };
  } catch (e: any) {
    await prisma.payrollItem.update({
      where: { id: itemId },
      data: {
        status: 'FAILED',
        details: {
          payment: {
            provider: 'AppotaPay',
            attemptedAt: new Date().toISOString(),
            status: 'FAILED',
            error: e?.message || 'Unknown error',
          },
        } as any,
      },
    });
    return { success: false, error: e?.message };
  }
}

export async function payAllPendingInPayroll(payrollId: string) {
  const items = await prisma.payrollItem.findMany({
    where: { payrollId, status: 'PENDING' },
  });
  const results: Array<PaymentResult & { itemId: string }> = [];
  for (const item of items) {
    const res = await payPayrollItem(item.id);
    results.push({ ...res, itemId: item.id });
  }
  return results;
}
