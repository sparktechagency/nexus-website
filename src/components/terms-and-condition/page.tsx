
"use client"

import React, { useEffect, useRef, useState } from "react";

const TermsAndCondition = () => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const MAX = 420;

        const check = () => setIsScrollable(el.scrollHeight > MAX);
        check(); // initial

        // update on content resize (works for dynamic content)
        const ro = new ResizeObserver(check);
        ro.observe(el);

        // also update on window resize
        window.addEventListener("resize", check);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", check);
        };
    }, []);

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

            <div className="text-[#fff] pb-4">
                <h1 className="text-center md:text-2xl font-semibold pb-4">Terms &amp; Conditions</h1>

                <div
                    ref={contentRef}
                    className={`${isScrollable ? "max-h-[420px] overflow-y-auto custom-scrollbar" : ""}`}
                >
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.25 1.5625H3.75C2.54188 1.5625 1.5625 2.54188 1.5625 3.75V26.25C1.5625 27.4581 2.54188 28.4375 3.75 28.4375H21.25C22.4581 28.4375 23.4375 27.4581 23.4375 26.25V3.75C23.4375 2.54188 22.4581 1.5625 21.25 1.5625Z" fill="#0DB561" />
                                <path d="M22.5 28.4375C25.7792 28.4375 28.4375 25.7792 28.4375 22.5C28.4375 19.2208 25.7792 16.5625 22.5 16.5625C19.2208 16.5625 16.5625 19.2208 16.5625 22.5C16.5625 25.7792 19.2208 28.4375 22.5 28.4375Z" fill="#FFCB27" />
                                <path d="M18.125 8.4375H6.875C6.62636 8.4375 6.3879 8.33873 6.21209 8.16291C6.03627 7.9871 5.9375 7.74864 5.9375 7.5C5.9375 7.25136 6.03627 7.0129 6.21209 6.83709C6.3879 6.66127 6.62636 6.5625 6.875 6.5625H18.125C18.3736 6.5625 18.6121 6.66127 18.7879 6.83709C18.9637 7.0129 19.0625 7.25136 19.0625 7.5C19.0625 7.74864 18.9637 7.9871 18.7879 8.16291C18.6121 8.33873 18.3736 8.4375 18.125 8.4375Z" fill="white" />
                                <path d="M18.125 13.4375H6.875C6.62636 13.4375 6.3879 13.3387 6.21209 13.1629C6.03627 12.9871 5.9375 12.7486 5.9375 12.5C5.9375 12.2514 6.03627 12.0129 6.21209 11.8371C6.3879 11.6613 6.62636 11.5625 6.875 11.5625H18.125C18.3736 11.5625 18.6121 11.6613 18.7879 11.8371C18.9637 12.0129 19.0625 12.2514 19.0625 12.5C19.0625 12.7486 18.9637 12.9871 18.7879 13.1629C18.6121 13.3387 18.3736 13.4375 18.125 13.4375Z" fill="white" />
                                <path d="M15 18.4375H6.875C6.62636 18.4375 6.3879 18.3387 6.21209 18.1629C6.03627 17.9871 5.9375 17.7486 5.9375 17.5C5.9375 17.2514 6.03627 17.0129 6.21209 16.8371C6.3879 16.6613 6.62636 16.5625 6.875 16.5625H15C15.2486 16.5625 15.4871 16.6613 15.6629 16.8371C15.8387 17.0129 15.9375 17.2514 15.9375 17.5C15.9375 17.7486 15.8387 17.9871 15.6629 18.1629C15.4871 18.3387 15.2486 18.4375 15 18.4375Z" fill="white" />
                                <path d="M13.75 23.4375H6.875C6.62636 23.4375 6.3879 23.3387 6.21209 23.1629C6.03627 22.9871 5.9375 22.7486 5.9375 22.5C5.9375 22.2514 6.03627 22.0129 6.21209 21.8371C6.3879 21.6613 6.62636 21.5625 6.875 21.5625H13.75C13.9986 21.5625 14.2371 21.6613 14.4129 21.8371C14.5887 22.0129 14.6875 22.2514 14.6875 22.5C14.6875 22.7486 14.5887 22.9871 14.4129 23.1629C14.2371 23.3387 13.9986 23.4375 13.75 23.4375Z" fill="white" />
                                <path d="M21.8751 24.6874C21.752 24.6876 21.63 24.6635 21.5163 24.6163C21.4025 24.5692 21.2992 24.5 21.2123 24.4128L19.9623 23.1628C19.8747 23.0758 19.8052 22.9725 19.7576 22.8586C19.7101 22.7447 19.6855 22.6226 19.6853 22.4992C19.6851 22.3758 19.7092 22.2536 19.7563 22.1396C19.8034 22.0255 19.8726 21.9219 19.9599 21.8347C20.0471 21.7474 20.1507 21.6783 20.2648 21.6311C20.3788 21.584 20.501 21.5599 20.6244 21.5601C20.7478 21.5603 20.8699 21.5849 20.9838 21.6325C21.0977 21.68 21.201 21.7495 21.288 21.8371L21.8751 22.4242L23.7123 20.5871C23.8883 20.4124 24.1264 20.3145 24.3744 20.3149C24.6224 20.3154 24.8602 20.4141 25.0355 20.5895C25.2109 20.7649 25.3097 21.0026 25.3101 21.2506C25.3106 21.4987 25.2127 21.7367 25.038 21.9128L22.538 24.4128C22.451 24.5 22.3477 24.5692 22.234 24.6163C22.1202 24.6635 21.9983 24.6876 21.8751 24.6874Z" fill="url(#paint0_linear_968_2482)" />
                                <path d="M22.5 28.4375H3.75C3.17006 28.4368 2.61407 28.2061 2.20398 27.796C1.7939 27.3859 1.5632 26.8299 1.5625 26.25V3.75C1.5632 3.17006 1.7939 2.61407 2.20398 2.20398C2.61407 1.7939 3.17006 1.5632 3.75 1.5625H21.25C21.8299 1.5632 22.3859 1.7939 22.796 2.20398C23.2061 2.61407 23.4368 3.17006 23.4375 3.75V15C23.4375 15.2486 23.3387 15.4871 23.1629 15.6629C22.9871 15.8387 22.7486 15.9375 22.5 15.9375C22.2514 15.9375 22.0129 15.8387 21.8371 15.6629C21.6613 15.4871 21.5625 15.2486 21.5625 15V3.75C21.5615 3.66742 21.5283 3.5885 21.4699 3.53011C21.4115 3.47171 21.3326 3.43847 21.25 3.4375H3.75C3.66742 3.43847 3.5885 3.47171 3.53011 3.53011C3.47171 3.5885 3.43847 3.66742 3.4375 3.75V26.25C3.43847 26.3326 3.47171 26.4115 3.53011 26.4699C3.5885 26.5283 3.66742 26.5615 3.75 26.5625H22.5C22.7486 26.5625 22.9871 26.6613 23.1629 26.8371C23.3387 27.0129 23.4375 27.2514 23.4375 27.5C23.4375 27.7486 23.3387 27.9871 23.1629 28.1629C22.9871 28.3387 22.7486 28.4375 22.5 28.4375Z" fill="#1A352B" />
                                <path d="M22.5 28.4375C22.2513 28.4375 22.0129 28.3387 21.8371 28.1629C21.6612 27.9871 21.5625 27.7486 21.5625 27.5C21.5625 27.2513 21.6612 27.0129 21.8371 26.837C22.0129 26.6612 22.2513 26.5625 22.5 26.5625C23.394 26.5623 24.2629 26.2671 24.9721 25.7228C25.6813 25.1785 26.1911 24.4154 26.4225 23.5519C26.6538 22.6884 26.5938 21.7726 26.2517 20.9467C25.9096 20.1207 25.3046 19.4307 24.5305 18.9836C23.7563 18.5365 22.8563 18.3573 21.9699 18.4738C21.0835 18.5903 20.2603 18.9959 19.628 19.6279C18.9957 20.2598 18.5895 21.0828 18.4724 21.9691C18.3554 22.8554 18.5341 23.7555 18.9807 24.53C19.1053 24.7453 19.1394 25.0012 19.0753 25.2416C19.0112 25.482 18.8542 25.6871 18.6389 25.8117C18.4236 25.9364 18.1676 25.9704 17.9273 25.9063C17.6869 25.8422 17.4818 25.6852 17.3572 25.47C16.7031 24.338 16.4409 23.0219 16.6111 21.7257C16.7813 20.4296 17.3745 19.2258 18.2987 18.3011C19.2228 17.3764 20.4262 16.7826 21.7223 16.6116C23.0184 16.4406 24.3346 16.702 25.4669 17.3554C26.5993 18.0088 27.4843 19.0175 27.9849 20.2252C28.4855 21.4329 28.5735 22.772 28.2354 24.0348C27.8973 25.2976 27.152 26.4136 26.115 27.2096C25.078 28.0057 23.8073 28.4372 22.5 28.4375Z" fill="#1A352B" />
                                <defs>
                                    <linearGradient id="paint0_linear_968_2482" x1="19.6853" y1="22.5012" x2="25.3101" y2="22.5012" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#6523E7" />
                                        <stop offset="0.5" stopColor="#023CE3" stopOpacity="0.8" />
                                        <stop offset="1" stopColor="#6523E7" />
                                    </linearGradient>
                                </defs>
                            </svg>

                        </div>
                        <span className="xl:text-xl font-medium">Updated July 17, 2025</span>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold mb-4">1. Using our service</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">2. Your account</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">3. Payment procedure</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>
                    </div>

                </div>
            </div>
        </>
    );
};

export default TermsAndCondition;



