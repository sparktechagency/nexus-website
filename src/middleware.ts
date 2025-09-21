import { NextRequest, NextResponse } from "next/server";
 
export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;
    // console.log("Token from the middleware:", token);

 
    // Redirect user to Login page if token is undefined
    if(token && (role === "ADMIN")) {
       const response =  NextResponse.next();
        return response;
    } else {
         const logoutResponse = NextResponse.redirect(new URL('/dashboard-login', request.url));
        return logoutResponse;
    }
 
};
 
export const config = {
    matcher: [
        '/dashboard',
        '/dashboard/:path*',
    ],
}