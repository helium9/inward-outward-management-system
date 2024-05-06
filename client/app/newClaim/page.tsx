"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Input } from "@nextui-org/react";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
// import {Input} from "@nextui-org/react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from 'next/navigation';

export default function page() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    inward_number: "",
    issue_date: "",
    ind_name: "",
    dept_name: "",
    party_name: "",
    claimant_name: "",
    subject: "",
    amount: "",
    advanced_req: false,
  });
  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const { toast } = useToast();
  const info = async (e) => {
    e.preventDefault();
    e.currentTarget.disabled=true;
    console.log(formData);
    if (session && status === "authenticated") {
      axios
        .post("/api/newClaim", {
          origin: session?.user?.email,
          inward_number: Number(formData.inward_number),
          issue_date: formData.issue_date,
          ind_name: formData.ind_name,
          dept_name: formData.dept_name,
          party_name: formData.party_name,
          claimant_name: formData.claimant_name,
          subject: formData.subject,
          amount: Number(formData.amount),
          advanced_req: formData.advanced_req,
        })
        .then((response) => {
          if(response.status===200){
            return toast({
              title: "Claim created successfully."
            });
          }
        })
        .catch((error) => {
          e.target.disabled=false;
          return toast({
            variant: "destructive",
            title: "Something went wrong.",
            description: error,
          });
        });
    }
  };
  return (
    <div>
      <Navbar />
      <div
        className="font-bold text-center"
        style={{ marginRight: "40rem", marginTop: "2.5rem" }}
      >
        <h1 className="font-bold text-2xl">New Claim</h1>
      </div>

      <section className="justify-center items-center  flex flex-col mb-12">
        <div
          className="font-bold text-center"
          style={{ marginRight: "36.2rem", marginTop: "2rem" }}
        >
          <h3 className="font-bold text-lg">Indentor Information</h3>
        </div>
        <br />
        <div
          className="grid w-full items-center gap-1.5 mb-4 font-semibold"
          style={{
            width: "370px",
            marginRight: "24.5rem",
            marginTop: "-0.75rem",
          }}
        >
          <Label htmlFor="name" className="font-semibold text-base">
            Name
          </Label>
          <Input
            isClearable
            type="text"
            variant="bordered"
            // placeholder="Rishi"
            defaultValue=""
            // onClear={() => console.log("input cleared")}
            className="border-gray-200"
            name="ind_name"
            value={formData.ind_name}
            onChange={handleInputChange}
            onClear={() => setFormData({ ...formData, ind_name: "" })}
          />
        </div>

        <div
          className="grid w-full items-center gap-1.5 mb-4"
          style={{ width: "520px", marginRight: "15rem" }}
        >
          <Label htmlFor="name" className="font-semibold text-base">
            Department
          </Label>
          <Input
            isClearable
            type="text"
            variant="bordered"
            // placeholder="Computer Science"
            defaultValue=""
            // onClear={() => console.log("input cleared")}
            name="dept_name"
            value={formData.dept_name}
            onChange={handleInputChange}
            onClear={() => setFormData({ ...formData, dept_name: "" })}
          />
        </div>
        <div
          className="grid w-full items-center gap-1.5 mb-4"
          style={{ width: "450px", marginRight: "19.5rem" }}
        >
          <div className="flex justify-between">
            <div>
              <Label htmlFor="name" className="font-semibold text-base">
                Invoice number
              </Label>
              <Input
                isClearable
                type="number"
                variant="bordered"
                className="mr-3 rounded-sm"
                style={{ width: "120px" }}
                // placeholder="#0000"
                defaultValue=""
                // onClear={() => console.log("input cleared")}
                name="inward_number"
                value={formData.inward_number}
                onChange={handleInputChange}
                onClear={() => setFormData({ ...formData, inward_number: "" })}
              />
            </div>
            <div>
              <Label htmlFor="date" className="font-semibold text-base ml-3">
                Issue date
              </Label>
              <Input
                type="date"
                id="date"
                placeholder="Pick a Date"
                variant="bordered"
                className="mr-1 rounded-sm ml-3"
                style={{ width: "308px" }}
                name="issue_date"
                value={formData.issue_date}
                onChange={handleInputChange}
                onClear={() => setFormData({ ...formData, issue_date: "" })}
              />
            </div>
          </div>
        </div>
        <br />
        <div
          className="font-bold text-center"
          style={{ marginRight: "5.6rem", marginTop: "-1rem" }}
        >
          <div
            className="font-bold text-center"
            style={{ marginRight: "21rem", marginTop: "2rem" }}
          >
            <h3 className="font-bold text-lg">
              Claim Details (Payment to be made to)
            </h3>
          </div>
        </div>
        <br />
        <div
          className="grid w-full items-center gap-1.5 mb-4"
          style={{ width: "450px", marginRight: "19.5rem" }}
        >
          <div className="flex justify-between">
            <div>
              <Label htmlFor="name" className="font-semibold text-base">
                Claimant name
              </Label>
              <Input
                isClearable
                type="text"
                variant="bordered"
                className="mr-2"
                style={{ width: "275px", marginLeft: "5px" }}
                // placeholder="Rishi"
                defaultValue=""
                // onClear={() => console.log("input cleared")}
                name="claimant_name"
                value={formData.claimant_name}
                onChange={handleInputChange}
                onClear={() => setFormData({ ...formData, claimant_name: "" })}
              />
            </div>
            <div>
              <Label htmlFor="name" className="font-semibold text-base ml-3">
                Party Name
              </Label>
              <Input
                isClearable
                type="text"
                variant="bordered"
                className="mr-3 ml-3"
                style={{ width: "275px" }}
                // placeholder="Rishi"
                defaultValue=""
                // onClear={() => console.log("input cleared")}
                name="party_name"
                value={formData.party_name}
                onChange={handleInputChange}
                onClear={() => setFormData({ ...formData, party_name: "" })}
              />
            </div>
          </div>
        </div>

        <div
          className="grid w-full items-center gap-1.5 mb-4"
          style={{ width: "653px", marginRight: "6.8rem" }}
        >
          <Label htmlFor="message-2" className="font-semibold text-base">
            Subject
          </Label>
          <Textarea
            placeholder=""
            id="message-2"
            variant="bordered"
            className="rounded-sm border-opacity-50"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            onClear={() => setFormData({ ...formData, subject: "" })}
          />
        </div>

        <div
          className="grid w-full items-center gap-1.5 mb-4"
          style={{ width: "200px", marginRight: "35rem" }}
        >
          <Label htmlFor="date" className="font-semibold text-base">
            Amount
          </Label>
          <Input
            isClearable
            type="integer"
            variant="bordered"
            placeholder="Rs.0"
            defaultValue=""
            // onClear={() => console.log("input cleared")}
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            onClear={() => setFormData({ ...formData, amount: "" })}
          />
        </div>
        <Checkbox
          color="default"
          style={{ marginRight: "33rem" }}
          name="advanced_req"
          checked={formData.advanced_req}
          onChange={handleInputChange}
        >
          Is it an advanced request?
        </Checkbox>
        <Button
          style={{
            marginRight: "40rem",
            marginTop: "2rem",
            left: "-20px",
            position: "relative",
          }}
          onClick={info}
        >
          Submit
        </Button>
      </section>
      <Footer/>
    </div>
  );
}
