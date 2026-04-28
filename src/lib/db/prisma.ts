import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined')
}

const createPrismaClient = () => {
  let adapter: any
  const isPostgres = connectionString.startsWith('postgresql://') || connectionString.startsWith('postgres://')

  if (isPostgres) {
    const pool = new pg.Pool({ 
      connectionString,
      ssl: connectionString.includes('supabase.com') ? { rejectUnauthorized: false } : false
    })
    adapter = new PrismaPg(pool as any)
  } else {
    // Use MariaDB/MySQL adapter for MySQL connections
    // The MariaDB driver requires the 'mariadb://' protocol
    const mariadbUrl = connectionString.replace('mysql://', 'mariadb://')
    adapter = new PrismaMariaDb(mariadbUrl)
  }

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
