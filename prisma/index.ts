import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { Pool } from "@neondatabase/serverless";
// import "dotenv/config";

// const neon = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaNeon(neon);
// const prisma = new PrismaClient({ adapter });

// export default prisma;
