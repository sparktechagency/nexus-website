import { NextRequest, NextResponse } from "next/server";
 
export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;
    // console.log("Token from the middleware:", token);

 
    // Redirect user to Login page if token is undefined
    if(!token) {
        const logoutResponse = NextResponse.redirect(new URL('/dashboard-login', request.url));
        return logoutResponse;
    } else {
        const response =  NextResponse.next();
        return response;
    }
 
};
 
export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
    ],
}