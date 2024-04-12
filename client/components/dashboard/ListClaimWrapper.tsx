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
import { ScrollArea } from "@/components/ui/scroll-area"
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
import Link from 'next/link';


const ListClaimWrapper = ({
  title,
  linkAddress,
  condensed = false,
  children,
}: {
  title: string;
  condensed: boolean;
  linkAddress:string;
  children: ReactNode[];
}) => {
  const searchBoxThemeText = !condensed ? `m-0 max-w-96` : "m-0 w-10";

  // Extract the URL from the title prop

  // Determine the appropriate "View More" link based on the titleLink
  // let viewMoreLink;
  // switch (titleLink) {
  //   case '/claimList':
  //     viewMoreLink = '/claimList';
  //     break;
  //   case '/history':
  //     viewMoreLink = '/history';
  //     break;
  //   case '/incomingClaims':
  //     viewMoreLink = '/incomingClaims';
  //     break;
  //   default:
  //     viewMoreLink = '#';
  // }

  return (
    <Card className="rounded-md w-full !px-3 min-w-80">
      <div className="flex flex-row items-center m-4 place-content-between">
        <CardTitle className="text-xl font-bold min-w-36">{title}</CardTitle>
        <div className="flex flex-row gap-2 w-fit">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                `flex flex-row items-center` + (condensed ? "" : `sm:min-w-28`)
              }
              asChild
            >
              {/* used asChild to prevent button in button hydration error. Refer: https://github.com/shadcn-ui/ui/issues/1626 */}
              <Button
                variant="outline"
                className={
                  `bg-slate-100 p-2 text-zinc-600 h-8 border-zinc-300 m-0 rounded` +
                  (condensed ? `w-fit` : `w-full`)
                }
              >
                <FilterAltOutlined />
                <div className="flex-row items-center hidden sm:flex">
                  {!condensed && <p className="pl-1 pr-2 mr-auto">Filter</p>}
                  {!condensed && (
                    <ExpandCircleDownOutlined sx={{ fontSize: 16 }} />
                  )}
                </div>
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
          <div className="hidden sm:block">
            <Input
              size="sm"
              variant="bordered"
              classNames={{
                base: searchBoxThemeText,
                inputWrapper: "rounded border-zinc-200 border",
              }}
              placeholder={condensed ? `` : `Search`}
              startContent={<Search sx={{ color: "#999999" }} />}
            />
          </div>
          <div className="block sm:hidden">
            <Input
              size="sm"
              variant="bordered"
              classNames={{
                base: `m-0 w-10`,
                inputWrapper: "rounded border-zinc-200 border",
              }}
              startContent={<Search sx={{ color: "#999999" }} />}
            />
          </div>
        </div>
      </div>
      <CardContent className="flex flex-col"><ScrollArea className="h-48">{children}</ScrollArea></CardContent>
      <CardFooter className="text-zinc-500 text-xs underline">
      <Link href={linkAddress}>
          View More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ListClaimWrapper;