"use client"

import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function RescedulePage() {
    const router = useRouter()



    const handleBackClick = () => {
        router.push("/home?showSubscription=true")
    }



    return (
        <div className=" text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <svg
                        onClick={handleBackClick}
                        className="cursor-pointer"
                        width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 30L0 15L15 0L17.6625 2.6625L5.325 15L17.6625 27.3375L15 30Z" fill="white" />
                    </svg>

                    <h1 className="text-xl font-medium">Subscription Plan</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Premium Plan Card */}
                    <div className="bg-amber-100 rounded-3xl p-8 text-slate-900">
                        <div className="flex justify-center mb-4">
                            <Crown className="w-12 h-12 text-yellow-500" />
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Premium Plan</h2>
                            <p className="text-lg font-medium">$5643.00/monthly</p>
                        </div>

                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Unlimited bookings.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Priority placement.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Featured venue badges.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span>Priority support.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 flex-shrink-0"></div>
                                <span>First access to beta features.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Add Card Form */}
                    <div className="space-y-6 bg-[#5E5E5E33]  p-4 rounded-2xl">
                        <h2 className="text-xl font-medium">Add card</h2>

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="card-info" className="text-sm text-slate-400 mb-2 block">
                                    Card information
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="card-info"
                                        placeholder="Card information"
                                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg h-12"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <rect width="22" height="14" fill="url(#pattern0_968_4367)" />
                                            <defs>
                                                <pattern id="pattern0_968_4367" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                    <use xlinkHref="#image0_968_4367" transform="matrix(0.0078125 0 0 0.0123457 0 -0.296296)" />
                                                </pattern>
                                                <image id="image0_968_4367" width="128" height="128" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAANAklEQVR4Ae1dCZAdRRn+I7GEKFHE+yhRUx6xVCKKlEoZr2Ak2enZ1MYSUdFQ8QC8oAKIgRW1tIAEcuz235sEItmXREow4lFg1GghFB5ErAiELQgVIeCVgCH7EpK4z/p73szOvOnp7veSd+yrf6pezUwf//H1N/N6ev7uAeCNEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBgBRoARYAS6C4FQvgSEnAcCL4AAL+bfhMbgIgjw09CD7wSoTLITdZ56EwjcBAIPg8AnQeA2EOrP/JvoGODfQeAYCHwEhDzHTISewR4QuA8E/hKCwdOhv/9ZdrZw7oRCYI58JQjZX23jjTB7+XPG7Q+G3gMCD0CIl5vZMV6UjyY4Aj2DbwMhd4FQayJP+m46BgTeN54wwR1k890ICHmq/psPhj4MEOBcEDgKfde/2F2TS3QNAkKuBYG3A4QKdcevazxjR7wQEGoWCHwGQMjNEKjveFXiQt2DQK96OQisAAi8Wz/nd49r7IkPAnPVFCaAD1DdWoYJ0K0t6+kXE8ATqG4txgTo1pb19IsJ4AlUtxZjAnRry3r6xQTwBKpbizEBurVlPf1iAngC1a3FmADd2rKefjEBPIHq1mJMgG5tWU+/mACeQHVrMSZAt7asp19MAE+gbMUonG6heratSMfm1UuA0WE4r1yCi+v+DcNX95XgjMoWmNwQGKGc45yXEA69PyPbOZ9BnZUp7zoJV54IofwkCLwWBN4BQodZ79Xv0ymogiJrAnwChLxTx1YKXAC9g69ziTXmUzS2DtJVC61+HynxGiDAnP0lUOX18Fi5BJUGfg8eKEF9oMzsnwwCH08BTWAbfvLUBMxZNz4XBP7PXC6pe0NS3nYQ4kdA4I91Axv1JvIMNlFeHHlrU5LKm7vqtSBwq8P2SJee6JGqW+9hvQSI5VcqMGl0A8wol2BJuQR76iHCaAluj+V47QMZeoBxV0ZW79C7nHUCvChTp/akZ2AaCPypU46LFAGurBVdeB5FZ99Th84LCmX5ZDRKgLTsioIp+0uwoLwe7vUkwtjoBnhFWob1OMCfeQDyiYyMAD/rrBPiRzN10ieh/CAIfMopw9X4lB/iF9Kircc0Y8dHZlJGlqzyXJlHgwCxDrorlEvQt2fd5F0uIoyWIIjrWfe9q15VnaJWcHulW6zcleuECXmNE8hg4NVG3QF+rPHbveHvgGZY+W4C73XanTS+1vWwr2hjuaNJgFjB1PnLhq/q/9DI6PCkZ4qIMDoMfhHIQi12A6IWx7qTvcDbHPWeMs5+6ln1UhD4D0ddCxkNBOhb/cLELtsBTdDINq6fnr6Bl9nEWvOaQYBqT7ky/TOLD+xcc/zjJhL49QMqk0DgQw5QDgA1Wu0m8FF7PXlnbRV9LtSN9npJAx8CIf9Y7RwqiOpRf+HB7B1L7jLqMSUK/Lmn7iwxQvS7m5p0NoUAc9WL4h74lHnLK7cunT5iIMFu+ssw2ZSkRZMWss7mrhC5NikfH/Sp51dnwdrqqrh4sqfHvAD3ezSCAppkWbTRtPpAnQu67yJ/UVQskx4OvSHGzEN/1q9Afi8jq56TphCADBD4p7Qj37181kO1JDiwDqZZbRX4w7QM8/HgKTkZvfK95rLJ1VuBUH05V0/g2e56eEuuni2hb+lxtuwkL0Dp1J0jf+LPlkROvQdNIwDNMqox+LJvzNlRLsFYQoT1kO25p42nq5FmKtfIyJwH+Pt0leQ4kJ/PlDPJoF5+7Uazok1l02khfr222hGfUx8hmpKfvbLH9d7t6JTuAxoraWRrHgEGTzeBee2VM9N3gqWFNhPQ4wCYgQnw48b6Apc765r7DQPOerRYxpmDJxj1Npoo8FK7Xno01P0NMw6EU4+c0ZD6phEgGr3LPUdPCmVl87JpD1TvAncUGq2nqie3OIPjhke/WJjAX9sBxX/HRTP7aOEEg66cHduAplYfjY2GckN8zGLv09A38DwQaoWlDI02frEhc5pGALJG4M0mo4/tXVF5Yu1xO8sl2Fe5CY7JGR4tVGFviFBelqsXJwj8p0lvKs38nxnIM1Jl7Pr1MDNNrVavj9U2tA/UWVadIV6v5br6JyH+oCH9zSWAWljk3GnnLqLh48P7huGtOcPJadvtn3rqResYRE8gjsZTK3I6KSEahn3Yqjtv1yHQ9jZIBIF/sOqji4G2aFja5teI0SdXYlMJ0LvyNTbnNl494680hJyxsWfN8SDwaVs968uVHvUBe13H0Gx0F6CFlGxgm/IOgcDrgOz33WiE0K5n+/hgFY2JyH9Zyo8Bkb/erakEIGMCfKDI6Kl91x0cWXNC9nncpwdv6/AIeX6RviQ9VO+z4iTwK0lZewOZiPAI9Kp3WOXHmSHeYtejLoyL6r3rxVSvOjNT3uek6QSgq8IC4qJLRHagpGb8IFc3xN9Z/fJ5nvYZmqU19fwGhUwkGAUhZ1rtFPKk7Ihh7o5zCGqHeAV+M4dHFttvW3WaMptOAHrjljUyA9iJ86/eM/Oc/mO1bSG+3VZW54Wqz+RHkhYFamR0ZGRSj9t3CwfeXA38KJZX7Nt/rcEgjgsDhPpRzkz3u4Jf5eq4EppOABoJE1jONEItaIF6t7bT9ahDjeeKgBG426pLL4jkQqUmP1pAq963dBU9FFwjSp/OXj7V/ap5aHauatQ/osU7iwi5V3dkcxUtCU0nAOmmRSeLjabXuedDRJQ91nKhusTiCujxeaseDdwSq4yiTArREnI+hPg3q41Z/WPGx0ShLnTIeLSwIfWqrYUEqECg8k9VRT5RemsI4HKYnqflpxyglIGGh22bz3N8KD9nE+HMIyKE6jy9pF62sYuuyuxTTvSoucPuq7yy0I5QrrLXVQsL65oyWkKAuUNvsRtNC1TK31rLkOOuzWf4+GiN4PUOnubXSVRXZMymPowfcYoIZU+PB44ySi0nLSEA6Y8iaIuMp+BN+7M3dRBdGwVf2sEdq+s53akP1zv0UThY9uWRwLucdew+FGFYTVf3u8zO5LeQAKuPwHHz0G3GE00y+6iawB21VaJz1/Lp5lrVIBB7g4TYm9SmCN4jalzLf/+43DHwecyNjWoZAY7k1pcGMTY8t9fRQ+kYfVPD3JqrFg0d3wcBfgnEDS/I5Rcl0GCU6+lG39XkSYkIgRtbQAC66xQHuybGVA9aRgACVyANl5oaxpa20+tddxRLb5NTAVPkDA3YxDZFAz+bdBSvGDwl93dBj6DRVbzEsxM4fufSy7TjwURXrLMpe9lf286F5y0jAFnQ0P+fXFRofDqDZg65wTw7XUUfRz16G3Ho2wm7oxk/jn5KrX4aP4i3AK/ysM9mRz15t8VqnfvWEkBdUScIo85Hv9hDGiOobYDc+dDJcfFk7zN0nJPjcxdLzQaKZinZxziofxLi971+AukOZCPEk94f+mgpAWjEz2541ilawdx3E7jOIfuwHmyqlecaOq7H3rhsiL/RQRyxLp8XVIH8Wlzca68/+2IhQYDTveS0lADRIMh/HA01TgL6qoXvJvAvDrnbjaIEuq7McXviBrbv12c/w6I7p9sdth0sjG8wGq3/Tu2PoL4DXi0lADnj3xP2f7EREcv+vsH0ciXqmNXbwEXlR8D0oir6BlNRnTj95qJ2LkynqGYbEQMcKqybzmg5AXzm7JFj9Ux2iGLqYzDN+wC/lfZbH+t4POo86skgjokkxtttGQK1Aeg9fFFUrsAt1obSvso5OdtcCe7Jr9tcInR+ywlAb8LotabrR1e170ZRui55tokcsR6aK0iNSQEhgVwGUb9ik/6Yho5vpJFGPedwgY7Cdb2ZjOb4u30tIk9sl2lPum0+m8LeTXJaTgCTEZzWPgSYAO3DviM0MwE6ohnaZwQToH3Yd4RmJkBHNEP7jGACtA/7jtDMBOiIZmifEUyA9mHfEZqZAB3RDO0zggnQPuw7QjMToCOaoX1GMAHah31HaGYCdEQztM8IJkD7sO8IzUyAjmiG9hmRIgDNWLm0fZaw5rYgEM04rgCE6if6QwhtsYKVtg2BeO0hiJZIu6dthrDi9iBAwaO0ODZQGDEtfeZaP6c9ZrLWZiCg1zzArZB80EIHR6r7gRZb5q37EaC1FgXuhZ4V1Y93UMBmtALGVuv6Nt0PTXd7SAGlQl6pF6miz/FkNr1Is9xcXah5Nejv9QydrAlBX8Di38TEoGfwjUBfVYum0I0ATYih+ZSFGzV89K0ex6KNxnh5c2y+bSID57UCs8P6Dk9zJOpZQ0BPk6bYe/5NbAzqmWtReGfgDEaAEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBgBRoARYAQYAUaAEWAEGAFGgBFgBBiBDkTg/7KDFgYKlKG3AAAAAElFTkSuQmCC" />
                                            </defs>
                                        </svg>

                                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <rect width="22" height="14" fill="url(#pattern0_968_4368)" />
                                            <defs>
                                                <pattern id="pattern0_968_4368" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                    <use xlinkHref="#image0_968_4368" transform="matrix(0.0078125 0 0 0.0121951 0 -0.304878)" />
                                                </pattern>
                                                <image id="image0_968_4368" width="128" height="128" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
                                            </defs>
                                        </svg>

                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="MM/YY"
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg h-12"
                                />
                                <Input
                                    placeholder="CVC"
                                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg h-12"
                                />
                            </div>

                            <div>
                                <Label className="text-sm text-slate-400 mb-2 block">Billing address</Label>
                                <Select>
                                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white rounded-lg h-12">
                                        <SelectValue placeholder="Country or region" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Input
                                placeholder="ZIP"
                                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 rounded-lg h-12"
                            />

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="save-card"
                                    className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor="save-card" className="text-sm text-slate-300">
                                    Save this card for future payment
                                </Label>
                            </div>
                        </div>

                        <Link href='/home'>
                            <Button className="w-full py-6 rounded-full cursor-pointer text-white font-semibold transition-all duration-200"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #6523E7 0%, #023CE3 80%, #6523E7 100%)",
                                }}>

                                Pay
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>



        </div>
    )
}
