
import HomeFooterCurd from '@/components/modal/home-footer-curd'
import DashboardSummaryCard from "@/components/summary-card"
import WeeklyBookingGraph from "@/components/weekly-booking-graph"
import WeeklyRevenueGraph from "@/components/weekly-revenue-graph"

const HomePage = () => {
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
    </div>
  )
}

export default HomePage
