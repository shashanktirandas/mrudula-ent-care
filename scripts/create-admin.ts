import "dotenv/config";
import argon2 from "argon2";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const name = process.env.ADMIN_NAME?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!email || !name || !password) {
  throw new Error(
    "ADMIN_EMAIL, ADMIN_NAME and ADMIN_PASSWORD must be provided.",
  );
}

if (password.length < 12) {
  throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
}

const adminEmail: string = email;
const adminName: string = name;
const adminPassword: string = password;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await argon2.hash(adminPassword, {
    type: argon2.argon2id,
  });

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    throw new Error(`An admin account already exists for ${adminEmail}.`);
  }

  const admin = await prisma.adminUser.create({
    data: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  console.log("✅ Super Admin created successfully.");
  console.log(`Email: ${admin.email}`);
  console.log(`Name: ${admin.name}`);
  console.log(`Role: ${admin.role}`);
}

main()
  .catch((error) => {
    console.error("❌ Failed to create Super Admin.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });