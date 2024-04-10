"use client";
import React from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
function FilterDialog({
  filterData,
  setFilterData,
  date,
  setDate,
  handleFilterClear,
  handleFilterApply,
}) {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className={`flex flex-row items-center sm:min-w-32`}
      >
        <Button
          variant="outline"
          className={`bg-slate-100 p-2 text-zinc-600 h-8 border-zinc-300 m-0 rounded w-fit sm:min-w-32`}
        >
          <div className="flex-row items-center hidden sm:flex w-full">
            <FilterAltOutlined />
            <p className="pl-1 pr-2 w-full text-left">Filter</p>
            <ExpandCircleDownOutlined sx={{ fontSize: 16 }} />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
          <SheetDescription>
            Filter content based on each field.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-5/6 pr-3">
          <div className="flex flex-col my-4 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal border-2 h-12 w-full",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span className="text-slate-500">Issue Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
            <Input
              label="Invoice number"
              className="w-full"
              size="sm"
              variant="bordered"
              radius="sm"
              value={filterData.inward_number}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, inward_number: newValue })
              }
              isClearable
            />
            <Input
              label="Status"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.status}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, status: newValue })
              }
              isClearable
            />
            <Input
              label="Indentor name"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.ind_name}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, ind_name: newValue })
              }
              isClearable
            />
            <Input
              label="Department name"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.dept_name}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, dept_name: newValue })
              }
              isClearable
            />
            <Input
              label="Subject"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.subject}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, subject: newValue })
              }
              isClearable
            />
            <Input
              label="Claimant name"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.claimant_name}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, claimant_name: newValue })
              }
              isClearable
            />
            <Input
              label="Party name"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.party_name}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, party_name: newValue })
              }
              isClearable
            />
            <Input
              label="Amount"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.amount}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, amount: newValue })
              }
              isClearable
            />
            <Input
              label="Alloted to"
              className="w-full"
              variant="bordered"
              size="sm"
              radius="sm"
              value={filterData.alloted_to_name}
              onValueChange={(newValue) =>
                setFilterData({ ...filterData, alloted_to_name: newValue })
              }
              isClearable
            />
          </div>
        </ScrollArea>
        <SheetFooter>
          <Button
            className="bg-white text-zinc-700 border-1 hover:bg-zinc-200"
            onClick={handleFilterClear}
          >
            Clear
          </Button>
          <SheetClose asChild>
            <Button type="submit" onClick={handleFilterApply}>
              Apply
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FilterDialog;
