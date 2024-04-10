"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
const ClaimRow = ({
  type,
  name,
  info,
  details,
  actionHistory,
}: {
  type: string;
  name: string;
  info: string;
  details: string;
  actionHistory: { user: string; timeStamp: string; lastActionRemarks: string };
}) => {
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;
  //adding margin or padding in any table component doesn't work.
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="ml-6 my-2">
          <div className="flex flex-row items-center">
            {icon}
            <div className="flex flex-col ml-2 font-semibold">
              <p>{name}</p>
              <p className="text-zinc-500">{info}</p>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{details}</p>
      </TableCell>
      <TableCell>
        <p className="my-2 font-semibold">{actionHistory.lastActionRemarks}</p>
      </TableCell>
      <TableCell>
        <div className="mr-6 w-full my-2 font-semibold">
          {actionHistory.user}
          <br></br>
          <div className="flex flex-row">
            <p className="text-zinc-500">at</p>&nbsp;
            {actionHistory.timeStamp}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

function Page() {
  const [date, setDate] = React.useState<Date>(); //date from filter options
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
  return (
    <main className="p-2 px-4 sm:px-10 xl:px-24">
      <div className="my-4 flex flex-row items-center">
        <p className="text-3xl font-bold">Current claims</p>
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
              <TableHead className="w-56">
                <p className="ml-6">Claim name</p>
              </TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="w-80">Last Action</TableHead>
              <TableHead className="w-80">
                <p className="mr-6">Action taken by</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
            <ClaimRow
              type="forward"
              name="Claim name"
              info="Info"
              details="Details giving brief description of what the claim is about and other information that can help immediately identify this claim."
              actionHistory={{
                lastActionRemarks:
                  "Information/Remarks about the last action on this claim by a F/A employee.",
                user: "User name",
                timeStamp: "10-03-24 15:03",
              }}
            />
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default Page;
