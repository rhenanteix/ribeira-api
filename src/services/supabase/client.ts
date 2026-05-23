import { createClient } from "@supabase/supabase-js"
import { env } from "../../config/env"

const supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_KEY)

export { supabaseClient }