"use client"

import CustomModal from '@/components/modal/customModal'
import HomeFooterCurd from '@/components/modal/home-footer-curd'
import SubscriptionModal from '@/components/modal/subscriptionModal'
import DashboardSummaryCard from "@/components/summary-card"
import WeeklyBookingGraph from "@/components/weekly-booking-graph"
import WeeklyRevenueGraph from "@/components/weekly-revenue-graph"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const searchParams = useSearchParams()
  const showSubscription = searchParams.get("showSubscription")
  const loginVerify = searchParams.get("loginVerify")
  const [isSubscription, setIsSubscription] = useState(false)

  useEffect(() => {
    if (showSubscription === "true" || loginVerify === "true") {
      setIsSubscription(true)
    }
  }, [showSubscription,loginVerify])


  return (
    <div className='px-4 md:px-6 lg:px-8 mb-6 '>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 ">
        {/* Summary Cards */}
        <DashboardSummaryCard title="Total Room" value="26" icon="Room" iconBgColor="bg-icon-blue" />
        <DashboardSummaryCard title="Upcoming Bookings" value="26" icon="Booking" iconBgColor="bg-icon-orange" />
        <DashboardSummaryCard title="Revenue" value="$5642.00" icon="Revenue" iconBgColor="bg-icon-green" />
        <DashboardSummaryCard title="Average Rating" value="4.5" icon="AverageRating" iconBgColor="bg-icon-purple" />

        {/* Graphs */}
        <div className="lg:col-span-2 xl:col-span-2 ">
          <WeeklyRevenueGraph />
        </div>
        <div className="lg:col-span-2 xl:col-span-2">
          <WeeklyBookingGraph />
        </div>
      </main>

      <HomeFooterCurd />



      {/* modal component(RESCEDULE) */}
      <CustomModal
        open={isSubscription}
        setIsOpen={setIsSubscription}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"!max-w-[50vw]"}
      >
        <SubscriptionModal
          open={isSubscription}
          setIsOpen={setIsSubscription}
        />
      </CustomModal>
    </div>
  )
}

export default HomePage
