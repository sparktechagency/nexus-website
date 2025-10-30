"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAllRoomGetRoomApiQuery } from "@/redux/website/rooms/roomApi";
import { useGetBookingDetailsApiQuery, useGetProviderBookingListApiQuery } from "@/redux/website/booking/bookingApi";

interface BookingProps {
  id: number | string;
  name: string;
  no_of_pc?: number;
}

interface ProviderBookingProps {
  id: number | string;
  pc_no: number;
  starting_time: string;
  ending_time: string;
  duration: string;
  booking_date: string;
  status: string;
  user: { id: number | string; name: string };
}

import { Button } from "@/components/ui/button";
import CustomButtonLoader from "@/components/loader/CustomButtonLoader";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { DatePickerIcon } from "@/components/custom-icons";
import CustomModalTwo from "@/components/modal/customModalTwo";
import AddGamer from "@/components/modal/booking-section-modal/add-gamer";
import CustomModal from "@/components/modal/customModal";
import GamerInfoPayComplete from "@/components/modal/booking-section-modal/gamer-info-pay-complete";
import GamerInfoConBooking from "@/components/modal/booking-section-modal/gamer-info-con-booking";
import GamerInfoConReschedule from "@/components/modal/booking-section-modal/gamer-info-con-reschedule";
import GamerInfoReviewRating from "@/components/modal/booking-section-modal/gamer-info-review-rating";
import CancelTabModal from "@/components/modal/booking-section-modal/cancel-tab-modal";
import CommonSubscription from "@/components/commonSubscription/CommonSubscription";

const BookingPage = () => {
  const [isAddGamer, setIsAddGamer] = useState(false)
  const [gamerInfoPayCompleteModalOpen, setGamerInfoPayCompleteModalOpen] = useState(false)
  const [gamerInfoConBookingModalOpen, setGamerInfoConBookingModalOpen] = useState(false)
  const [gamerInfoRescheduleModalOpen, setGamerInfoRescheduleModalOpen] = useState(false)
  const [gamerReviewRatingModalOpen, setGamerReviewRatingModalOpen] = useState(false)
  const [cancelTabModalModalOpen, setCancelTabModalModalOpen] = useState(false)

  const [selectedGameType, setSelectedGameType] = useState<string>("");
  const [roomId, setRoomId] = useState<string | number>("");
  const [selectedStatus, setSelectedStatus] = useState("Ongoing");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [bookingId, setBookingId] = useState<string | number>('')
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gamerInfo, setGamerInfo] = useState<any>(null)
  
  // Drag state management
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<{rowIndex: number, colIndex: number} | null>(null);
  const [dragCurrentCell, setDragCurrentCell] = useState<{rowIndex: number, colIndex: number} | null>(null);
  const [dragDuration, setDragDuration] = useState<number>(0);

  // Generate time slots with 1-hour intervals for display
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date();
      time.setHours(hour, 0, 0, 0);

      // Format to "01:00 AM" format (WITH leading zeros)
      const formattedTime = time.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      // Create 24-hour format for calculations
      const time24 = `${hour.toString().padStart(2, '0')}:00`;

      slots.push({
        time24: time24,
        time12: formattedTime,
        hour,
        minute: 0,
        totalMinutes: hour * 60
      });
    }
    return slots;
  };

  const timeSlotsDetailed = generateTimeSlots();

  // Get initial date based on status
  const getInitialDate = (status: string): Date => {
    const today = new Date();
    if (status === "Ongoing") {
      return today;
    } else {
      // For Upcoming, Completed, Canceled - show tomorrow's date
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow;
    }
  };

  // Format to yyyy-mm-dd - FIXED VERSION (Timezone Safe)
  const formatDateToYYYYMMDD = (date: Date | null): string => {
    if (!date) {
      const today = new Date();
      return today.toISOString().split('T')[0];
    }

    // Use local date components to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // Format date to "October 29, 2025" format
  const formatDateToLongFormat = (date: Date | null): string => {
    if (!date) return "Select Date";

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formattedDate = formatDateToYYYYMMDD(startDate);

  // get room api
  const { data: getAllRoom } = useAllRoomGetRoomApiQuery({ skip: true });
  const allRoomData: BookingProps[] = getAllRoom?.data?.data;

  const { data: getProviderList, isLoading } = useGetProviderBookingListApiQuery({
    room_id: roomId,
    status: selectedStatus,
    date: formattedDate,
  });
  const providerListData: ProviderBookingProps[] = getProviderList?.data;

  // BOOKING DETAILS API
  const { data: getBookingDetails } = useGetBookingDetailsApiQuery(bookingId);
  const bookingDetails = getBookingDetails?.data

  const pcNumber = allRoomData?.find(item => item.id === roomId)

  useEffect(() => {
    if (allRoomData && allRoomData.length > 0) {
      setSelectedGameType(allRoomData[0]?.name);
      setRoomId(allRoomData[0]?.id);
    }
  }, [allRoomData]);

  // Update date when status changes
  useEffect(() => {
    setStartDate(getInitialDate(selectedStatus));
  }, [selectedStatus]);

  useEffect(() => {
    if (providerListData && providerListData.length > 0) {
      const timeData = providerListData?.map((item) => item.starting_time)
      setTimeSlots(timeData)
    } else {
      // Set default time slots even when no data
      setTimeSlots([]);
    }
  }, [providerListData]);

  // Date navigation functions - REMOVED RESTRICTIONS
  const navigateDate = (direction: 'prev' | 'next') => {
    setStartDate(prev => {
      if (!prev) return getInitialDate(selectedStatus);

      const newDate = new Date(prev);

      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  // Helper function to convert time string to minutes since midnight
  const convertTimeToMinutes = (timeStr: string): number => {
    let cleanTime = timeStr.trim();
    let hours = 0;
    let minutes = 0;

    if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
      const [timePart, modifier] = cleanTime.split(' ');
      const [h, m] = timePart.split(':').map(Number);

      hours = h;
      minutes = m || 0;

      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
    } else {
      const [h, m] = cleanTime.split(':').map(Number);
      hours = h;
      minutes = m;
    }

    return hours * 60 + minutes;
  };

  // NEW: Helper function to check if a time slot should show booking background
  const shouldShowBookingInSlot = (timeSlot: typeof timeSlotsDetailed[0], pcNo: number): { show: boolean; booking: ProviderBookingProps | null } => {
    if (!providerListData || !providerListData.length) {
      return { show: false, booking: null };
    }

    const booking = providerListData.find(b =>
      b.pc_no === pcNo &&
      convertTimeToMinutes(b.starting_time) <= timeSlot.totalMinutes + 60 && // booking ends after slot starts
      convertTimeToMinutes(b.ending_time) > timeSlot.totalMinutes // booking starts before slot ends
    );

    return {
      show: !!booking,
      booking: booking || null
    };
  };

  // NEW: Helper function to get booking display style for exact timing
  const getBookingDisplayStyle = (timeSlot: typeof timeSlotsDetailed[0], booking: ProviderBookingProps) => {
    const startMinutes = convertTimeToMinutes(booking.starting_time);
    const endMinutes = convertTimeToMinutes(booking.ending_time);
    const slotStartMinutes = timeSlot.totalMinutes;
    const slotEndMinutes = slotStartMinutes + 60;

    // Calculate exact overlap
    const overlapStart = Math.max(startMinutes, slotStartMinutes);
    const overlapEnd = Math.min(endMinutes, slotEndMinutes);
    const overlapMinutes = overlapEnd - overlapStart;

    // Calculate position and height percentages
    const positionPercentage = ((overlapStart - slotStartMinutes) / 60) * 100;
    const heightPercentage = (overlapMinutes / 60) * 100;

    return {
      top: `${positionPercentage}%`,
      height: `${heightPercentage}%`,
      isStart: startMinutes >= slotStartMinutes && startMinutes < slotEndMinutes,
      isEnd: endMinutes > slotStartMinutes && endMinutes <= slotEndMinutes,
      exactStartTime: booking.starting_time,
      exactEndTime: booking.ending_time
    };
  };

  // Helper function to get booking for a specific time cell
  const getBookingForCell = (pcNumber: number, timeSlot: typeof timeSlotsDetailed[0]): ProviderBookingProps | null => {
    if (!providerListData || !providerListData.length) return null;

    return providerListData.find(booking => {
      if (booking.pc_no !== pcNumber) return false;

      const startMinutes = convertTimeToMinutes(booking.starting_time);
      const endMinutes = convertTimeToMinutes(booking.ending_time);
      const slotStartMinutes = timeSlot.totalMinutes;
      const slotEndMinutes = slotStartMinutes + 60;

      return startMinutes < slotEndMinutes && endMinutes > slotStartMinutes;
    }) || null;
  };

  // Helper function to check if this is the first time slot of a booking
  const isFirstTimeSlotOfBooking = (timeSlot: typeof timeSlotsDetailed[0], booking: ProviderBookingProps): boolean => {
    const startMinutes = convertTimeToMinutes(booking.starting_time);
    const slotStartMinutes = timeSlot.totalMinutes;

    return startMinutes >= slotStartMinutes && startMinutes < slotStartMinutes + 60;
  };

  // Helper function to calculate booking duration in terms of table rows
  const getBookingRowSpan = (booking: ProviderBookingProps): number => {
    const startMinutes = convertTimeToMinutes(booking.starting_time);
    const endMinutes = convertTimeToMinutes(booking.ending_time);
    const durationMinutes = endMinutes - startMinutes;

    const rowSpan = Math.ceil(durationMinutes / 60);
    return Math.max(1, rowSpan);
  };

  // Check if current status allows adding gamers
  const canAddGamer = selectedStatus === "Ongoing" || selectedStatus === "Upcoming";

  // Drag handlers
  const handleDragStart = (rowIndex: number, colIndex: number) => {
    if (!canAddGamer) return;
    
    const pcNo = colIndex + 1;
    const timeSlot = timeSlotsDetailed[rowIndex];
    const booking = getBookingForCell(pcNo, timeSlot);

    // Only allow drag on empty cells
    if (!booking) {
      setIsDragging(true);
      setDragStartCell({ rowIndex, colIndex });
      setDragCurrentCell({ rowIndex, colIndex });
      setDragDuration(1); // Start with 1 hour
    }
  };

  const handleDragOver = (rowIndex: number, colIndex: number) => {
    if (!isDragging || !dragStartCell) return;
    
    // Only allow vertical dragging in the same column
    if (colIndex === dragStartCell.colIndex) {
      setDragCurrentCell({ rowIndex, colIndex });
      
      // Calculate duration based on row difference
      const startRow = dragStartCell.rowIndex;
      const endRow = rowIndex;
      const duration = Math.abs(endRow - startRow) + 1; // +1 because we include the start row
      setDragDuration(duration);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging || !dragStartCell || !dragCurrentCell) return;

    const startRow = dragStartCell.rowIndex;
    const endRow = dragCurrentCell.rowIndex;
    const colIndex = dragStartCell.colIndex;

    // Check if it's a valid drag (vertical movement only, same column)
    if (colIndex === dragCurrentCell.colIndex) {
      const pcNo = colIndex + 1;
      const startTimeSlot = timeSlotsDetailed[Math.min(startRow, endRow)];
      
      setGamerInfo({
        booking_date: formattedDate,
        starting_time: startTimeSlot.time12,
        pc_no: pcNo,
        duration: dragDuration.toString(),
        startRow: Math.min(startRow, endRow),
        endRow: Math.max(startRow, endRow)
      });
      
      setIsAddGamer(true);
    }

    // Reset drag state
    setIsDragging(false);
    setDragStartCell(null);
    setDragCurrentCell(null);
    setDragDuration(0);
  };

  // UPDATED: Handle cell click - now allows clicking on bookings in all statuses
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const pcNo = colIndex + 1;
    const timeSlot = timeSlotsDetailed[rowIndex];
    const booking = getBookingForCell(pcNo, timeSlot);

    if (booking) {
      console.log(`Booking found:`, booking);
      console.log(`User: ${booking.user.name}`);
      console.log(`PC: ${booking.pc_no}`);
      console.log(`Time: ${booking.starting_time} - ${booking.ending_time}`);
      handleModalOpen(booking.id, selectedStatus);
    } else {
      // শুধুমাত্র Ongoing এবং Upcoming স্ট্যাটাসে নতুন বুকিং এড করতে পারবে
      if (canAddGamer) {
        setGamerInfo({
          booking_date: formattedDate,
          starting_time: timeSlot.time12,
          pc_no: pcNo,
          duration: "1",
          startRow: rowIndex,
          endRow: rowIndex
        });
        setIsAddGamer(true);
      }
    }
  };

  // Get drag selection style
  const getDragSelectionStyle = (rowIndex: number, colIndex: number) => {
    if (!isDragging || !dragStartCell || !dragCurrentCell) return {};
    
    const startRow = Math.min(dragStartCell.rowIndex, dragCurrentCell.rowIndex);
    const endRow = Math.max(dragStartCell.rowIndex, dragCurrentCell.rowIndex);
    
    if (colIndex === dragStartCell.colIndex && rowIndex >= startRow && rowIndex <= endRow) {
      return {
        background: "#B9C8FF",
        position: "relative" as const
      };
    }
    
    return {};
  };

  // Get drag duration display
  const getDragDurationDisplay = (rowIndex: number, colIndex: number) => {
    if (!isDragging || !dragStartCell || !dragCurrentCell) return null;
    
    const startRow = Math.min(dragStartCell.rowIndex, dragCurrentCell.rowIndex);
    const endRow = Math.max(dragStartCell.rowIndex, dragCurrentCell.rowIndex);
    
    // Show duration only in the first cell of the selection
    // if (colIndex === dragStartCell.colIndex && rowIndex === startRow) {
    //   return (
    //     <div className="absolute inset-0 flex items-center justify-center">
    //       <span className="text-white font-bold text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
    //         {dragDuration} Hour{dragDuration > 1 ? 's' : ''}
    //       </span>
    //     </div>
    //   );
    // }
    
    return null;
  };

  // Date Picker Functions - REMOVED RESTRICTIONS
  const handleDateSelect = (date: Date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setStartDate(prev => {
      if (!prev) return getInitialDate(selectedStatus);

      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateYear = (direction: 'prev' | 'next') => {
    setStartDate(prev => {
      if (!prev) return getInitialDate(selectedStatus);

      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setFullYear(prev.getFullYear() - 1);
      } else {
        newDate.setFullYear(prev.getFullYear() + 1);
      }
      return newDate;
    });
  };

  // Render Date Picker
  const renderDatePicker = () => {
    if (!showDatePicker) return null;

    const currentDate = startDate || getInitialDate(selectedStatus);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Generate calendar days
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const isToday = new Date().toDateString() === dayDate.toDateString();
      const isSelected = startDate?.toDateString() === dayDate.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(dayDate)}
          className={cn(
            "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all cursor-pointer",
            isSelected
              ? "bg-gradient-to-r from-[#6523E7] to-[#023CE3] text-white font-bold"
              : isToday
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "text-gray-300 hover:bg-gray-700"
          )}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="absolute top-full left-0 mt-2 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 min-w-[270px]">
        {/* Month/Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateYear('prev')}
            className="p-1 hover:bg-gray-700 rounded cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-700 rounded cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 font-semibold">
            <span>{monthNames[month]}</span>
            <span>{year}</span>
          </div>

          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-700 rounded cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateYear('next')}
            className="p-1 hover:bg-gray-700 rounded cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs text-gray-400 font-medium w-8">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const handleModalOpen = (bookingSelectId: string | number, statusType: string) => {
    setBookingId(bookingSelectId)
    if (statusType === 'Ongoing') {
      setGamerInfoPayCompleteModalOpen(true)
    }
    else if (statusType === 'Upcoming') {
      setGamerInfoConBookingModalOpen(true)
    }
    else if (statusType === 'Completed') {
      setGamerReviewRatingModalOpen(true)
    }
    else if (statusType === 'Canceled') {
      setCancelTabModalModalOpen(true)
    }
  }

  // Track which bookings we've already rendered to avoid duplicates
  const renderedBookings = new Set();

  if (isLoading) {
    return <div className="h-[50vh] flex justify-center items-center"><CustomButtonLoader /></div>
  }

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6523E7, #023CE3, #6523E7);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #5a20cc, #022fb8, #5a20cc);
        }
        /* Firefox fallback */
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #6523E7 transparent; }
        
        .booking-cell {
          cursor: pointer !important;
          transition: all 0.2s ease;
        }
        
        .booking-cell:hover {
          background-color: rgba(185, 200, 255, 0.3) !important;
        }
        
        .regular-cell {
          cursor: ${canAddGamer ? 'pointer' : 'default'};
        }
        
        .disabled-cell {
          cursor: default !important;
        }
        
        .no-select {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>

      <div className="px-4 md:px-6 lg:px-8 mb-6 text-white h-full bg-gradient-to-r from-[#0f0829] via-black to-[#0f0829] rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 xl:items-center justify-between mb-6">
          <div>
            <h1 className="xl:text-2xl font-bold text-white mb-2">Ongoing Bookings of Your Gaming Zone</h1>
            <p className="text-gray-400 text-sm">You can update your room information from here & also can add a new room.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col xl:flex-row xl:justify-between pt-8 xl:pt-0">
          {/* Game Type Filters */}
          <div className="flex flex-wrap gap-3 mb-6 w-full xl:w-[50%]">
            {allRoomData?.map((item) => (
              <Button
                key={item.id}
                onClick={() => {
                  setSelectedGameType(item?.name);
                  setRoomId(item?.id);
                }}
                className={`${selectedGameType === item?.name
                  ? "bg-white font-bold border border-gray-600 rounded-full cursor-pointer py-4 px-6 "
                  : "bg-transparent border border-gray-600 text-gray-400 rounded-full cursor-pointer py-4 px-6 "
                  }`}
              >
                <span
                  className={`${selectedGameType === item?.name
                    ? "bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] bg-clip-text text-transparent"
                    : ""
                    }`}
                >
                  {item?.name?.toUpperCase()}
                </span>
              </Button>
            ))}
          </div>

          {/* Status Tabs and Date Picker */}
          <div className="flex flex-wrap items-center gap-8 mb-6">
            {(["Ongoing", "Upcoming", "Completed", "Canceled"]).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={cn(
                  "px-1 text-sm font-medium transition-colors cursor-pointer relative",
                  selectedStatus === status
                    ? "cursor-pointer bg-gradient-to-r from-[#6523E7] via-[#023CE3] to-[#6523E7] inline-block text-transparent bg-clip-text underline underline-offset-8 decoration-[#6523E7]"
                    : "text-[##C2C2C2]"
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}

            {/* Custom Date Picker */}
            {selectedStatus === "Ongoing" ? "" : (
              <div className="relative">
                <div className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    background: "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                  }}
                >
                  <button
                    onClick={() => navigateDate('prev')}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="min-w-[180px] text-center font-medium flex items-center gap-3 py-1">
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <DatePickerIcon className="cursor-pointer" />
                      {formatDateToLongFormat(startDate)}
                    </button>
                  </span>

                  <button
                    onClick={() => navigateDate('next')}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Date Picker Dropdown */}
                {showDatePicker && (
                  <div className="absolute top-full left-0 z-50">
                    {renderDatePicker()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>


        {/* Main Content - Table Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 mt-8">
            <div className="overflow-x-auto w-full max-h-[630px] custom-scrollbar">
              <table className="min-w-full border-collapse no-select">
                <thead>
                  <tr>
                    <th className="text-[14px] md:text-[16px] px-2 md:px-4 py-4 border border-gray-800">Time</th>
                    {pcNumber && Array.from({ length: pcNumber.no_of_pc ?? 0 }, (_, index) => (
                      <th key={index} className="min-w-[200px] text-[14px] md:text-[16px] px-2 md:px-4 md:py-2 border border-gray-800">
                        PC {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {timeSlotsDetailed.map((timeSlot, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="min-w-[150px] h-[60px] text-[10px] md:text-[14px] xl:text-[16px] px-1 xl:px-4 py-2 text-center border border-gray-800 regular-cell">
                        {timeSlot.time12}
                      </td>
                      {pcNumber && Array.from({ length: pcNumber.no_of_pc ?? 0 }, (_, colIndex) => {
                        const pcNo = colIndex + 1;
                        const { show: shouldShow, booking } = shouldShowBookingInSlot(timeSlot, pcNo);
                        const isFirstSlot = booking ? isFirstTimeSlotOfBooking(timeSlot, booking) : false;
                        const isInteractive = booking || canAddGamer;
                        const displayStyle = booking ? getBookingDisplayStyle(timeSlot, booking) : null;

                        // Skip rendering if this booking was already rendered in a previous row
                        const bookingKey = `${booking?.id}-${pcNo}`;
                        if (booking && renderedBookings.has(bookingKey) && !isFirstSlot) {
                          return null;
                        }

                        if (booking && isFirstSlot) {
                          renderedBookings.add(bookingKey);
                        }

                        return (
                          <td
                            key={colIndex}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            onMouseDown={() => canAddGamer && handleDragStart(rowIndex, colIndex)}
                            onMouseEnter={() => isDragging && handleDragOver(rowIndex, colIndex)}
                            onMouseUp={handleDragEnd}
                            className={cn(
                              "px-1 xl:px-4 border border-gray-800 text-center min-w-[200px] transition-all duration-200 h-[60px] relative select-none",
                              booking ? "booking-cell" : "regular-cell",
                              isInteractive ? "cursor-pointer " : "disabled-cell cursor-default"
                            )}
                            style={getDragSelectionStyle(rowIndex, colIndex)}
                            rowSpan={booking && isFirstSlot ? getBookingRowSpan(booking) : 1}
                          >
                            {booking && shouldShow && (
                              <div
                                className="absolute left-0 right-0 bg-[#B9C8FF] border border-[#B9C8FF] rounded flex flex-col justify-center p-1"
                                style={{
                                  top: displayStyle?.top || '0%',
                                  height: displayStyle?.height || '100%',
                                  zIndex: 10
                                }}
                              >
                                {isFirstSlot && (
                                  <>
                                    <div className="font-bold text-[12px] truncate text-black">
                                      {booking.user.name}
                                    </div>
                                    <div className="text-gray-500 text-[10px] truncate">
                                      {booking.starting_time} - {booking.ending_time}
                                    </div>
                                    <div className="text-black text-[9px]">
                                      Duration: {booking.duration}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            {/* Drag duration display */}
                            {getDragDurationDisplay(rowIndex, colIndex)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal component(ADD_Gamer) */}
      <CustomModalTwo
        open={isAddGamer}
        setIsOpen={setIsAddGamer}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[35vw]"}
      >
        <AddGamer
          open={isAddGamer}
          setIsOpen={setIsAddGamer}
          roomId={roomId}
          gamerInfo={gamerInfo}
        />
      </CustomModalTwo>

      {/* Other modals remain the same */}
      <CustomModal
        open={gamerInfoPayCompleteModalOpen}
        setIsOpen={setGamerInfoPayCompleteModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoPayComplete
          open={gamerInfoPayCompleteModalOpen}
          setIsOpen={setGamerInfoPayCompleteModalOpen}
          bookingId={bookingId}
        />
      </CustomModal>

      <CustomModal
        open={gamerInfoConBookingModalOpen}
        setIsOpen={setGamerInfoConBookingModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoConBooking
          bookingDetails={bookingDetails}
          bookingId={bookingId}
          roomId={roomId}
        />
      </CustomModal>

      <CustomModal
        open={gamerReviewRatingModalOpen}
        setIsOpen={setGamerReviewRatingModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"!max-w-[45vw]"}>

        <GamerInfoReviewRating
          open={gamerReviewRatingModalOpen}
          setIsOpen={setGamerReviewRatingModalOpen}
          bookingDetails={bookingDetails}
        />
      </CustomModal>

      <CustomModal
        open={cancelTabModalModalOpen}
        setIsOpen={setCancelTabModalModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"!max-w-[45vw]"}>

        <CancelTabModal
          open={cancelTabModalModalOpen}
          setIsOpen={setCancelTabModalModalOpen}
          bookingId={bookingId}
        />
      </CustomModal>

      {/* SUBSCRIPTION COMPONENT MODAL */}
      <CommonSubscription />
    </>
  );
};

export default BookingPage;