import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.",
  );
}

/** Browser Supabase client (anon key). Used for public form submissions. */
export const supabase = createClient(url, anonKey);

/** Shape of a row in `public.contact_submissions`. */
export type ContactSubmission = {
  source: "contact-form" | "book-call";
  email: string;
  name?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  country_code?: string | null;
  phone?: string | null;
  program?: string | null;
  call_mode?: string | null;
  message?: string | null;
};

/** Insert a contact submission. Throws on failure so callers can surface it. */
export async function submitContact(submission: ContactSubmission) {
  const { error } = await supabase.from("contact_submissions").insert(submission);
  if (error) throw error;
}
