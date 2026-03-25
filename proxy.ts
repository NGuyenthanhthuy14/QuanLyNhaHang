import { NextResponse, NextRequest } from 'next/server'

const privatePath = ["/manage"]
const unAuthPaths = ["/login"]
 
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
	const isAuth = Boolean(request.cookies.get("accessToken"))
	// chưa đăng nhập thì k cho vào private path
	if (privatePath.some(path => pathname.startsWith(path)) && !isAuth) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	// đã đăng nhập thì k cho vào login page
	if (unAuthPaths.some(path => pathname.startsWith(path)) && isAuth) { 
		return NextResponse.redirect(new URL('/', request.url))
	}
	return NextResponse.next()
}
 
export const config = {
  matcher: ['/manage/:path*', '/login'],
} 