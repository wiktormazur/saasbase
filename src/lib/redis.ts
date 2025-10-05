import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export type Tenant = {
  name: string
  emoji: string
  description: string
  createdAt: string
  updatedAt: string
}

export async function getTenant(subdomain: string): Promise<Tenant | null> {
  try {
    const tenant = await redis.get<Tenant>(`subdomain:${subdomain}`)
    return tenant
  } catch (error) {
    console.error('Error getting tenant:', error)
    return null
  }
}

export async function createTenant(subdomain: string, tenant: Omit<Tenant, 'createdAt' | 'updatedAt'>): Promise<Tenant | null> {
  try {
    const now = new Date().toISOString()
    const fullTenant: Tenant = {
      ...tenant,
      createdAt: now,
      updatedAt: now,
    }
    
    await redis.set(`subdomain:${subdomain}`, fullTenant)
    return fullTenant
  } catch (error) {
    console.error('Error creating tenant:', error)
    return null
  }
}

export async function updateTenant(subdomain: string, updates: Partial<Tenant>): Promise<Tenant | null> {
  try {
    const existing = await getTenant(subdomain)
    if (!existing) return null
    
    const updated: Tenant = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    await redis.set(`subdomain:${subdomain}`, updated)
    return updated
  } catch (error) {
    console.error('Error updating tenant:', error)
    return null
  }
}

export async function deleteTenant(subdomain: string): Promise<boolean> {
  try {
    await redis.del(`subdomain:${subdomain}`)
    return true
  } catch (error) {
    console.error('Error deleting tenant:', error)
    return false
  }
}

export async function getAllTenants(): Promise<Tenant[]> {
  try {
    const keys = await redis.keys('subdomain:*')
    const tenants: Tenant[] = []
    
    for (const key of keys) {
      const tenant = await redis.get<Tenant>(key)
      if (tenant) {
        tenants.push(tenant)
      }
    }
    
    return tenants.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error('Error getting all tenants:', error)
    return []
  }
}
