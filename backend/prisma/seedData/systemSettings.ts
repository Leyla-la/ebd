import { PrismaClient } from '@prisma/client';

export async function seedSystemSettings(prisma: PrismaClient) {
  console.log('Seeding system settings...');
  const settings = [
    { key: 'siteName', value: { name: 'EBD Corp' }, description: 'The name of the company website.' },
    { key: 'maintenanceMode', value: { enabled: false }, description: 'Enable or disable maintenance mode.' },
    { key: 'defaultLanguage', value: { lang: 'en' }, description: 'Default language for the application.' },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    });
  }
  console.log('System settings seeded.');
}
