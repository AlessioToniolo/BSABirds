import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();
import { json } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ params }) {
    console.log(process.env.SUPABASE_PROJECT_URL);
    const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_API_KEY);
}