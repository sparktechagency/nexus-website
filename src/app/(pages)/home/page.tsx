
"use client"

import CustomModal from '@/components/modal/customModal'
import HomeFooterCurd from '@/components/modal/home-footer-curd'
import SubscriptionModal from '@/components/modal/subscriptionModal'
import DashboardSummaryCard from "@/components/summary-card"
import WeeklyBookingGraph from "@/components/weekly-booking-graph"
import WeeklyRevenueGraph from "@/components/weekly-revenue-graph"
import { useEffect, useState, Suspense } from 'react'
import cookies from 'js-cookie'
import { useGetWebDashboardHomeApiQuery } from '@/redux/website/home/webHomePageApi'



// Wrap the component that uses useSearchParams in Suspense
const HomePageContent = () => {
  const [isSubscription, setIsSubscription] = useState(false)

  const modalVerify = cookies.get("subscription_status")

  useEffect(() => {
    if (modalVerify === "active") {
      setIsSubscription(false)
    } else {
      setIsSubscription(true)
    }
  }, [modalVerify])


  const {data:getDashboard} = useGetWebDashboardHomeApiQuery({
    skip:true
  })
const curdData = getDashboard?.data


  





  return (
    <div className='px-4 md:px-6 lg:px-8 mb-6 '>
      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 ">
        {/* Summary Cards */}
        <DashboardSummaryCard title="Total Room" value={curdData?.total_room} icon="Room" iconBgColor="bg-icon-blue"/>

        <DashboardSummaryCard title="Upcoming Bookings" value={curdData?.upcoming_bookings} icon="Booking" iconBgColor="bg-icon-orange" />
        <DashboardSummaryCard title="Revenue" value={curdData?.revenue} icon="Revenue" iconBgColor="bg-icon-green" />

        <DashboardSummaryCard title="Average Rating" value={curdData?.average_rating} icon="AverageRating" iconBgColor="bg-icon-purple" />

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
        className={"p-4 max-h-[30vh] xl:max-h-none xl:overflow-y-hidden"}
        maxWidth={"md:!max-w-[95vw] xl:!max-w-[50vw]"}
      >
        <SubscriptionModal
          open={isSubscription}
          setIsOpen={setIsSubscription}
        />
      </CustomModal>
    </div>
  )
}

// Main component that wraps the content in Suspense
const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}

export default HomePage