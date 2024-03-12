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
import { Phone, MailOutline, Search, FilterAltOutlined, ExpandCircleDownOutlined, AssignmentOutlined, FileOpenOutlined, PostAddOutlined, TaskOutlined, ContentPasteGoOutlined } from "@mui/icons-material";
import { Input } from "@nextui-org/react";
import { ReactNode } from "react";

const ListClaimWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode[];
}) => {
  return (
    <Card className="rounded-md w-full px-3">
      <div className="flex flex-row items-center m-4 place-content-between">
        <CardTitle className="text-xl font-bold min-w-36">{title}</CardTitle>
        <div className="flex flex-row gap-2 w-fit">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row items-center min-w-28">
            <Button variant='outline' className="bg-slate-100 w-full p-2 text-zinc-600 h-8 border-zinc-300 m-0 rounded"><FilterAltOutlined/><p className="pl-1 pr-2 mr-auto">Filter</p><ExpandCircleDownOutlined sx={{fontSize:16}}/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          size="sm"
          variant="bordered"
          classNames={{
            base: "max-w-96 m-0",
            inputWrapper: "rounded border-zinc-200 border",
            input: "",
          }}
          placeholder="Search"
          startContent={<Search sx={{ color: "#999999" }} />}
        />
        </div>
      </div>
      <CardContent>{children}</CardContent>
      <CardFooter className="text-zinc-500 text-xs underline">
        <p>View More</p>
      </CardFooter>
    </Card>
  );
};

const ClaimWrapper = ({type, name, info, action}:{type:string; name:string; info:string; action:{e_name:string; time_stamp:string; remarks:string}})=>{
  const iconMap = {
    forward: <ContentPasteGoOutlined sx={{fontSize:40}} />,
    outward: <TaskOutlined sx={{fontSize:40}}/>,
    inward: <FileOpenOutlined sx={{fontSize:40}}/>,
    new: <PostAddOutlined sx={{fontSize:40}}/>,
    stage: <AssignmentOutlined sx={{fontSize:40}}/>,
  };
  const icon = iconMap[type] || null;
  return( 
    <div className="flex flex-row place-content-between">
      <div className="flex flex-row">{icon}<div className="flex flex-col"><p>{name}</p><p>{info}</p></div></div>
      <div className="flex flex-col"><p>{action.e_name} at {action.time_stamp}</p><p>{action.remarks}</p></div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="p-2 px-24">
      <div className="text-3xl font-extrabold my-4">Dashboard</div>
      <section className="flex flex-row gap-4">
        <ListClaimWrapper title={"Current Claims"}>
          <ClaimWrapper type={"new"} name={"Onga Bunga"} info={"new claim"} action={{e_name:"user", time_stamp:"date", remarks:"hhhh"}}/>
          <ClaimWrapper type={"new"} name={"Onga Bunga"} info={"new claim"} action={{e_name:"user", time_stamp:"date", remarks:"hhhh"}}/>
          <ClaimWrapper type={"forward"} name={"Onga Bunga"} info={"new claim"} action={{e_name:"user", time_stamp:"date", remarks:"hhhh"}}/>
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
    </main>
  );
}
