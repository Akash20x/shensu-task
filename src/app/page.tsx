"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import homeimg from "@/../public/assets/homepage.svg"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'


export default function Home() {

  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <main className="p-4 lg:px-20 lg:py-10 relative">
        <div className="flex flex-col-reverse md:flex-row rounded-lg mt-8 gap-4 items-center p-4 sm:p-8 justify-around">
          <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6 sm:mb-0 md:max-w-[300px] animate__animated animate__fadeInLeft">
            <h2 className="text-lg sm:text-2xl font-semibold">
              Stock Management System
            </h2>
            <p className="text-base sm:text-lg text-center md:text-left">
              A simple stock management system for retail businesses to
              keep track of their products and their inventory.
            </p>

            <Button className="mb-8 text-white cursor-pointer">

              <Link href={currentUser ? "/dashboard" : "/signup"}>
                 {currentUser ? "Go to Dashboard →" : "Get started for free →"}
              </Link>
            </Button>
          </div>
          <Image
            src={homeimg}
            alt="main image"
            className="w-3/4 sm:w-1/2 animate__animated animate__fadeInRight mb-6 md:mb-0"
            priority={true}
          />
        </div>
      </main>
  </>
  )
}
