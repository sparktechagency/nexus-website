"use client"
import { useGetProfileApiQuery } from '@/redux/website/profile/profileApi'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import CustomModal from '../modal/customModal'
import SubscriptionModal from '../modal/subscriptionModal'


const CommonSubscription = () => {
    const [isSubscription, setIsSubscription] = useState(false)
    const modalVerify = cookies.get("subscription_status")

    useEffect(() => {
        if (modalVerify === "active") {
            setIsSubscription(false)
        } else {
            setIsSubscription(true)
        }
    }, [modalVerify])


    const { data: getProfile } = useGetProfileApiQuery(null)
    const profileData = getProfile?.data
    const subscriptionStatus = profileData?.subscription_status

    return (
        <>
            {/* modal component(RESCEDULE) */}
            {
                subscriptionStatus !== 'active' && <CustomModal
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
            }
        </>
    )
}

export default CommonSubscription
