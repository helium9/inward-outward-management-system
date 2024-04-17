'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import {
  Phone,
  MailOutline,
  Search,
  FilterAltOutlined,
  ExpandCircleDownOutlined,
  AssignmentOutlined,
  FileOpenOutlined,
  PostAddOutlined,
  TaskOutlined,
  ContentPasteGoOutlined,
} from "@mui/icons-material";

import FilterDialog from "@/components/FilterDialog";

interface ClaimRowProps {
  type: string;
  indName: string;
  deptName: string;
  partyName: string;
  claimantName: string;
  inwardNumber: number;
  inwardDate: Date;
  issueDate: string;
  amount: number;
  advancedReq: boolean;
  lastAction: string;
  lastActionRemarks: string;
  actionTakenBy: string;
  actionTimestamp: string;
  meta_id: string;
}

const ClaimRow: React.FC<ClaimRowProps> = ({
  type,
  indName,
  deptName,
  partyName,
  claimantName,
  inwardNumber,
  inwardDate,
  issueDate,
  amount,
  advancedReq,
  lastActionRemarks,
  actionTakenBy,
  actionTimestamp,
  meta_id,
}) => {
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;
  const info = `${deptName}`;
  const invoice_details = `${inwardNumber}`;
  const inwardDateObject = new Date(inwardDate);
  const formattedInwardDate = inwardDateObject.toISOString().split('T')[0];
  const paymentTo = partyName !== 'none' ? partyName : claimantName;

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="ml-6 my-2">
          <div className="flex flex-row items-center">
            {icon}
            <Link href={`/tracking/${meta_id}`}>
              <div className="flex flex-col ml-2 font-semibold">
                <p>{indName}</p>
                <p className="text-zinc-500">{info}</p>
              </div>
            </Link>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{paymentTo}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{invoice_details}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{formattedInwardDate}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{lastActionRemarks}</p>
      </TableCell>
      <TableCell>
        <div className="mr-6 w-full my-2 font-semibold">
          {actionTakenBy}
          <br></br>
          <div className="flex flex-row">
            <p className="text-zinc-500">at</p>&nbsp;
            {new Date(actionTimestamp).toLocaleString()}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const filterLabels = {
  inward_number: "Invoice number",
  issue_date: "Issue Date",
  ind_name: "Indentor name",
  dept_name: "Department name",
  party_name: "Party name",
  claimant_name: "Claimant name",
  subject: "Subject",
  amount: "Amount",
  status: "Status",
  alloted_to_name: "Alloted to"
}

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date>(); // date from filter options
  const [filterData, setFilterData] = useState({
    // state of selected filters
    inward_number: "",
    issue_date: "",
    ind_name: "",
    dept_name: "",
    party_name: "",
    claimant_name: "",
    subject: "",
    amount: "",
    status: "",
    alloted_to_name: "",
  });

  const handleFilterApply = async () => {
    try {
      const response = await axios.post('/api/historyFilter', filterData); // Send filter data to backend
      setHistories(response.data); // Update state with filtered data
    } catch (error) {
      console.error('Error filtering histories:', error);
    }
  };

  const handleFilterClear = () => {
    setFilterData({
      // state of selected filters
      inward_number: "",
      issue_date: "",
      ind_name: "",
      dept_name: "",
      party_name: "",
      claimant_name: "",
      subject: "",
      amount: "",
      status: "",
      alloted_to_name: "",
    });
    setDate(undefined);
    fetchHistories(); // Reset the histories to the initial state
  };

  const [histories, setHistories] = useState<ClaimRowProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    try {
      const response = await axios.get('/api/history');
      setHistories(response.data);
    } catch (error) {
      console.error('Error fetching histories:', error);
    }
  };

  const filteredHistories = histories.filter((history) => {
    const searchTermLower = searchTerm.toLowerCase();
    const inwardNumber = history.meta_data.inward_number.toString().toLowerCase();
    const inwardDate = new Date(history.meta_data.inward_date).toISOString().split('T')[0].toLowerCase();
    const indName = history.meta_data.ind_name.toLowerCase();
    const employeeName = history.employee.name.toLowerCase();
    const deptName = history.meta_data.dept_name.toLowerCase();
    const partyName = history.meta_data.party_name.toLowerCase();
    const claimantName = history.meta_data.claimant_name.toLowerCase();
    const lastActionRemarks = history.remarks.toLowerCase();
    const actionTakenBy = history.employee.name.toLowerCase();
  
    return (
      inwardNumber.includes(searchTermLower) ||
      inwardDate.includes(searchTermLower) ||
      indName.includes(searchTermLower) ||
      employeeName.includes(searchTermLower) ||
      deptName.includes(searchTermLower) ||
      partyName.includes(searchTermLower) ||
      claimantName.includes(searchTermLower) ||
      lastActionRemarks.includes(searchTermLower) ||
      actionTakenBy.includes(searchTermLower)
    );
  });
  
  return (
    <div>
      <Navbar/>
    <main className="p-2 px-4 sm:px-10 xl:px-24">
      <div className="my-4 flex flex-row items-center">
        <p className="text-3xl font-bold">History</p>
        <div className="flex flex-row w-full ml-auto gap-3 max-w-unit-8xl">
          <div className="flex items-center min-w-40 space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show current user
            </label>
          </div>
       
          <FilterDialog
            date={date}
            setDate={setDate}
            filterData={filterData}
            setFilterData={setFilterData}
            handleFilterApply={handleFilterApply}
            handleFilterClear={handleFilterClear}
            labels={filterLabels}
          />
          <Input
            size="sm"
            variant="bordered"
            classNames={{
              base: `m-0`,
              inputWrapper: "rounded border-zinc-200 border",
            }}
            placeholder={`Search`}
            startContent={<Search sx={{ color: "#999999" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border border-zinc-300">
        <Table>
          <TableHeader>
            <TableRow className="text-zinc-500 font-semibold">
              <TableHead className="w-56">
                <p className="ml-6">Indentor Details</p>
              </TableHead>
              <TableHead className="w-50">Recipient</TableHead>
              <TableHead className="w-40">Invoice Number</TableHead>
              <TableHead className="w-40">Inward Date</TableHead>
              <TableHead>Last Action Remarks</TableHead>
              <TableHead className="w-80">
                <p className="mr-6">Action taken by</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filteredHistories.map((history, index) => (
                <ClaimRow
                  key={index}
                  type={history.action}
                  indName={history.meta_data.ind_name}
                  deptName={history.meta_data.dept_name}
                  partyName={history.meta_data.party_name}
                  claimantName={history.meta_data.claimant_name}
                  inwardNumber={history.meta_data.inward_number}
                  inwardDate={history.meta_data.inward_date}
                  issueDate={history.meta_data.issue_date}
                  lastAction={history.action}
                  lastActionRemarks={history.remarks}
                  actionTakenBy={history.employee.name}
                  actionTimestamp={history.time_stamp}
                  meta_id = {history.meta_id}
                />
              ))}
        </TableBody>
        </Table>
      </div>
    </main>
    </div>
  );
};

export default Page; 