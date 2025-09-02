"use client"

import React, { useEffect, useRef, useState } from "react";

const PrivacyPolicy = () => {
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
                <h1 className="text-center md:text-2xl font-semibold pb-4">Privacy Policy</h1>

                <div
                    ref={contentRef}
                    className={`${isScrollable ? "max-h-[420px] overflow-y-auto custom-scrollbar" : ""}`}
                >
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
                            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.3335 1.22485C20.1605 1.04882 19.9543 0.908831 19.7269 0.812995C19.4995 0.717158 19.2553 0.667373 19.0085 0.666521H4.59183C4.34103 0.665446 4.09252 0.714255 3.86076 0.810107C3.629 0.90596 3.41861 1.04694 3.24183 1.22485C2.51683 1.94152 1.27517 3.16652 0.550167 3.92485C0.197449 4.28229 -0.000166794 4.76435 0.00016695 5.26652V25.4249C-0.00317293 25.6757 0.0436293 25.9247 0.137826 26.1571C0.232023 26.3896 0.371716 26.601 0.548705 26.7787C0.725694 26.9565 0.936412 27.0971 1.16849 27.1923C1.40057 27.2875 1.64933 27.3354 1.90017 27.3332H18.5668L17.8335 26.9832C16.9871 26.5666 16.2759 25.9191 15.7819 25.1154C15.2879 24.3118 15.0313 23.3848 15.0418 22.4415V17.9082C15.0435 17.7418 15.1037 17.5812 15.2119 17.4547C15.3201 17.3283 15.4693 17.2439 15.6335 17.2165C17.157 16.9536 18.5898 16.3117 19.8002 15.3499C19.9207 15.2605 20.0668 15.2123 20.2168 15.2123C20.3669 15.2123 20.5129 15.2605 20.6335 15.3499L20.8835 15.5332V2.57485C20.8866 2.32451 20.8395 2.07608 20.7451 1.84422C20.6506 1.61236 20.5107 1.40176 20.3335 1.22485ZM7.60017 5.66652H13.3002C13.4759 5.68555 13.6383 5.76881 13.7563 5.90032C13.8744 6.03183 13.9397 6.20231 13.9397 6.37902C13.9397 6.55573 13.8744 6.72621 13.7563 6.85772C13.6383 6.98923 13.4759 7.07249 13.3002 7.09152H7.60017C7.42448 7.07249 7.26202 6.98923 7.14399 6.85772C7.02595 6.72621 6.96067 6.55573 6.96067 6.37902C6.96067 6.20231 7.02595 6.03183 7.14399 5.90032C7.26202 5.76881 7.42448 5.68555 7.60017 5.66652ZM11.4002 21.3832H4.7335C4.55782 21.3642 4.39536 21.2809 4.27732 21.1494C4.15929 21.0179 4.094 20.8474 4.094 20.6707C4.094 20.494 4.15929 20.3235 4.27732 20.192C4.39536 20.0605 4.55782 19.9772 4.7335 19.9582H11.4002C11.5759 19.9772 11.7383 20.0605 11.8563 20.192C11.9744 20.3235 12.0397 20.494 12.0397 20.6707C12.0397 20.8474 11.9744 21.0179 11.8563 21.1494C11.7383 21.2809 11.5759 21.3642 11.4002 21.3832ZM11.4002 16.6249H4.7335C4.55782 16.6058 4.39536 16.5226 4.27732 16.3911C4.15929 16.2595 4.094 16.0891 4.094 15.9124C4.094 15.7356 4.15929 15.5652 4.27732 15.4337C4.39536 15.3021 4.55782 15.2189 4.7335 15.1999H11.4002C11.5759 15.2189 11.7383 15.3021 11.8563 15.4337C11.9744 15.5652 12.0397 15.7356 12.0397 15.9124C12.0397 16.0891 11.9744 16.2595 11.8563 16.3911C11.7383 16.5226 11.5759 16.6058 11.4002 16.6249ZM16.1668 11.8582H4.75017C4.57448 11.8392 4.41202 11.7559 4.29399 11.6244C4.17595 11.4929 4.11067 11.3224 4.11067 11.1457C4.11067 10.969 4.17595 10.7985 4.29399 10.667C4.41202 10.5355 4.57448 10.4522 4.75017 10.4332H16.1668C16.3425 10.4522 16.505 10.5355 16.623 10.667C16.741 10.7985 16.8063 10.969 16.8063 11.1457C16.8063 11.3224 16.741 11.4929 16.623 11.6244C16.505 11.7559 16.3425 11.8392 16.1668 11.8582Z" fill="#43D685" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M24.0004 18.508V22.4413C24.0004 23.1118 23.8132 23.7689 23.4598 24.3387C23.1065 24.9085 22.601 25.3683 22.0004 25.6663L20.2171 26.4996L18.4337 25.6663C17.8333 25.3616 17.3301 24.8949 16.9811 24.3191C16.6321 23.7433 16.4511 23.0813 16.4587 22.408V18.508C17.8353 18.2642 19.133 17.6925 20.2421 16.8413C20.4587 16.9913 20.6754 17.133 20.9087 17.283C21.8492 17.8897 22.8996 18.3059 24.0004 18.508Z" fill="url(#paint0_linear_968_2514)" />
                                <defs>
                                    <linearGradient id="paint0_linear_968_2514" x1="16.4585" y1="21.6705" x2="24.0004" y2="21.6705" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#6523E7" />
                                        <stop offset="0.5" stopColor="#023CE3" stopOpacity="0.8" />
                                        <stop offset="1" stopColor="#6523E7" />
                                    </linearGradient>
                                </defs>
                            </svg>


                        </div>
                        <span className="xl:text-[21px] font-medium">Updated July 17, 2025</span>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold mb-4">1. Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">2. Information We Collect</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">3. Data Security</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>
                    </div>
                    
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-lg font-semibold mb-4">1. Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">2. Information We Collect</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Volutpat purus nunc tellus lorem adipiscing. Convallis at mi
                                dictumst nulla amet. Ipsum consequat vel donec ut amet ante semper. Amet tempus tellus aliquam volutpat
                                enim dolor tristique.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">3. Data Security</h2>
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
    )
}

export default PrivacyPolicy
