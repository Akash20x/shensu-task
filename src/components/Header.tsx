"use client"
import { AuthContext } from '@/app/context/AuthContext'
import Link from 'next/link'
import React , {useContext} from 'react'
import { Button } from './ui/button'
import MobileNav from "./MobileNav";
import { Badge } from './ui/badge'
import ThemeToggle from './ThemeToggle'

const Header = () => {

    const {userRole, currentUser,logout} = useContext(AuthContext)

    

  return (
    <nav className="container flex lg:px-20 py-6 items-center justify-between">
    <Link href="/" className="ml-3 text-3xl font-bold">
      Stock Connect
    </Link>

    <div className="flex sm:hidden">
      <MobileNav />
    </div>
    <div className="hidden sm:flex gap-4 items-center ">
      {currentUser ? (
        <>
          <Badge className={"text-base"}>{currentUser?.displayName}</Badge>
        {userRole ==="admin" && 
                <Link href={"/dashboard/add-stock"} className="hover:text-blue-500">
                Add
                </Link>
        }
          <Link href={"/dashboard/all-stock"} className="hover:text-blue-500">
            View
          </Link>
          <ThemeToggle />
          
          <Button className="w-full" size="sm" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <ThemeToggle />
          <Button size="sm">
            <Link href="/login">Login</Link>
         </Button>
        </>

      )}
    </div>
  </nav>
  )
}

export default Header
