import { Database } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Load environment variables first
require('dotenv').config();

type Profile = Database['public']['Tables']['profiles']['Row'];

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!
// const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY! // Instead of anon key
const supabase = createClient(supabaseUrl, supabaseKey)

describe('Supabase profiles table access', () => {
  it('accesses profiles table', async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);
    console.log('Query result:', { data, error }); // this will log the query result
    if (data && data.length > 0) {
      const profile = data[0] as Profile;
      expect(profile).toHaveProperty('id');
      expect(profile).toHaveProperty('user_id');
      expect(profile).toHaveProperty('display_name');
      expect(profile).toHaveProperty('created_at');
      expect(profile).toHaveProperty('updated_at');
    } else {
      console.log('No profiles found');
    }
  });
});
