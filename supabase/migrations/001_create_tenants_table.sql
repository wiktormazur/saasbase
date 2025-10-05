-- Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subdomain TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '🏢',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Create RLS policies
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read tenants (for multi-tenant apps)
CREATE POLICY "Allow authenticated users to read tenants" ON public.tenants
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all authenticated users to create tenants (admin functionality)
CREATE POLICY "Allow authenticated users to create tenants" ON public.tenants
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow all authenticated users to update tenants (admin functionality)
CREATE POLICY "Allow authenticated users to update tenants" ON public.tenants
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow all authenticated users to delete tenants (admin functionality)
CREATE POLICY "Allow authenticated users to delete tenants" ON public.tenants
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for subdomain lookups
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON public.tenants(subdomain);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_tenants_updated_at 
    BEFORE UPDATE ON public.tenants 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
