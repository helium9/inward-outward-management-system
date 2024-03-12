import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
import { Input } from "@nextui-org/react";
import { ReactNode } from "react";

const ListClaimWrapper = ({
  title,
  condensed=false,
  children,
}: {
  title: string;
  condensed: boolean,
  children: ReactNode[];
}) => {
  const searchBoxThemeText = (!condensed)?`m-0 max-w-96`:'m-0 w-10';
  return (
    <Card className="rounded-md w-full px-3 min-w-80">
      <div className="flex flex-row items-center m-4 place-content-between">
        <CardTitle className="text-xl font-bold min-w-36">{title}</CardTitle>
        <div className="flex flex-row gap-2 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex flex-row items-center`+ (condensed?"":`min-w-28`)}>
              <Button
                variant="outline"
                className={`bg-slate-100 p-2 text-zinc-600 h-8 border-zinc-300 m-0 rounded`+(condensed?`w-fit`:`w-full`)}
              >
                <FilterAltOutlined />
                {!condensed && (<p className="pl-1 pr-2 mr-auto">Filter</p>)}
                {!condensed && (<ExpandCircleDownOutlined sx={{ fontSize: 16 }}/>)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Filter1</DropdownMenuItem>
              <DropdownMenuItem>Filter2</DropdownMenuItem>
              <DropdownMenuItem>Filter3</DropdownMenuItem>
              <DropdownMenuItem>Filter4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            size="sm"
            variant="bordered"
            classNames={{
              base: searchBoxThemeText,
              inputWrapper: "rounded border-zinc-200 border",
              input: "",
            }}
            placeholder={(condensed?``:`Search`)}
            startContent={<Search sx={{ color: "#999999" }} />}
          />
        </div>
      </div>
      <CardContent className="flex gap-3 flex-col">{children}</CardContent>
      <CardFooter className="text-zinc-500 text-xs underline">
        <p>View More</p>
      </CardFooter>
    </Card>
  );
};

const ClaimWrapper = ({
  type,
  name,
  info,
  action = null,
}: {
  type: string;
  name: string;
  info: string;
  action: { e_name: string; time_stamp: string; remarks: string } | null;
}) => {
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{ fontSize: 36, marginRight: 0.5 }} />,
    outward: <TaskOutlined sx={{ fontSize: 40 }} />,
    inward: <FileOpenOutlined sx={{ fontSize: 40 }} />,
    new: <PostAddOutlined sx={{ fontSize: 40 }} />,
    stage: <AssignmentOutlined sx={{ fontSize: 40 }} />,
  };
  const icon = iconMap[type] || null;
  return (
    <div className="flex flex-row place-content-between">
      <div className="flex flex-row items-center">
        {icon}
        <div className="flex flex-col ml-2 font-semibold">
          <p>{name}</p>
          <p className="text-zinc-500">{info}</p>
        </div>
      </div>
      {action !== null && (
        <div className="flex flex-col text-zinc-500 font-semibold items-end">
          <span className="flex flex-row">
            <p className="text-zinc-900">{action?.e_name}&nbsp;</p>
            <p> at {action?.time_stamp}</p>
          </span>
          <p>{action?.remarks}</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <main className="p-2 px-24">
      <div className="text-3xl font-extrabold my-4">Dashboard</div>
      <section className="flex flex-row gap-4">
        <ListClaimWrapper title={"Current claims"} condensed={false}>
          <ClaimWrapper
            type={"new"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "Document is being forwarded for...",
            }}
          />
          <ClaimWrapper
            type={"stage"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "No comments!",
            }}
          />
          <ClaimWrapper
            type={"inward"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "Verification done, inward complete.",
            }}
          />
          <ClaimWrapper
            type={"outward"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "All complete, outward complete.",
            }}
          />
        </ListClaimWrapper>

        <Card className="max-w-96 rounded-md max-h-52">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Welcome, Rishi</CardTitle>
            <CardDescription className="font-semibold text-zinc-500">
              F/A Employee
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-2">
            <span className="rounded-full bg-zinc-300 p-2">
              <Phone />
            </span>
            <p>999999999</p>
            <span className="ml-4 rounded-full bg-zinc-300 p-2">
              <MailOutline />
            </span>
            <p>rishi@iiti.ac.in</p>
          </CardContent>
          <CardFooter className="flex flex-row gap-4 text-zinc-500 text-xs">
            <p>Change Password?</p>
            <p>Profile Settings</p>
          </CardFooter>
        </Card>
      </section>
      <section className="flex flex-row gap-4 mt-12">
        <ListClaimWrapper title={"Action history"} condensed={false}>
          <ClaimWrapper
            type={"new"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "Document is being forwarded for...",
            }}
          />
          <ClaimWrapper
            type={"stage"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "No comments!",
            }}
          />
          <ClaimWrapper
            type={"inward"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "Verification done, inward complete.",
            }}
          />
          <ClaimWrapper
            type={"outward"}
            name={"Claim Name"}
            info={"Claim Info"}
            action={{
              e_name: "User Name",
              time_stamp: "10-03-24 15:03",
              remarks: "All complete, outward complete.",
            }}
          />
        </ListClaimWrapper>

        <div>
          <ListClaimWrapper title={"Incoming claims"} condensed={true}>
            <ClaimWrapper
              type={"new"}
              name={"Claim Name"}
              info={"Claim Info"}
              action={null}
            />
            <ClaimWrapper
              type={"new"}
              name={"Claim Name"}
              info={"Claim Info"}
              action={null}
            />
            <ClaimWrapper
              type={"new"}
              name={"Claim Name"}
              info={"Claim Info"}
              action={null}
            />
            <ClaimWrapper
              type={"new"}
              name={"Claim Name"}
              info={"Claim Info"}
              action={null}
            />
          </ListClaimWrapper>
        </div>
      </section>
    </main>
  );
}
