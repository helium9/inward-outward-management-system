import Link from 'next/link'
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CancelIcon from '@mui/icons-material/Cancel';
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu";

function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-between border-black p-4" style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.1)" }}>
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold">Finance Dept.</span>
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
              <NavigationMenuTrigger>Claims</NavigationMenuTrigger>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Actions
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant="secondary">Sign out</Button>
        {/* Mobile menu toggle button */}
        <button className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      <div className="md:hidden">
      
      </div>
    </div>
  )
}

export default Navbar