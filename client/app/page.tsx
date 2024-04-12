    //currently multi user support is absent as well as admin cannot be detected.
  "use client";
  import Link from "next/link";

  import axios from "axios";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { MailOutline } from "@mui/icons-material";
  import { useEffect } from "react";
  import { useSession } from "next-auth/react";
  import { useState } from "react";
  import ListClaimWrapper from "@/components/dashboard/ListClaimWrapper";
  import ClaimWrapper from "@/components/dashboard/ClaimWrapper";
  import Navbar from "@/components/ui/Navbar";
  import Footer from "@/components/ui/Footer";

  export default function Home() {
    const { data: session, status } = useSession();
    const [userInfo, setUserInfo] = useState<{
      name: string | null | undefined;
      email: string | null | undefined;
      type: string | null | undefined;
    }>({ name: "Unknown", email: "Unknown", type: "Unknown" });
    const [newClaims, setNewClaims] = useState([]);
    const [history, setHistory] = useState([]);
    const [currClaims, setCurrClaims] = useState([]);
    // console.log(history[0]);
    useEffect(() => {
      async function getUser(data: any) {
        //define type later on
        const res = await axios.get("http://localhost:3000/api/getUser", {
          params: {
            ...data,
          },
        });
        return res.data;
      }

      async function getDB(sessionData: any) {
        const newClaim = await axios.get("http://localhost:3000/api/claims", {
          params: {
            ...sessionData,
            condensed: true,
            status: "new",
          },
        });
        setNewClaims(newClaim.data);

        const history = await axios.get("http://localhost:3000/api/history", {
          params: {
            ...sessionData,
            condensed: true,
          },
        });
        setHistory(history.data);

        const currClaims = await axios.get("http://localhost:3000/api/claims", {
          params: {
            ...sessionData,
            condensed: true,
            status: "current",
          },
        });
        setCurrClaims(currClaims.data);
      }
      if (session && status === "authenticated") {
        getUser(session?.user).then((res) => {
          setUserInfo(res);
          getDB(session?.user);
        });
      }
    }, [session]);

    return (
      <div>
        <Navbar />
        <main className="p-2 px-4 sm:px-10 xl:px-24">
          <div className="text-3xl font-extrabold my-4">Dashboard</div>
          <section className="flex flex-col lg:flex-row gap-4">
            <ListClaimWrapper
              title={<Link href="/claimList">Current claims</Link>}
              condensed={false}
            >
              {currClaims.map((data, ind) => (
                <ClaimWrapper
                  key={ind}
                  type={data.status}
                  name={data.claimant_name}
                  info={data.dept_name}
                  id = {data.id}
                  // action={{
                  //   e_name: data.history[0].employee.name,
                  //   time_stamp: data.history[0].time_stamp,
                  //   remarks: data.history[0].remarks,
                  // }}
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
              title={<Link href="/history">Action History</Link>}
              condensed={false}
            >
              {history &&
                history.map((item, ind) => (
                  <ClaimWrapper
                    key={ind}
                    type={item.action}
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
                title={<Link href="/incomingClaims">Incoming claims</Link>}
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
                    />
                  ))}
              </ListClaimWrapper>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
