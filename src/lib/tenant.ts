import { headers } from 'next/headers'
import { getTenant, Tenant } from './tenants'

export async function getCurrentTenant(): Promise<Tenant | null> {
  const headersList = await headers()
  const subdomain = headersList.get('x-subdomain')
  
  if (!subdomain) {
    return null
  }
  
  return await getTenant(subdomain)
}

export function getSubdomainFromHeaders(): string | null {
  // This is a client-side function that will be used in components
  if (typeof window === 'undefined') return null
  
  const hostname = window.location.hostname
  
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
