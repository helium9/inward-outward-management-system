"use client";
import Link from "next/link";

import React, { useState, useEffect } from "react";
import axios from "axios";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LastPage, FirstPage } from "@mui/icons-material";
import FilterDialog from "@/components/FilterDialog";

interface ClaimRowProps {
  type: string;
  indName: string;
  deptName: string;
  partyName: string;
  claimantName: string;
  inwardNumber: number;
  inwardDate: Date;
  amount: number;
  advancedReq: boolean;
  lastAction: string;
  lastActionRemarks: string;
  actionTakenBy: string;
  actionTimestamp: string;
}

const ClaimRow: React.FC<ClaimRowProps> = ({
  type,
  indName,
  deptName,
  partyName,
  issueDate,
  claimantName,
  inwardNumber,
  amount,
  advancedReq,
  inwardDate,
  id,
}) => {
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    payment: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    outward: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;
  const info = `${deptName}`;
  const invoice_details = `${inwardNumber}`;
  const paymentTo = partyName !== "none" ? partyName : claimantName;
  const advanced_Req = advancedReq ? "YES" : "NO";
  const Amount = `${amount}`;
  const IssueDate = new Date(inwardDate);
  const Issue_Date = IssueDate.toISOString().split("T")[0];

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="ml-6 my-2">
          <div className="flex flex-row items-center">
            {icon}
            <div className="flex flex-col ml-2 font-semibold">
              <Link href={`/claimInfo/${id}`}>
                <p>{indName}</p>
                <p className="text-zinc-500">{info}</p>
              </Link>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold ">{paymentTo}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{invoice_details}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{Issue_Date}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{advanced_Req}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">Rs.{Amount}</p>
      </TableCell>
    </TableRow>
  );
};

const filterLabels = {
  inward_number: "Invoice number",
  inward_date: "Inward Date",
  ind_name: "Indentor name",
  dept_name: "Department name",
  party_name: "Party name",
  claimant_name: "Claimant name",
  subject: "Subject",
  amount: "Amount",
  status: "Status",
  alloted_to_name: "Alloted to",
};

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date>(); //date from filter options
  const [filterData, setFilterData] = useState({
    //state of selected filters
    inward_number: "",
    inward_date: "",
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
      // const payload = {...filterData, activePage:activePage, inward_date:(date)?date:null};
      // const response = await axios.post('/api/historyFilter', payload, {params:{mode:'new'}}); // Send filter data to backend
      const response = await axios.get("/api/incomingClaims", {
        params: { mode: "new", activePage: activePage },
      }); //filter currently not implemented
      console.log(response.data);
      setData(response.data); // Update state with filtered data
    } catch (error) {
      console.error("Error filtering histories:", error);
    }
  };

  const handleFilterClear = () => {
    setFilterData({
      //state of selected filters
      inward_number: "",
      inward_date: "",
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
  };

  const [data, setData] = useState<ClaimRowProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    handleFilterApply();
  }, []);

  useEffect(() => {
    handleFilterApply();
  }, [activePage]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('/api/incomingClaims', { params: { activePage: activePage }});
  //     setData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching histories:', error);
  //   }
  // };

  const filteredData = data.filter((ele) => {
    const searchTermLower = searchTerm.toLowerCase();
    const inwardNumber = ele.inward_number.toString().toLowerCase();
    const indName = ele.ind_name.toLowerCase();
    const deptName = ele.dept_name.toLowerCase();
    const partyName = ele.party_name.toLowerCase();
    const claimantName = ele.claimant_name.toLowerCase();
    // const issueData = new Date(ele.issue_date);
    // const advReq = ele.advanced_req.toLowerCase();
    // const amount = ele.amount.toLowerCase();

    return (
      inwardNumber.includes(searchTermLower) ||
      indName.includes(searchTermLower) ||
      deptName.includes(searchTermLower) ||
      partyName.includes(searchTermLower) ||
      claimantName.includes(searchTermLower)
      // issueData.includes(searchTermLower) ||
      // advReq.includes(searchTermLower) ||
      // amount.includes(searchTermLower)
    );
  });

  return (
    <div>
      <Navbar />
      <main className="p-2 px-4 sm:px-10 xl:px-24">
        <div className="my-4 flex flex-row items-center">
          <p className="text-3xl font-bold">Incoming Claims</p>
          <div className="flex flex-row w-full ml-auto gap-3 max-w-unit-8xl">
            {/* <FilterDialog
            date={date}
            setDate={setDate}
            filterData={filterData}
            setFilterData={setFilterData}
            handleFilterApply={handleFilterApply}
            handleFilterClear={handleFilterClear}
            labels={filterLabels}
          /> */}
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
              <TableRow className="text-zinc-500 font-semibold text-center">
                <TableHead className="w-56">
                  <p className="ml-6">Indentor Details</p>
                </TableHead>
                <TableHead className="ml-6">Recipient</TableHead>
                <TableHead className="ml-6">Invoice Number</TableHead>
                <TableHead className="ml-6">Issue Date</TableHead>
                <TableHead className="ml-6">Advanced Request</TableHead>
                <TableHead className="ml-6">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((ele, index) => (
                <ClaimRow
                  key={index}
                  type={ele.action}
                  indName={ele.ind_name}
                  deptName={ele.dept_name}
                  partyName={ele.party_name}
                  claimantName={ele.claimant_name}
                  inwardNumber={ele.inward_number}
                  inwardDate={ele.inward_date}
                  advancedReq={ele.advanced_req}
                  amount={ele.amount}
                  id={ele.id}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        <section className="my-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    if (activePage > 1) {
                      setActivePage(activePage - 1);
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" onClick={() => setActivePage(1)}>
                  <FirstPage />
                </PaginationLink>
              </PaginationItem>
              {activePage >= 1 && (
                <PaginationItem>
                  <PaginationLink isActive href="#">
                    {activePage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {activePage + 1 >= 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => setActivePage(activePage + 1)}
                  >
                    {activePage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {activePage + 2 >= 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => setActivePage(activePage + 2)}
                  >
                    {activePage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setActivePage(activePage)}
                >
                  <LastPage />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => setActivePage(activePage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </div>
  );
};

export default Page;
