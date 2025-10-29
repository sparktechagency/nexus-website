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
  const [isAddRoom, setIsAddRoom] = useState(false)
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
  const [gamerInfo, setGamerInfo] = useState()

  const timeLabels = [
    '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM',
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
    '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
  ];

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

  // Helper function to convert time to 24-hour format for comparison
  const convertTo24Hour = (timeStr: string): string => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours, 10) + 12);
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  // Helper function to check if a booking matches the current cell
  const getBookingForCell = (pcNumber: number, timeLabel: string) => {
    if (!providerListData || !providerListData.length) return null;

    const cellTime24 = convertTo24Hour(timeLabel);

    return providerListData.find(booking => {
      // Check if PC number matches
      if (booking.pc_no !== pcNumber) return false;

      // Check if the booking's starting time matches this cell's time
      const bookingStartTime24 = convertTo24Hour(booking.starting_time);

      return bookingStartTime24 === cellTime24;
    });
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const pcNo = colIndex + 1;
    const timeLabel = timeLabels[rowIndex];
    const booking = getBookingForCell(pcNo, timeLabel);

    if (booking) {
      // console.log(`Booking found:`, booking);
      // console.log(`User: ${booking.user.name}`);
      // console.log(`PC: ${booking.pc_no}`);
      // console.log(`Time: ${booking.starting_time} - ${booking.ending_time}`);
    } else {
      console.log(`No booking found for PC ${pcNo} at ${timeLabel}`);
    }
    setGamerInfo({
      booking_date: formattedDate,
      starting_time: timeLabel,
      pc_no: pcNo
    })

    setIsAddRoom(!isAddRoom)
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
            <div className="overflow-x-auto w-full max-h-[530px] custom-scrollbar">
              <table className="min-w-full">
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
                  {timeLabels.map((timeLabel, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="min-w-[150px] h-[80px] text-[10px] md:text-[14px] xl:text-[16px] px-1 xl:px-4 py-2 text-center border border-gray-800 text-gray-500 ">
                        {timeLabel}
                      </td>
                      {pcNumber && Array.from({ length: pcNumber.no_of_pc ?? 0 }, (_, colIndex) => {
                        const pcNo = colIndex + 1;
                        const booking = getBookingForCell(pcNo, timeLabel);

                        return (
                          <td
                            key={colIndex}
                            onClick={booking ?
                              () => handleModalOpen(booking.id, selectedStatus) :
                              () => handleCellClick(rowIndex, colIndex)
                            }
                            className={cn(
                              "px-1 xl:px-4  border border-gray-800 text-center min-w-[200px] transition-all duration-200 rounded",
                              booking ? `font-semibold cursor-pointer ${booking.duration === "1" ? 'bg-[#FFD6DD]' : 'bg-[#B9C8FF]'}` : "cursor-pointer"
                            )}
                          >
                            {booking ? (
                              <div className="flex flex-col items-center justify-center">
                                <span className="text-black text-sm font-bold">{booking.user.name}</span>
                                <span className="text-xs text-[#888888]">
                                  {booking.starting_time} - {booking.ending_time}
                                </span>
                                <span className="text-xs text-black opacity-55 mt-1">
                                  Duration: {booking.duration}hour
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm"></span>
                            )}
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
        open={isAddRoom}
        setIsOpen={setIsAddRoom}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <AddGamer
          open={isAddRoom}
          setIsOpen={setIsAddRoom}
          roomId={roomId}
          gamerInfo={gamerInfo}
        />
      </CustomModalTwo>




      {/* modal component(Gamer_Info_Pay_Complete) */}
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



      {/* modal component(Gamer_Info_con-booking ===== Details [STATUS----> UP_Coming ]) */}
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


      {/* modal component(gamer-info-con-reschedule) */}
      <CustomModal
        open={gamerInfoRescheduleModalOpen}
        setIsOpen={setGamerInfoRescheduleModalOpen}
        className={"p-4 max-h-[0vh]"}
        maxWidth={"md:!max-w-[40vw]"}
      >
        <GamerInfoConReschedule />
      </CustomModal>



      {/* modal component(REVIEW_RATING) */}
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




      {/* modal component(CancelTab_Modal) */}
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