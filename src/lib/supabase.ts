import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xyqqvxtfmycwzivrmnii.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5cXF2eHRmbXljd3ppdnJtbmlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDgyNTc0MSwiZXhwIjoxOTk2NDAxNzQxfQ.wokBOXbKiBzTC35yYLndLFxX6-mHGseLVB0m3fVbnIU";

export const supabase = createClient(supabaseUrl, supabaseKey);