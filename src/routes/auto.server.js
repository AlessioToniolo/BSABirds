import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

/** @type {import('./$types').RequestHandler} */
export async function post({params}) {
    const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY);
    const { error } = await supabase
        .from('birds')
        .select()
    if (error) throw new Error(error.message)
  
    console.log(error);
    
    res.status(200).json({ text: 'Hello' });
}