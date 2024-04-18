import { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import Link from "next/link";

const ListClaimWrapper = ({
  title,
  linkAddress,
  condensed = false,
  children,
}: {
  title: string;
  condensed: boolean;
  linkAddress: string;
  children: ReactNode[];
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredChildren = children.filter((child: ReactNode) => {
    if (searchQuery.trim() === "") {
      return true;
    }
    const claimWrapper = child as React.ReactElement<{
      name: string;
      info: string;
      action: { e_name: string; remarks: string };
    }>;

    const name = claimWrapper.props.name.toLowerCase();
    const info = claimWrapper.props.info.toLowerCase();
    const e_name = claimWrapper.props.action?.e_name.toLowerCase();
    const remarks = claimWrapper.props.action?.remarks.toLowerCase();

    const query = searchQuery.trim().toLowerCase();
    return (
      name.includes(query) ||
      info.includes(query) ||
      e_name.includes(query) ||
      remarks.includes(query)
    );
  });

  const renderChildren = filteredChildren.map(
    (child: ReactNode, index: number) => {
      return <div key={index}>{child}</div>;
    }
  );
  const searchBoxThemeText = !condensed ? `m-0 max-w-96` : "m-0 w-10";

  return (
    <Card className="rounded-md w-full !px-3 min-w-80">
      <div className="flex flex-row items-center m-4 place-content-between">
        <CardTitle className="text-xl font-bold min-w-36">{title}</CardTitle>
        <div className="flex flex-row gap-2 w-fit">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <CardContent className="flex flex-col">
        <ScrollArea className="h-48">{renderChildren}</ScrollArea>
      </CardContent>
      <CardFooter className="text-zinc-500 text-xs underline">
        <Link href={linkAddress}>View More</Link>
      </CardFooter>
    </Card>
  );
};

export default ListClaimWrapper;
