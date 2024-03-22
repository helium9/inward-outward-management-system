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
function Page() {
  return (
    <main className="p-2 px-4 sm:px-10 xl:px-24">
      <div className="text-2xl font-extrabold my-4">Claim information</div>
      <section className="flex flex-col lg:flex-row gap-4">
      <div className="rounded-md border border-zinc-300 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-zinc-50">
                <div className="flex flex-row items-center p-4 text-black">
                <div className="mr-3 pt-0.5"><AssignmentOutlined sx={{ fontSize: 40 }} /></div>
                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-col w-full max-w-52">
                        <span className="flex flex-row justify-between font-bold text-lg">
                            <p>Invoice number</p>
                            <p>#4321</p>
                        </span>
                        <span className="flex flex-row justify-between">
                            <p>Issue date</p>
                            <p>21-08-23</p>
                        </span>
                    </div>
                    <p>Status: Rejected</p>
                </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-[75px] py-3">
                <p className="text-lg font-semibold">Claimant details</p>
                <div className="flex flex-row">
                    <div className="flex flex-col mr-12"><p>Name</p><p>Department Name</p></div>
                    <div className="flex flex-col text-zinc-500"><p>Prof. N Bharath Ballal</p><p>Metalurgical Engineering and Material Science</p></div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-[75px] py-3">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">Subject</p>
                    <p className="text-zinc-500">Attendence Sheet of visiting Distinguished Professor received from Faculty Affairs.</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-[75px] py-3">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">Payment Information</p>
                    <div className="grid grid-cols-2">
                        <p>Claimant Name</p>
                        <p className="text-zinc-500">Prof. N Bharath Ballal</p>
                        <p>Party Name</p>
                        <p className="text-zinc-500">-</p>
                        <p>Amount</p>
                        <p className="text-zinc-500">₹900</p>
                    </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell className="px-[75px] py-3">
                <div className="grid grid-cols-2">
                    <p className="text-base font-semibold">Alotted to</p>
                    <p className="text-zinc-500">Neha Jain</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
      </section>
    </main>
  );
}

export default Page;
