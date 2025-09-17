"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface Booking {
  id: string
  playerName: string
  startTime: string
  endTime: string
  pcId: string
  color?: "blue" | "pink" | "green" | "orange"
}

interface BookingGridProps {
  pcs?: string[]
  timeSlots?: string[]
  bookings?: Booking[]
  className?: string
}

const defaultTimeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
]

const defaultPCs = ["PC 1", "PC 2", "PC 3", "PC 4", "PC 5"]

const defaultBookings: Booking[] = [
  {
    id: "1",
    playerName: "Lionel Messi",
    startTime: "10:00 AM",
    endTime: "11:00 PM",
    pcId: "PC 1",
    color: "pink",
  },
  {
    id: "2",
    playerName: "Lionel Messi",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    pcId: "PC 2",
    color: "pink",
  },
  {
    id: "3",
    playerName: "Lionel Messi",
    startTime: "11:00 AM",
    endTime: "02:00 PM",
    pcId: "PC 3",
    color: "blue",
  },
  {
    id: "4",
    playerName: "Lionel Messi",
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    pcId: "PC 4",
    color: "pink",
  },
  {
    id: "5",
    playerName: "Neymar",
    startTime: "01:00 PM",
    endTime: "04:00 PM",
    pcId: "PC 2",
    color: "blue",
  },
  {
    id: "6",
    playerName: "Lionel Messi",
    startTime: "04:00 PM",
    endTime: "05:00 PM",
    pcId: "PC 3",
    color: "pink",
  },
  {
    id: "7",
    playerName: "Lionel Messi",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    pcId: "PC 1",
    color: "blue",
  },
  {
    id: "8",
    playerName: "Lionel Messi",
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    pcId: "PC 4",
    color: "blue",
  },
  {
    id: "9",
    playerName: "Lionel Messi",
    startTime: "01:00 PM",
    endTime: "04:00 PM",
    pcId: "PC 5",
    color: "blue",
  },
  {
    id: "10",
    playerName: "Lionel Messi",
    startTime: "10:00 AM",
    endTime: "11:00 PM",
    pcId: "PC 5",
    color: "pink",
  },
]

const colorVariants = {
  blue: "bg-blue-500/80 border-blue-400 text-white",
  pink: "bg-pink-500/80 border-pink-400 text-white",
  green: "bg-green-500/80 border-green-400 text-white",
  orange: "bg-orange-500/80 border-orange-400 text-white",
}





const BookingTwoPage = ({
  pcs = defaultPCs,
  timeSlots = defaultTimeSlots,
  bookings = defaultBookings,
  className,
}: BookingGridProps) => {
  const [selectedSlot, setSelectedSlot] = useState<{ pc: string; time: string } | null>(null)

  // Calculate booking positions and spans
  const bookingLayout = useMemo(() => {
    const layout: Record<string, Record<string, { booking: Booking; rowSpan: number; isStart: boolean }>> = {}

    bookings.forEach((booking) => {
      const startIndex = timeSlots.indexOf(booking.startTime)
      const endIndex = timeSlots.indexOf(booking.endTime)

      if (startIndex !== -1 && endIndex !== -1) {
        const rowSpan = endIndex - startIndex + 1

        for (let i = startIndex; i <= endIndex; i++) {
          const timeSlot = timeSlots[i]
          if (!layout[booking.pcId]) layout[booking.pcId] = {}

          layout[booking.pcId][timeSlot] = {
            booking,
            rowSpan,
            isStart: i === startIndex,
          }
        }
      }
    })

    return layout
  }, [bookings, timeSlots])

  const handleSlotClick = (pc: string, time: string) => {
    // Check if slot is already booked
    const isBooked = bookingLayout[pc]?.[time]
    if (!isBooked) {
      setSelectedSlot({ pc, time })
    }
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-[800px] h-screen bg-gray-100 border border-pink-500 rounded-lg">
        {/* Header */}
        <div
          className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200"
          style={{ "--pc-count": pcs.length } as React.CSSProperties}
        >
          <div className="p-4 border-r border-pink-200 bg-card">
            <h3 className="font-semibold text-card-foreground">Time</h3>
          </div>
          {pcs.map((pc) => (
            <div key={pc} className="p-4 border-r border-pink-200 last:border-r-0 bg-card text-center">
              <h3 className="font-semibold text-card-foreground">{pc}</h3>
            </div>
          ))}
        </div>

        {/* Time slots grid */}
        <div className="relative">
          {timeSlots.map((time,index) => (
            <div
              key={index}
              className="grid grid-cols-[120px_repeat(var(--pc-count),1fr)] border-b border-pink-200 last:border-b-0 min-h-[60px]"
              style={{ "--pc-count": pcs.length } as React.CSSProperties}
            >
              {/* Time column */}
              <div className="p-4 border-r border-pink-200 bg-muted/20 flex items-center">
                <span className="text-sm font-medium text-muted-foreground">{time}</span>
              </div>

              {/* PC columns */}
              {pcs.map((pc) => {
                const slotData = bookingLayout[pc]?.[time]
                const isBooked = !!slotData
                const isBookingStart = slotData?.isStart

                return (
                  <div key={`${pc}-${time}`} className="border-r border-pink-200 last:border-r-0 relative min-h-[60px]">
                    {isBooked && isBookingStart && (
                      <div
                        className={cn(
                          "absolute inset-x-1 top-1 rounded-md border-2 p-3 z-10 flex flex-col justify-center",
                          colorVariants[slotData.booking.color || "blue"],
                        )}
                        style={{
                          height: `${slotData.rowSpan * 60 - 8}px`,
                        }}
                      >
                        <div className="font-semibold text-sm mb-1">{slotData.booking.playerName}</div>
                        <div className="text-xs opacity-90">
                          {slotData.booking.startTime} - {slotData.booking.endTime}
                        </div>
                      </div>
                    )}

                    {!isBooked && (
                      <button
                        onClick={() => handleSlotClick(pc, time)}
                        className={cn(
                          "w-full h-full hover:bg-accent/10 transition-colors",
                          selectedSlot?.pc === pc && selectedSlot?.time === time && "bg-accent/20",
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-4 p-4 bg-card border border-border rounded-lg">
          <p className="text-card-foreground">
            Selected: <span className="font-semibold">{selectedSlot.pc}</span> at{" "}
            <span className="font-semibold">{selectedSlot.time}</span>
          </p>
          <button
            onClick={() => setSelectedSlot(null)}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Book This Slot
          </button>
        </div>
      )}
    </div>
  )
}


export default BookingTwoPage