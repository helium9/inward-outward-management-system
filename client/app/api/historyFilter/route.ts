import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../db/db";
import { getServerSession } from "next-auth";

interface FilterData {
  inward_number?: string;
  inward_date?: string;
  ind_name?: string;
  dept_name?: string;
  party_name?: string;
  claimant_name?: string;
  subject?: string;
  amount?: string;
  status?: string;
  alloted_to_name?: string;
  advanced_req?: string;
  activePage: Number;
}

async function filterHistories(filterData: FilterData, mode: String) {
  const session = await getServerSession();
  const _count = await prisma.employee.count({
    where: { email: session?.user.email, active:true },
  });
  console.log(_count);
  // Construct Prisma query based on the filterData
  const filter_query = _count === 0 ? { origin: session?.user.email } : {};
  if(mode==='new')filter_query.status='new';
  const query = {
    skip: ((filterData.activePage as any) - 1) * 3,
    take: 3,
    where: {
      meta_data: filter_query,
    },
    include: {
      meta_data: true,
      employee: true,
    },
    orderBy: { time_stamp: 'desc' },
  };

  // Add filter conditions to the query based on the filterData
  if (filterData.inward_number) {
    query.where.meta_data.inward_number = parseInt(filterData.inward_number);
  }
  if (filterData.issue_date) {
    query.where.meta_data.issue_date = new Date(filterData.issue_date);
  }
  if (filterData.inward_date) {
    query.where.meta_data.inward_date = new Date(filterData.inward_date);
  }
  if (filterData.ind_name) {
    query.where.meta_data.ind_name = {
      contains: filterData.ind_name,
      mode: 'insensitive',
    };
  }
  if (filterData.dept_name) {
    query.where.meta_data.dept_name = {
      contains: filterData.dept_name,
      mode: 'insensitive',
    };
  }
  if (filterData.party_name) {
    query.where.meta_data.party_name = {
      contains: filterData.party_name,
      mode: 'insensitive',
    };
  }
  if (filterData.claimant_name) {
    query.where.meta_data.claimant_name = {
      contains: filterData.claimant_name,
      mode: 'insensitive',
    };
  }
  if (filterData.subject) {
    query.where.meta_data.subject = {
      contains: filterData.subject,
      mode: 'insensitive',
    };
  }
  if (filterData.amount) {
    query.where.meta_data.amount = parseInt(filterData.amount);
  }
  if (filterData.status) {
    query.where.status = {
      contains: filterData.status,
      mode: 'insensitive',
    };
  }
  if (filterData.alloted_to_name) {
    query.where.employee = {
      name: {
        contains: filterData.alloted_to_name,
        mode: 'insensitive',
      },
    };
  }
  if (filterData.advanced_req) {
    query.where.meta_data.advanced_req = filterData.advanced_req === 'true';
  }

  // Execute the Prisma query to fetch filtered histories
  console.log(query);
  const filteredHistories = await prisma.history.findMany(query);
  console.log(filterHistories);
  return filteredHistories;
}

export async function POST(req: NextRequest) {
  const filterData: FilterData = await req.json();
  const searchParams = await req.nextUrl.searchParams;
  console.log(searchParams);
  console.log(filterData);
  const filteredHistories = await filterHistories(filterData, searchParams.get('mode') as String);
  return NextResponse.json(filteredHistories);
}