// /app/lib/prisma.ts
//프리즈마 클라이언트
//코드 내용은 쉽게 말해서 Prisma Client를 꼭 한 개만 메모리에 불러오는 로직입니다.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
