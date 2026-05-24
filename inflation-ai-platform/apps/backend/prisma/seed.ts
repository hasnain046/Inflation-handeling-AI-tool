import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@inflationai.com' },
    update: {},
    create: {
      email: 'admin@inflationai.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: true,
    },
  })

  // Create analyst user
  const analystPassword = await bcrypt.hash('Analyst@123456', 12)
  await prisma.user.upsert({
    where: { email: 'analyst@inflationai.com' },
    update: {},
    create: {
      email: 'analyst@inflationai.com',
      name: 'Demo Analyst',
      password: analystPassword,
      role: 'ANALYST',
      emailVerified: true,
    },
  })

  // Seed CPI records
  const cpiData = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(2022, i, 1)
    return {
      date,
      value: parseFloat((290 + i * 1.1 + Math.sin(i * 0.5) * 3).toFixed(1)),
      yoy: parseFloat((3.2 + Math.sin(i * 0.3) * 1.5).toFixed(2)),
      mom: parseFloat((0.3 + Math.sin(i * 0.8) * 0.4).toFixed(2)),
      source: 'BLS',
    }
  })

  for (const record of cpiData) {
    await prisma.cPIRecord.upsert({
      where: { date: record.date },
      update: {},
      create: record,
    })
  }

  // Seed economic indicators
  const indicators = [
    { name: 'Unemployment Rate', value: 3.7, unit: '%', source: 'BLS', change: -0.1, date: new Date() },
    { name: 'GDP Growth', value: 2.1, unit: '%', source: 'BEA', change: 0.3, date: new Date() },
    { name: 'Fed Funds Rate', value: 5.25, unit: '%', source: 'FRED', change: 0, date: new Date() },
    { name: 'Oil Price (WTI)', value: 78.4, unit: 'USD/bbl', source: 'EIA', change: 2.1, date: new Date() },
  ]

  for (const ind of indicators) {
    await prisma.economicIndicator.create({ data: ind })
  }

  // Seed alerts for admin
  await prisma.alert.createMany({
    data: [
      { userId: admin.id, type: 'INFLATION_SPIKE', severity: 'HIGH', message: 'CPI increased 0.4% MoM — above forecast of 0.2%', read: false },
      { userId: admin.id, type: 'SENTIMENT_ANOMALY', severity: 'MEDIUM', message: 'Negative sentiment spike detected in housing sector', read: false },
      { userId: admin.id, type: 'ECONOMIC_SHOCK', severity: 'CRITICAL', message: 'Oil price surged 8% — commodity shock index elevated', read: true },
    ],
  })

  console.log('✅ Seed complete')
  console.log('Admin: admin@inflationai.com / Admin@123456')
  console.log('Analyst: analyst@inflationai.com / Analyst@123456')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
