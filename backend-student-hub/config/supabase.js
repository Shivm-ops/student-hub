const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// In CI environments, Supabase creds are not available — server still starts
// so the health endpoint can be smoke-tested. Real DB calls will fail gracefully.
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    '⚠️  Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. ' +
    'DB operations will be unavailable. Set these in your .env file for full functionality.'
  );
}

// createClient requires non-empty strings — use safe placeholders for CI
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder_key'
);

module.exports = supabase;
