import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../db/db";

interface FilterData {
  inward_number?: string;
  issue_date?: string;
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
}

async function filterHistories(filterData: FilterData) {

  const query = {
    where: {
      meta_data: {},
    },
    include: {
      meta_data: true,
      employee: true,
    },
    orderBy : {
        time_stamp : 'desc',
    },
  };

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
  
  const filteredHistories = await prisma.history.findMany({
    ...query,
    distinct : ['meta_id'],
  });
  return filteredHistories;
}

export async function POST(req: NextRequest) {
  const filterData: FilterData = await req.json();
  const filteredHistories = await filterHistories(filterData);
  return NextResponse.json(filteredHistories);
}