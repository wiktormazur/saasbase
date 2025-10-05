import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

function getSubdomain(hostname: string): string | null {
  // For localhost development
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.')
    if (parts.length > 1 && parts[0] !== 'localhost') {
      return parts[0]
    }
    return null
  }
  
  // For production domains
  const parts = hostname.split('.')
  if (parts.length >= 3) {
    return parts[0]
  }
  
  return null
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const subdomain = getSubdomain(hostname)
  
  // Handle admin routes - always allow access to admin panel
  if (url.pathname.startsWith('/admin')) {
    return await updateSession(request)
  }
  
  // Handle subdomain routing
  if (subdomain && subdomain !== 'www') {
    // Add subdomain to headers for use in components
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-subdomain', subdomain)
    
    // For tenant subdomains, we don't need Supabase auth middleware
    // as each tenant will handle their own authentication
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
  
  // For main domain, use Supabase auth middleware
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
