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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

function Page() {
  return (
    <main className="px-24">
      <div className="flex flex-row w-full text-zinc-600 items-center justify-between my-6">
        <p className="text-2xl">Filters</p>
        <div className="flex flex-row gap-4">
          <select className="bg-white border rounded w-56 h-12 p-2 shadow">
            <option value="">All Equipment types</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
          </select>
          <select className="bg-white border rounded w-56 h-12 p-2 shadow">
            <option value="">All departments</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
          </select>
          <select className="bg-white border rounded w-56 h-12 p-2 shadow">
            <option value="">By Faculty</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
          </select>
          <select className="bg-white border rounded w-56 h-12 p-2 shadow">
            <option value="">By Location</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
            <option value="dog">Option 1</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row w-full text-zinc-600 items-center justify-between my-2">
        <div>
          Show{" "}
          <select className="bg-white border rounded w-14 h-8 border-zinc-400 px-2">
            <option value="">10</option>
            <option value="dog">Option 1</option>
          </select>{" "}
          entries
        </div>
        <div className="h-8 flex flex-row items-center">
          Search:
          <input
            type="text"
            className="border-zinc-400 border h-full rounded ml-1"
          ></input>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-6"><p className="text-black font-bold w-6">S. No:</p></TableHead>
            <TableHead><p className="text-black">Equipment Type</p></TableHead>
            <TableHead><p className="text-black">Department</p></TableHead>
            <TableHead><p className="text-black">Equipment</p></TableHead>
            <TableHead><p className="text-black">Faculty</p></TableHead>
            <TableHead><p className="text-black">Description</p></TableHead>
            <TableHead><p className="text-black">Location</p></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-zinc-100 h-20">
            <TableHead className="w-6"></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical Property Characterisation</p></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical and Aerospace Engineering</p></TableHead>
            <TableHead>
              <p className="text-black font-normal">10 KN TENSILE TESTING MACHINE</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">Ramji Manoharan</p></TableHead>
            <TableHead className="font-normal">
              <p className="text-black">Tensile testing of polymers and plastics</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">C-210</p></TableHead>
          </TableRow>
          <TableRow className="h-20">
            <TableHead className="w-6"></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical Property Characterisation</p></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical and Aerospace Engineering</p></TableHead>
            <TableHead>
              <p className="text-black font-normal">10 KN TENSILE TESTING MACHINE</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">Ramji Manoharan</p></TableHead>
            <TableHead className="font-normal">
              <p className="text-black">Tensile testing of polymers and plastics</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">C-210</p></TableHead>
          </TableRow>
          <TableRow className="bg-zinc-100 h-20">
            <TableHead className="w-6"></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical Property Characterisation</p></TableHead>
            <TableHead><p className="text-black font-normal">Mechanical and Aerospace Engineering</p></TableHead>
            <TableHead>
              <p className="text-black font-normal">10 KN TENSILE TESTING MACHINE</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">Ramji Manoharan</p></TableHead>
            <TableHead className="font-normal">
              <p className="text-black">Tensile testing of polymers and plastics</p>
            </TableHead>
            <TableHead className="font-normal"><p className="text-black">C-210</p></TableHead>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}

export default Page;
