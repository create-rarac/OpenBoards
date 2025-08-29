import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pgyxmcvdkcmsabutgsys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBneXhtY3Zka2Ntc2FidXRnc3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0OTM3NjYsImV4cCI6MjA3MjA2OTc2Nn0.OLkHSpYJohyrUxM8lGbv7pGFqnsJ-SCizFE4cRjzNTo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);