import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, History } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const meta_id = searchParams.get("meta_id");

  if (!meta_id || typeof meta_id !== 'string') {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const history = await prisma.history.findMany({
      where: {
        meta_id,
      },
      include: {
        meta_data: true,
        employee: true,
      },
    });

    if (!history) {
      return NextResponse.json({ error: 'History not found' }, { status: 404 });
    }

    const allEmployees = await prisma.employee.findMany();

    const responseData = {
      history,
      employees: allEmployees,
    };

    // return NextResponse.json(history);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
};