"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
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
      <section>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Actions</Button>
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
            <Textarea placeholder="Type your remarks here." id="remarks" />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
      <section>
        hi
      </section>
    </main>
  );
}

export default Page;
