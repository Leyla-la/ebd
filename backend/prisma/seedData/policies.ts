import { PrismaClient } from '@prisma/frontend';

export async function seedPolicies(prisma: PrismaClient) {
  console.log('Seeding policies...');
  const policies = [
    {
      name: 'Attendance Policy',
      description: 'Defines rules for employee attendance and punctuality.',
      rules: { minAttendance: 90, latePenalty: true },
    },
    {
      name: 'Leave Policy',
      description: 'Specifies types of leaves and approval process.',
      rules: { annualLeave: 12, sickLeave: 6, unpaidLeave: true },
    },
    {
      name: 'IT Security Policy',
      description: 'Guidelines for using company IT resources.',
      rules: { passwordChange: '90d', twoFactor: true },
    },
  ];

  for (const policy of policies) {
    await prisma.policy.upsert({
      where: { name: policy.name },
      update: {},
      create: policy,
    });
  }
  console.log('Policies seeded.');
}
