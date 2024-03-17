"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu"

  import { Button } from "@/components/ui/button"
  import Link from 'next/link'
function NavBar() {
  return (
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
  )
}

export default NavBar