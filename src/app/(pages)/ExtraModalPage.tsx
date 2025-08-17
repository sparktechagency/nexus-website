

const ExtraModalPage = () => {
    return (
        <div>

            <div>
                {/* all modal components */}

                {/* modal component(ADD_ROOM) */}
                <CustomModal
                    open={isAddRoom}
                    setIsOpen={setIsAddRoom}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[40vw]"}
                >
                    <AddGamer
                        open={isAddRoom}
                        setIsOpen={setIsAddRoom}
                    />
                </CustomModal>


                {/* modal component(Gamer_Info_Pay_Complete) */}
                <CustomModal
                    open={gamerInfoPayCompleteModalOpen}
                    setIsOpen={setGamerInfoPayCompleteModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[40vw]"}
                >
                    <GamerInfoPayComplete />
                </CustomModal>



                {/* modal component(Gamer_Info_con-booking) */}
                <CustomModal
                    open={gamerInfoConBookingModalOpen}
                    setIsOpen={setGamerInfoConBookingModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[40vw]"}
                >
                    <GamerInfoConBooking />
                </CustomModal>


                {/* modal component(gamer-info-con-reschedule) */}
                <CustomModal
                    open={gamerInfoRescheduleModalOpen}
                    setIsOpen={setGamerInfoRescheduleModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[40vw]"}
                >
                    <GamerInfoConReschedule />
                </CustomModal>


                {/* modal component(reschedule-update) */}
                <CustomModal
                    open={rescheduleUpdateModalOpen}
                    setIsOpen={setRescheduleUpdateModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[40vw]"}
                >
                    <RescheduleUpdate
                        open={rescheduleUpdateModalOpen}
                        setIsOpen={setRescheduleUpdateModalOpen}
                    />
                </CustomModal>



                {/* modal component(reschedule-update) */}
                <CustomModal
                    open={bookingConfirmationModalOpen}
                    setIsOpen={setBookingConfirmationModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[30vw]"}
                >
                    <BookingConfirmation
                        open={bookingConfirmationModalOpen}
                        setIsOpen={setBookingConfirmationModalOpen}
                    />
                </CustomModal>



                {/* modal component(reschedule-update) */}
                <CustomModal
                    open={gamerReviewRatingModalOpen}
                    setIsOpen={setGamerReviewRatingModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[45vw]"}>

                    <GamerInfoReviewRating
                        open={gamerReviewRatingModalOpen}
                        setIsOpen={setGamerReviewRatingModalOpen}
                    />
                </CustomModal>



                {/* modal component(CancelTab_Modal) */}
                <CustomModal
                    open={cancelTabModalModalOpen}
                    setIsOpen={setCancelTabModalModalOpen}
                    className={"p-4 max-h-[0vh]"}
                    maxWidth={"!max-w-[45vw]"}>

                    <CancelTabModal />
                </CustomModal>

            </div>
        </div>
    )
}

export default ExtraModalPage
