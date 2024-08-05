// src/app/api/lessons/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany();
    console.log('lesson')
    console.log(lessons)
    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
