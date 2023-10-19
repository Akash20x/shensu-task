"use client"
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import DashboardCards from '@/components/DashboardCards'

const Dashboard = () => {

    const {userRole,currentUser} = useContext(AuthContext)


  return (
<div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full lg:w-8/12 my-5">
          <p className="text-4xl font-semibold my-4 text-center">
            Welcome,{" "}
            <span className="text-blue-500">
              {currentUser?.displayName}
            </span>
          </p>
          <DashboardCards userRole={userRole} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
