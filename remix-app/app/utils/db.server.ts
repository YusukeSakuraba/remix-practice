import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  // ユニオン型（PrismaClient型かundefined型を取る）
  var __db__: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  db = global.__db__;
  db.$connect();
}

export { db };
