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
  labels
}) {
  const handleValueChange = (key, newValue) => {
    setFilterData({ ...filterData, [key]: newValue });
  };
  console.log(labels, filterData);
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
                    <span className="text-slate-500">{labels.issue_date}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
            {Object.keys(filterData).map((key) => {
              console.log(key);
              return((key!=='issue_date')&&
              <Input
                key={key} // Assign a unique key to each Input component
                label={labels[key]} // Convert key to human-readable label
                className="w-full"
                size="sm"
                variant="bordered"
                radius="sm"
                value={filterData[key]}
                onValueChange={(newValue) => handleValueChange(key, newValue)}
                isClearable
              />
            )})}
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
