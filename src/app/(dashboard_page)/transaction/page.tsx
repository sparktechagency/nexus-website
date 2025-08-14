
import {  CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PremiumIcon, StandardIcon, StarIcon } from "@/components/custom-icons"


const planData = [
  { name: "Basic Plan", count: 120, color: "text-yellow-400", icon: <StarIcon /> },
  { name: "Standard Plan", count: 120, color: "text-red-400", icon: <StandardIcon /> },
  { name: "Premium Plan", count: 120, color: "text-yellow-400", icon: <PremiumIcon /> },
]

const subscriptionData = [
  {
    id: 1,
    provider: "Abir",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "abid32@gmail.com",
    planType: "Basic",
    date: "12/01/23",
  },
  {
    id: 2,
    provider: "Maksud",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "user123@example.com",
    planType: "Standard",
    date: "12/01/23",
  },
  {
    id: 3,
    provider: "Arjun",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "hello@creativeoutlook.com",
    planType: "Premium",
    date: "12/02/23",
  },
  {
    id: 4,
    provider: "Sita",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "info@innovativeideas.com",
    planType: "Basic",
    date: "12/03/23",
  },
  {
    id: 5,
    provider: "Kiran",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "support@techsolutions.com",
    planType: "Standard",
    date: "12/04/23",
  },
  {
    id: 6,
    provider: "Kiran",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    contact: "support@techsolutions.com",
    planType: "Premium",
    date: "12/05/23",
  },
]


const TransactionPage = () => {
  return (
    <div className="pt-4">
      <div className=" space-y-4">
       <div className="bg-[#1a1624] p-4 rounded-lg">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-4">Subscription Overview</h1>
        </div>

    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planData.map((plan) => {
              return (
                <div key={plan.name} className="border-slate-700 bg-[#292533] rounded-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium">{plan.name}</h3>
                      <p>{plan.icon}</p>
                    </div>
                    <div className={`${plan.name === "Basic Plan" || plan.name === "Premium Plan" ? " text-3xl font-bold text-yellow-400" : "text-3xl font-bold text-[#FF193D]"}`}>{plan.count}</div>
                  </CardContent>
                </div>
              )
            })}
          </div>
        </div>



        <div className="p-4 rounded-2xl  bg-[#1a1624]">
          <Table className="border-none">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent cursor-pointer">
                <TableHead className="text-[#ffff] font-bold text-lg">Provider</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Contact</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Plan type</TableHead>
                <TableHead className="text-[#ffff] font-bold text-lg">Date</TableHead>
              </TableRow>
            </TableHeader>



            <TableBody>
              {subscriptionData.map((subscription) => (
                <TableRow
                  key={subscription.id}
                  className="text-[#ffff] border-none hover:bg-transparent cursor-pointer"
                >
                  <TableCell className="pb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={subscription.avatar || "/placeholder.svg"} alt={subscription.provider} />
                        <AvatarFallback className="bg-slate-700 text-white text-sm">
                          {subscription.provider.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">{subscription.provider}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pb-6">
                    <span className="text-slate-300">{subscription.contact}</span>
                  </TableCell>



                  <TableCell >
                    <button className={`${subscription.planType === "Basic"
                      ? "bg-[#4a403b] px-3 py-1 rounded-full"
                      : subscription.planType === "Premium"
                        ? "bg-[#472e22] px-3 py-1 rounded-full"
                        : "bg-[#481830] px-3 py-1 rounded-full"
                      }`}>{subscription.planType}</button>
                  </TableCell>

                  <TableCell className="pb-6">
                    <span className="text-slate-300">{subscription.date}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TransactionPage