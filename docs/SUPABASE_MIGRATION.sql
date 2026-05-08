-- SQL migration to create leads table in Supabase
-- Run this in the Supabase SQL editor to set up the table

CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  company_name TEXT,
  role TEXT,
  team_size INTEGER,
  audit_id BIGINT NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
  total_savings INTEGER,
  annual_savings INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create index on audit_id for foreign key lookups
CREATE INDEX IF NOT EXISTS idx_leads_audit_id ON leads(audit_id);

-- Create trigger to update updated_at automatically
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_leads_updated_at();

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now, can be restricted later)
CREATE POLICY "Allow insert leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select own leads" ON leads
  FOR SELECT USING (true);
