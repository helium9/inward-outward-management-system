import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "../../db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchTerm } = req.query;

  try {
    const filteredClaims = await prisma.meta.findMany({
      where: {
        OR: [
          { indName: { contains: searchTerm as string, mode: 'insensitive' } },
          { deptName: { contains: searchTerm as string, mode: 'insensitive' } },
          { partyName: { contains: searchTerm as string, mode: 'insensitive' } },
          { claimantName: { contains: searchTerm as string, mode: 'insensitive' } },
          { inwardNumber: { equals: parseInt(searchTerm as string) } },
          { inwardDate: { equals: new Date(searchTerm as string) } },
          { issueDate: { equals: new Date(searchTerm as string) } },
          { lastActionRemarks: { contains: searchTerm as string, mode: 'insensitive' } },
          { actionTakenBy: { contains: searchTerm as string, mode: 'insensitive' } },
        ],
      },
    });

    res.status(200).json(filteredClaims);
  } catch (error) {
    console.error('Error searching claims:', error);
    res.status(500).json({ message: 'Error searching claims' });
  }
}