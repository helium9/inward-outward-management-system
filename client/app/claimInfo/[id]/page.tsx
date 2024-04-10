"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterDialog from "@/components/FilterDialog";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { AssignmentOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Phone,
  MailOutline,
  Search,
  FilterAltOutlined,
  ExpandCircleDownOutlined,
  FileOpenOutlined,
  PostAddOutlined,
  TaskOutlined,
  ContentPasteGoOutlined,
  ArrowOutward,
} from "@mui/icons-material";
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
  alloted_to_name: "Alloted to",
};

const ClaimRow = ({
  action,
  takenBy,
  remarks,
  dateTime,
  expanded,
  onClick,
}: {
  action: string;
  takenBy: string;
  remarks: string;
  dateTime: string;
  expanded: boolean;
}) => {
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[action] || null;
  //adding margin or padding in any table component doesn't work.
  return (
    <TableRow onClick={onClick}>
      <TableCell className="font-medium">
        <div className="ml-6 my-2">
          <div className="flex flex-row items-center">
            {icon}
            <div className="flex flex-col ml-2 font-semibold">{action}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{takenBy}</p>
      </TableCell>
      <TableCell>
        <p
          className={`my-2 font-semibold ${
            !expanded && `overflow-hidden h-10 text-ellipsis`
          }`}
        >
          {remarks}
        </p>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <p>{dateTime}</p>
          {expanded && <u>Revert Changes?</u>}
        </div>
      </TableCell>
    </TableRow>
  );
};

function Page({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [claimData, setClaimData] = useState({
    advanced_req: null,
    amount: 0,
    claimant_name: "not available",
    dept_name: "not available",
    id: "not available",
    ind_name: "not available",
    inward_date: null,
    inward_number: 0,
    issue_date: "not available",
    managed_by_id: { name: "not available" },
    party_name: "none",
    status: "not available",
    subject: "not available",
  });
  console.log(claimData);
  useEffect(() => {
    console.log(params.id);
    console.log(session);

    async function getData(sessionData: any, id: string) {
      const claimInfo = await axios.get("http://localhost:3000/api/claims", {
        params: {
          ...sessionData,
          id: id,
        },
      });
      setClaimData(claimInfo.data);
    }
    if (session && status === "authenticated")
      getData(session?.user, params.id);
  }, [session]);
  const [date, setDate] = useState<Date>(); //date from filter options
  const [filterData, setFilterData] = useState({
    //state of selected filters
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

  const handleFilterApply = () => {
    console.log(filterData, date);
    //write backend post request for fetching database here.
  };
  const handleFilterClear = () => {
    setFilterData({
      //state of selected filters
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
  };
  const [expanded, setExpanded] = useState(false); //this is a single variable that'll be matched to the key in array map to decide which row is expanded.
  const handleExpandHistory = () => {
    setExpanded((expanded) => !expanded);
  };
  return (
    <main className="p-2 px-4 sm:px-10 xl:px-24">
      <div className="text-2xl font-extrabold my-4">Claim information</div>
      <section className="flex flex-col lg:flex-row gap-4">
        <div className="rounded-md border border-zinc-300 w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-zinc-50">
                  <div className="flex flex-row items-center p-4 text-black">
                    <div className="mr-3 pt-0.5">
                      <AssignmentOutlined sx={{ fontSize: 40 }} />
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <div className="flex flex-col w-full max-w-52">
                        <span className="flex flex-row justify-between font-bold text-lg">
                          <p>Invoice number</p>
                          <p>#{claimData.inward_number}</p>
                        </span>
                        <span className="flex flex-row justify-between">
                          <p>Issue date</p>
                          <p> &nbsp; {claimData.issue_date.substring(0, 10)}</p>
                        </span>
                      </div>
                      <p>Status: {claimData.status}</p>
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="px-[75px] py-3">
                  <p className="text-lg font-semibold">Indentor details</p>
                  <div className="flex flex-row">
                    <div className="flex flex-col mr-12">
                      <p>Name</p>
                      <p>Department Name</p>
                    </div>
                    <div className="flex flex-col text-zinc-500">
                      <p>{claimData.ind_name}</p>
                      <p>{claimData.dept_name}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-[75px] py-3">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Subject</p>
                    <p className="text-zinc-500">{claimData.subject}</p>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-[75px] py-3">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">Payment Information</p>
                    <div className="grid grid-cols-2">
                      <p>Claimant Name</p>
                      <p className="text-zinc-500">{claimData.claimant_name}</p>
                      <p>Party Name</p>
                      <p className="text-zinc-500">{claimData.party_name}</p>
                      <p>Amount</p>
                      <p className="text-zinc-500">₹{claimData.amount}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-[75px] py-3">
                  <div className="grid grid-cols-2">
                    <p className="text-base font-semibold">Alotted to</p>
                    <p className="text-zinc-500">
                      {claimData.managed_by_id?.name}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="py-4 flex flex-row justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-32 flex flex-row gap-1 font-semibold bg-gradient-to-b from-zinc-100 to-zinc-300"
            >
              Actions <ArrowOutward sx={{ fontSize: 20 }} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Take Action</DialogTitle>
              <DialogDescription>
                Taking an action will change the current status of this claim.
              </DialogDescription>
            </DialogHeader>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose Action..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="forward">Forward</SelectItem>
                  <SelectItem value="inward">Inward</SelectItem>
                  {/* inward must be visible for !new claims */}
                  <SelectItem value="outward">Outward</SelectItem>
                  <SelectItem value="stage">Stage</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              placeholder="Type your remarks here."
              id="remarks"
              className="h-36"
            />
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <section>
        <div className="my-4 flex flex-row items-center">
          <p className="text-2xl font-bold">Action History</p>
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
            />
          </div>
        </div>
        <div className="rounded-md border border-zinc-300">
          <Table>
            <TableHeader>
              <TableRow className="text-zinc-500 font-semibold">
                <TableHead className="w-28">
                  <p className="ml-6">Action</p>
                </TableHead>
                <TableHead className="w-36">Taken by</TableHead>
                <TableHead className="w-80">Remarks</TableHead>
                <TableHead className="w-36">
                  <p className="mr-6">Time</p>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <ClaimRow
                action="forward"
                takenBy="Aditya Kshitiz"
                remarks="Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here! Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here!"
                dateTime="10-03-24 15:03"
                expanded={expanded}
                onClick={handleExpandHistory}
              />
              <ClaimRow
                action="forward"
                takenBy="Aditya Kshitiz"
                remarks="Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here! Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here!"
                dateTime="10-03-24 15:03"
                expanded={false}
              />
              <ClaimRow
                action="forward"
                takenBy="Aditya Kshitiz"
                remarks="Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here! Received a reimbursement request for a life-size cardboard cutout of the  boss. Approved, but let's hope it doesn't start making executive  decisions around here!"
                dateTime="10-03-24 15:03"
                expanded={false}
              />
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
}

export default Page;
