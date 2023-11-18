import { createClient } from '@supabase/supabase-js'

const URL = 'https://obdxnsmhaqgqtapxorib.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZHhuc21oYXFncXRhcHhvcmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4OTM2NzIsImV4cCI6MjAxNTQ2OTY3Mn0._ntSnqO4dOT2c2Fl6gyFtdSBhQfue6Ha5w9ds_D24vo';

export const supabase = createClient(URL, API_KEY);
