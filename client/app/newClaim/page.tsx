"use client";
import Link from 'next/link'
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CancelIcon from '@mui/icons-material/Cancel';
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
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <div>
      <div className="flex text-center" style={{marginTop:"1rem"}}>
        <NavigationMenu className="" style={{marginLeft:"38rem"}}>
          <NavigationMenuList>
            <NavigationMenuItem>
             
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
             

              
              <NavigationMenuTrigger>Claims</NavigationMenuTrigger>
             
              <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink  className={navigationMenuTriggerStyle()}>
                    Actions
                  </NavigationMenuLink>
                </Link>
             
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant="secondary" style={{marginLeft:"31rem"}}>Sign out</Button>
            
      </div>
      <br/>
      <hr/>
      <div className="font-bold text-center" style={{marginRight:"18rem", marginTop:"1.8rem"}}>
        <h1 className='font-bold text-xl'>New Claim</h1><br/>
      </div>
      <section className = "justify-center items-center  flex flex-col">
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Claimant Name</Label>
          <Input type="name" id="name" placeholder="Rishi"  />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Department</Label>
          <Input type="name" id="name" placeholder="Computer Science" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="name">Payment to be made to</Label>
          <div className='flex justify-between'>
          <Input type="name" id="name" className='mr-3' placeholder="Party Name" />
          <Input type="name" id="name" className='mr-3' placeholder="Claimant Name" />
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" placeholder="Pick a Date" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="message-2">Subject</Label>
          <Textarea placeholder="" id="message-2" />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
          <Label htmlFor="date">Amount</Label>
          <Input type="integer" id="integer" placeholder="$0" />
        </div>
        <Button style={{marginRight:"19rem", marginTop:"1rem"}}>Submit</Button>
      </section><br/>
      <br/>
      <footer className='text-center text-sm'>Copyright ©2024 IIT Indore. All right reserved.</footer>
    </div>
  );
}
