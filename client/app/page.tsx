//currently multi user support is absent as well as admin cannot be detected.
"use client";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import FilterDialog from "@/components/FilterDialog";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ListClaimWrapper from "@/components/dashboard/ListClaimWrapper";
import ClaimWrapper from "@/components/dashboard/ClaimWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  MailOutline,
  Search,
  Person,
  FilterAltOutlined,
  ExpandCircleDownOutlined,
  FileOpenOutlined,
  PostAddOutlined,
  TaskOutlined,
  ContentPasteGoOutlined,
  ArrowOutward,
  AddCircleOutlineOutlined,
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

export default function Home() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<{
    name: string | null | undefined;
    email: string | null | undefined;
    type: string | null | undefined;
  }>({ name: "Unknown", email: "Unknown", type: "Unknown" });
  const [newClaims, setNewClaims] = useState([]);
  const [history, setHistory] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [users, setUsers] = useState([]);
  // console.log(claimData);
  // console.log(history[0]);
  useEffect(() => {
    async function getUser(data: any) {
      //define type later on
      const res = await axios.get("http://localhost:3000/api/getUser", {
        params: {
          ...data,
          mode: "curr",
        },
      });
      // console.log(res.data);
      return res.data;
    }

    async function getDB(sessionData: any) {
      const newClaimData = await axios.get("http://localhost:3000/api/claims", {
        params: {
          ...sessionData,
          condensed: true,
          status: "new",
        },
      });
      setNewClaims(newClaimData.data);

      const currHistory = await axios.get("http://localhost:3000/api/history", {
        params: {
          ...sessionData,
          condensed: true,
        },
      });
      setHistory(currHistory.data);

      const currClaims = await axios.get("http://localhost:3000/api/claims", {
        params: {
          ...sessionData,
          condensed: true,
          status: "current",
        },
      });
      setClaimData(currClaims.data);

      const res = await axios.get("http://localhost:3000/api/getUser", {
        params: {
          ...sessionData,
          mode: "all",
        },
      });
      setUsers(res.data);
    }
    if (session && status === "authenticated") {
      getUser(session?.user).then((res) => {
        console.log(res);
        if (res.length===0) {
          console.log(session);
          setUserInfo({
            name: session.user?.name,
            email: session.user?.email,
            type: "Claimant",
          });
        } else setUserInfo(res);
        getDB(session?.user);
      });
    }
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
  const [newEmployeeDetails, setNewEmployeeDetails] = useState({
    name: "",
    email: "",
  });
  const handleNewEmployeeAdd = (add: Number) => {
    console.log(newEmployeeDetails);
    axios
      .post("http://localhost:3000/api/newEmployee", {
        mode: add ? "add" : "del",
        ...newEmployeeDetails,
      })
      .then((res) => console.log(res));
  };
  // console.log(users);
  return (
    <div>
      <Navbar />
      <main className="p-2 px-4 sm:px-10 xl:px-24">
        <div className="text-3xl font-extrabold my-4">Dashboard</div>
        <section className="flex flex-col lg:flex-row gap-4">
          <ListClaimWrapper
            title="Claim List"
            condensed={false}
            linkAddress="/claimList"
          >
            {claimData.map((data, ind) => (
              <ClaimWrapper
                key={ind}
                type={data.status}
                name={data.claimant_name}
                info={data.dept_name}
                meta_id={data.id}
                action={{
                  e_name: data.history[0].employee.name,
                  time_stamp: data.history[0].time_stamp,
                  remarks: data.history[0].remarks,
                }}
              />
            ))}
          </ListClaimWrapper>

          <Card className="w-full sm:max-w-96 rounded-md sm:max-h-52">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Welcome, {userInfo.name ? userInfo.name : "unknown"}
              </CardTitle>
              <CardDescription className="font-semibold text-zinc-500">
                {userInfo.type ? userInfo.type : "unknown"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-8">
              {/* <div className="flex flex-row items-center">
                <span className="rounded-full bg-zinc-300 p-2 mr-2">
                  <Phone />
                </span>
                999999999
              </div> */}
              <div className="flex flex-row items-center">
                <span className="rounded-full bg-zinc-300 p-2 mr-2">
                  <MailOutline />
                </span>
                {userInfo.email ? userInfo.email : "unknown"}
              </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-4 text-zinc-500 text-xs">
              <p>Change Password?</p>
              <p>Profile Settings</p>
            </CardFooter>
          </Card>
        </section>

        <section className="flex flex-col lg:flex-row gap-4 mt-12">
          <ListClaimWrapper
            title="History"
            linkAddress="/history"
            condensed={false}
          >
            {history &&
              history.map((item, ind) => (
                <ClaimWrapper
                  key={ind}
                  type={item.action}
                  meta_id={item.meta_id}
                  name={item.meta_data.claimant_name}
                  info={item.meta_data.dept_name}
                  action={{
                    e_name: item.employee.name,
                    time_stamp: item.time_stamp,
                    remarks: item.remarks ? item.remarks : "No remark.",
                  }}
                />
              ))}
          </ListClaimWrapper>

          <div>
              <ListClaimWrapper
                title={(userInfo.type !== "Claimant")?"Incoming Claims":"Pending Claims"}
                linkAddress="/incomingClaims"
                condensed={true}
              >
                {newClaims &&
                  newClaims.map((claim, ind) => (
                    <ClaimWrapper
                      key={ind}
                      type={"new"}
                      name={claim.claimant_name as string}
                      info={claim.dept_name as string}
                      action={null}
                      meta_id={claim.meta_id}
                    />
                  ))}
              </ListClaimWrapper>
            </div>
        </section>
        {userInfo.type === "Admin" && (
          <section className="mt-14">
            <div className="my-4 flex flex-row items-center">
              <p className="text-2xl font-bold">Registered Employees</p>
              <div className="flex flex-row w-full ml-auto gap-3 max-w-unit-8xl">
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border bg-zinc-100 h-8 text-zinc-600 border-zinc-300 hover:bg-zinc-200"
                      variant={"secondary"}
                    >
                      Add &nbsp;
                      <AddCircleOutlineOutlined sx={{ fontSize: 16 }} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add employee?</DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col gap-3">
                          <p>
                            Note this action will provide employee level access
                            to the site including sensitive information.
                          </p>
                          <Input
                            value={newEmployeeDetails.name}
                            onValueChange={(val) =>
                              setNewEmployeeDetails({
                                ...newEmployeeDetails,
                                name: val,
                              })
                            }
                            placeholder="*"
                            label="Employee name"
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
                            value={newEmployeeDetails.email}
                            onValueChange={(val) =>
                              setNewEmployeeDetails({
                                ...newEmployeeDetails,
                                email: val,
                              })
                            }
                            placeholder="*@gmail.com"
                            label="Employee institute email"
                            labelPlacement="outside"
                            variant="bordered"
                            classNames={{
                              mainWrapper: "",
                              inputWrapper: "rounded-md border-1 shadow-sm",
                              label: "font-medium",
                            }}
                            isClearable
                          />
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => handleNewEmployeeAdd(1)}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                    <TableHead className="w-1/2 lg:w-1/3">
                      <p className="ml-6">Name</p>
                    </TableHead>
                    <TableHead className="w-36 lg:w-64">Email</TableHead>
                    {/* <TableHead></TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users &&
                    Array.isArray(users) &&
                    users.map((item, ind) => {
                      return (
                        <TableRow key={ind}>
                          <TableCell className="font-medium">
                            <div className="ml-6 my-2">
                              <div className="flex flex-row items-center">
                                <Person sx={{ fontSize: 40 }} />
                                <div className="flex flex-col ml-2 font-semibold">
                                  {item?.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row gap-6">
                              {item?.email}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
