"use client";
import { Checkbox } from "@/components/ui/checkbox";
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
import FilterDialog from "@/components/FilterDialog";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import { AssignmentOutlined, LastPage, FirstPage } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import EditIcon from "@mui/icons-material/Edit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  meta_id,
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
    payment: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    outward: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[action] || null;
  const { toast } = useToast();
  const handleRevert = (dateTime: string, meta_id: string) => {
    // console.log("revert?", dateTime, meta_id);
    axios
      .post("http://localhost:3000/api/claimHistory", {
        mode: "delete",
        meta_id: meta_id,
        time_stamp: dateTime,
      })
      .then((res) => {
        if (res.status === 200) {
          return toast({
            title: "Successfully deleted.",
          });
        }
      })
      .catch((res) => {
        // console.log(res);
        return toast({
          variant: "destructive",
          title: "Something went wrong.",
        });
      });
  };

  const [activePage, setActivePage] = useState(1);
  // console.log(activePage);
  const formatTimestamp = (dateTime: string): string => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedDate} at ${formattedTime}`;
  };
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
        <div className="flex flex-row items-center">
          <p
            className={`my-2 font-semibold ${
              !expanded && `overflow-hidden h-5 text-ellipsis`
            }`}
          >
            {remarks}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <p>{formatTimestamp(dateTime)}</p>
          {expanded && action !== "inward" && (
            <div className="mr-auto">
              <AlertDialog>
                <AlertDialogTrigger>
                  <u>Revert Changes?</u>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This is delete all the
                      actions history including and after this action.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleRevert(dateTime, meta_id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
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
    origin: "not available",
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
  const [completeClaimInfo, setCompleteClaimData] = useState({
    advanced_req: null,
    amount: 0,
    claimant_name: "not available",
    dept_name: "not available",
    origin: "not available",
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

  const [changedData, setChangedData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChangedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [historyData, setHistoryData] = useState([]);
  const [userType, setUserType] = useState();
  // console.log(claimData);

  async function getData(sessionData: any, id: string) {
    const res = await axios.get("http://localhost:3000/api/getUser", {
      params: {
        ...sessionData,
        mode: "curr",
      },
    });
    setUserType(res.data.type);
    if (res.data.type !== "Claimant") {
      const claimInfo = await axios.get("http://localhost:3000/api/claims", {
        params: {
          ...sessionData,
          id: id,
        },
      });
      setClaimData(claimInfo.data);
      //
      // const historyInfo = await axios.get(
      //   "http://localhost:3000/api/claimHistory",
      //   { params: { meta_id: id } }
      // );
      // setHistoryData(historyInfo.data);
      //
      const completeClaimInfo = await axios.get(
        "http://localhost:3000/api/editClaim",
        {
          params: {
            ...sessionData,
            id: id,
          },
        }
      );
      // console.log(claimInfo.data)
      setCompleteClaimData(completeClaimInfo.data);
      const empList = await axios.get("http://localhost:3000/api/employees");
      setEmployees(empList.data);
    }
  }
  useEffect(() => {
    // console.log(params.id);
    // console.log(session);
    if (session && status === "authenticated")
      getData(session?.user, params.id);
  }, [session]);

  const handleSubmitEdit = (e) => {
    console.log("called");
    try {
      const updatedClaimData = {
        ...completeClaimInfo,
        ...changedData,
      };

      console.log("Updated: ", updatedClaimData);
      axios.put("http://localhost:3000/api/editClaim", updatedClaimData);

      // Update the claimData state with the edited data
      setCompleteClaimData(updatedClaimData);

      // Reset the changedData state or close the edit form
      setChangedData({});
    } catch (error) {
      console.error("Error updating claim:", error);
    }
  };

  const getPagination = async () => {
    const historyInfo = await axios.get(
      "http://localhost:3000/api/claimHistory",
      { params: { meta_id: params.id, activePage: activePage } }
    );
    setHistoryData(historyInfo.data);
  };

  const [date, setDate] = useState<Date>(); //date from filter options
  const [employees, setEmployees] = useState([]);
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
    // console.log(filterData, date);
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
  const [activePage, setActivePage] = useState(1);
  // console.log(activePage);
  const [expanded, setExpanded] = useState(-1); //this is a single variable that'll be matched to the key in array map to decide which row is expanded.
  const handleExpandHistory = (key) => {
    setExpanded(key);
  };
  const [actionTaken, setActionTaken] = useState({
    employee_id: "",
    remarks: "",
    action: "",
  });
  const [emailDetails, setEmailDetails] = useState({
    sending_mail: "",
    subject: "",
    body: "",
  });
  const handleActionSubmit = () => {
    // console.log(actionTaken);
    axios
      .post("http://localhost:3000/api/claimHistory", {
        mode: "add",
        meta_id: params.id,
        ...actionTaken,
      })
      .then((res) => getPagination());
  };

  useEffect(() => {
    getPagination();
  }, [activePage]);
  const { toast } = useToast();
  const handleSendMail = (event) => {
    event.currentTarget.disabled = true;
    console.log(emailDetails);
    axios
      .post("http://localhost:3000/api/sendEmail", emailDetails)
      .then((res) => {
        console.log(res);
        event.target.disabled = false;
        if (res.status === 200) {
          return toast({
            title: "Email sent successfully.",
            description: res.headers.date as String,
          });
        }
      })
      .catch((res) => {
        console.log(res);
        return toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem sending the email.",
        });
      });
  };
  if (userType === "Claimant") {
    return <div>Forbidden 404</div>;
  } else {
    return (
      <div>
        <Navbar />
        <main className="p-2 px-4 sm:px-10 xl:px-24">
          <div className="flex items-center p-3">
            <Sheet>
              <SheetTrigger>
                <EditIcon />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Claim Information</SheetTitle>
                  <SheetDescription>Intendor Information</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder={claimData.ind_name}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="ind_name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-left">
                      Department
                    </Label>
                    <Input
                      id="username"
                      placeholder={claimData.dept_name}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="dept_name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-left">
                      Invoice Number
                    </Label>
                    <Input
                      id="number"
                      type="integer"
                      placeholder={claimData.inward_number}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="inward_number"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-left">
                      Issue Date
                    </Label>
                    <Input
                      placeholder={claimData.issue_date.substring(0, 10)}
                      className="col-span-3 bg-zinc-50"
                      disabled
                    />
                  </div>
                  <SheetDescription>
                    Claim Details (Payment to be made to)
                  </SheetDescription>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left">
                      Claimant Name
                    </Label>
                    <Input
                      id="name"
                      placeholder={claimData.claimant_name}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="claimant_name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left">
                      Party Name
                    </Label>
                    <Input
                      id="name"
                      placeholder={claimData.party_name}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="party_name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left">
                      Subject
                    </Label>
                    <Textarea
                      placeholder={claimData.subject}
                      id="message-2"
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="subject"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-left">
                      Amount
                    </Label>
                    <Input
                      type="integer"
                      id="name"
                      placeholder={`₹${claimData.amount}`}
                      className="col-span-3 bg-zinc-50"
                      onChange={handleInputChange}
                      name="amount"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" onClick={handleSubmitEdit}>
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <div className="text-2xl font-extrabold ml-2">
              Claim information
            </div>
          </div>
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
                              <p>
                                {" "}
                                &nbsp; {claimData.issue_date.substring(0, 10)}
                              </p>
                            </span>
                          </div>
                          <div className="flex flex-col text-right">
                            <p>Status: {claimData.status}</p>
                          </div>
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
                          <p>Email</p>
                        </div>
                        <div className="flex flex-col text-zinc-500">
                          <p>{claimData.ind_name}</p>
                          <p>{claimData.dept_name}</p>
                          <p>{claimData.origin}</p>
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
                        <p className="text-lg font-semibold">
                          Payment Information
                        </p>
                        <div className="grid grid-cols-2">
                          <p>Claimant Name</p>
                          <p className="text-zinc-500">
                            {claimData.claimant_name}
                          </p>
                          <p>Party Name</p>
                          <p className="text-zinc-500">
                            {claimData.party_name}
                          </p>
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
          {/* {showEditForm && <EditForm/>} */}
          <section className="py-4 flex flex-row justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-32 flex flex-row font-semibold bg-gradient-to-b from-zinc-100 to-zinc-300"
                >
                  Actions <ArrowOutward sx={{ fontSize: 20 }} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md overflow-y-scroll max-h-screen">
                <DialogHeader>
                  <DialogTitle>Take Action</DialogTitle>
                  <DialogDescription>
                    Taking an action will change the current status of this
                    claim.
                  </DialogDescription>
                </DialogHeader>
                <Select
                  onValueChange={(e) =>
                    setActionTaken({ ...actionTaken, action: e })
                  }
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Choose Action..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="inward">Inward</SelectItem>
                      <SelectItem value="forward">Forward</SelectItem>
                      <SelectItem value="outward">Outward</SelectItem>
                      {/* inward must be visible for !new claims */}
                      <SelectItem value="payment">Payment</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label className="mt-2" htmlFor="remarks">
                  Remarks
                </Label>
                <Textarea
                  placeholder="Type your remarks here."
                  onChange={(e) =>
                    setActionTaken({ ...actionTaken, remarks: e.target.value })
                  }
                  id="remarks"
                  className="h-26"
                />
                {actionTaken.action !== "payment" && (
                  <div>
                    <Label className="mt-2" htmlFor="allot">
                      Allot to
                    </Label>
                    <Select
                      onValueChange={(e) =>
                        setActionTaken({ ...actionTaken, employee_id: e })
                      }
                    >
                      <SelectTrigger className="w-3/4">
                        <SelectValue placeholder="Choose employee..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {employees.length !== 0 &&
                            employees.map((item, ind) => (
                              <SelectItem key={ind} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {actionTaken.action === "payment" && (
                  <div id="email-section" className="flex flex-col gap-3">
                    <p className="font-medium">Send closing email</p>
                    <Input
                      value={emailDetails.sending_mail}
                      onValueChange={(newValue) =>
                        setEmailDetails({
                          ...emailDetails,
                          sending_mail: newValue,
                        })
                      }
                      placeholder="Receiver address"
                      label="To"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        mainWrapper: "",
                        inputWrapper: "rounded-md border-1 shadow-sm",
                        label: "font-medium",
                      }}
                      isClearable
                    />
                    <Input
                      value={emailDetails.subject}
                      onValueChange={(newValue) =>
                        setEmailDetails({ ...emailDetails, subject: newValue })
                      }
                      placeholder="Enter the subject"
                      label="Subject"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        mainWrapper: "",
                        inputWrapper: "rounded-md border-1 shadow-sm",
                        label: "font-medium",
                      }}
                      isClearable
                    />
                    <Label className="mt-2" htmlFor="email">
                      Email Body
                    </Label>
                    <Textarea
                      placeholder="Type your confirmation mail here."
                      onChange={(e) =>
                        setEmailDetails({
                          ...emailDetails,
                          body: e.target.value,
                        })
                      }
                      id="email"
                      className="h-36"
                    />
                  </div>
                )}
                <DialogFooter className="sm:justify-end">
                  {actionTaken.action === "payment" && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={(e) => handleSendMail(e)}
                    >
                      Send Mail
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleActionSubmit}
                    >
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
                  {historyData.length !== 0 &&
                    historyData.map((item, ind) => (
                      <ClaimRow
                        key={ind}
                        action={item?.action}
                        takenBy={item?.employee?.name} // Use optional chaining here
                        remarks={item.remarks}
                        dateTime={item.time_stamp}
                        expanded={ind === expanded}
                        meta_id={item?.meta_id}
                        onClick={() => {
                          handleExpandHistory(ind);
                        }}
                      />
                    ))}
                </TableBody>
              </Table>
            </div>
          </section>
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
        <Footer />
      </div>
    );
  }
}
export default Page;
