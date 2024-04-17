// 'use client';

// import Link from 'next/link';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Input } from "@nextui-org/react";
// import {
//   Phone,
//   MailOutline,
//   Search,
//   FilterAltOutlined,
//   ExpandCircleDownOutlined,
//   AssignmentOutlined,
//   FileOpenOutlined,
//   PostAddOutlined,
//   TaskOutlined,
//   ContentPasteGoOutlined,
// } from "@mui/icons-material";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {  LastPage, FirstPage } from "@mui/icons-material";

// import FilterDialog from "@/components/FilterDialog";



// import { mkConfig, generateCsv, asString } from "export-to-csv";
// import { writeFile } from "node:fs";
// import { Buffer } from "node:buffer";

// // mkConfig merges your options with the defaults
// // and returns WithDefaults<ConfigOptions>
// const csvConfig = mkConfig({ useKeysAsHeaders: true });

// const mockData = [
//   {
//     name: "Rouky",
//     date: "2023-09-01",
//     percentage: 0.4,
//     quoted: '"Pickles"',
//   },
//   {
//     name: "Keiko",
//     date: "2023-09-01",
//     percentage: 0.9,
//     quoted: '"Cactus"',
//   },
// ];

// // Converts your Array<Object> to a CsvOutput string based on the configs
// const csv = generateCsv(csvConfig)(mockData);
// const filename = `${csvConfig.filename}.csv`;
// const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

// // Write the csv file to disk
// writeFile(filename, csvBuffer, (err) => {
//   if (err) throw err;
//   console.log("file saved: ", filename);
// });

// const Page = ()=>{

//     return (
//       <>
//      <p>
//      export
//       </p> 
//       </>
//     );
// }


// export default Page; 