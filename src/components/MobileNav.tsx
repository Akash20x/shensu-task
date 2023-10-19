import React,{useContext, useState} from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "@/app/context/AuthContext";

const MobileNav = () => {

  const {userRole,currentUser,logout} = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={()=>setIsOpen(true)}>
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <div className="flex flex-col px-4 mt-4">
        <SheetHeader>
                <SheetTitle className="flex justify-between">
                  {currentUser?.displayName && <Badge className={"text-base my-2"}>{currentUser.displayName}</Badge>}
                  <ThemeToggle />
                </SheetTitle>
              </SheetHeader>
          {currentUser ? (
            <>

              <div className="flex flex-col gap-8 mt-4">
              {userRole ==="admin" && 
                <Link
                  href={"/dashboard/add-stock"}
                  className="hover:text-blue-500"
                >
                  Add
                </Link>
              }
                <Link
                  href={"/dashboard/all-stock"}
                  className="hover:text-blue-500"
                >
                  View
                </Link>
                <Button className="w-full" size="sm" onClick={logout}>
                   Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Button size="sm" className="mt-5 w-[75%]" onClick={()=>setIsOpen(false)}>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" className="mt-3 w-[75%]" onClick={()=>setIsOpen(false)}>
              <Link href="/signup">Sign Up</Link>
            </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;