# Contact Form → Supabase Migration

**Project:** Delphi Website  **Supabase ref:** `lxmbetmjyfagmmuoragm`
**Date:** 2026-06-22  **Status:** Live and verified

---

## 1. What was migrated

Both contact entry points on the site now persist submissions to a single
Supabase table instead of disappearing after the "success" screen.

| Form | Where it appears | Behaviour before | Behaviour now |
| --- | --- | --- | --- |
| `ContactForm` | `/contact` page | Showed success, saved nothing | Inserts to Supabase; shows loading + error states |
| `BookCallModal` | Floating form in the root layout — **every page** | POSTed to an n8n webhook only | Inserts to Supabase **and** keeps the n8n POST |

### The table — `public.contact_submissions`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key, `gen_random_uuid()` |
| `created_at` | `timestamptz` | Defaults to `now()` |
| `source` | `text` | `'contact-form'` or `'book-call'` |
| `name` | `text` | Used by the `/contact` form |
| `first_name`, `last_name` | `text` | Used by the Book-a-Call modal |
| `email` | `text` | Required |
| `country_code`, `phone` | `text` | Phone details |
| `program` | `text` | Program of interest |
| `call_mode` | `text` | Book-a-Call only (Meet / WhatsApp / Phone) |
| `message` | `text` | Free-text |

A single table with a `source` discriminator is intentional here: both forms
capture the **same kind of record** (an inbound lead) with overlapping fields.

### Security model (RLS)

- Row-Level Security is **enabled**.
- One policy: anonymous visitors (`anon` role) may **INSERT** only.
- There is **no SELECT/UPDATE/DELETE policy**, so submissions **cannot be read
  back** with the public browser key. You read them from the Supabase dashboard
  or via the service-role key on the server.

Verified end-to-end: an anonymous insert with the public key returns HTTP 201;
reads are correctly blocked.

### Code touched

- `src/lib/supabase.ts` — browser client + typed `submitContact()` helper.
- `src/components/ContactForm.tsx` — async submit, loading/error states.
- `src/components/BookCallModal.tsx` — Supabase insert alongside n8n.
- Added dependency `@supabase/supabase-js`.

---

## 2. Why merging into an "orders" table isn't the right move

The idea of folding these submissions into an `orders` table came up. There are
both a practical and a structural reason it doesn't fit.

**Practically — there is no `orders` table.** The current Supabase project
contains only the managed `auth`/`storage` tables and the new
`contact_submissions`. If orders live somewhere — a commerce backend, a CRM, or
the downstream n8n flow — they are in a *different system / database*. That
makes this an **integration/sync** problem, not a table merge.

**Structurally — they are different entities, even if orders existed:**

1. **Different point in the funnel.** A contact submission is an *unqualified
   lead* — anonymous, no commitment, free-text intent. An order is a *confirmed
   transaction* — a known customer, money, line items, fulfillment. Collapsing
   the two destroys the meaning of each.

2. **Schema divergence.** Orders need fields like amount, currency, payment
   status, fulfillment status, and a customer foreign key. Submissions need a
   message, program interest, and call mode. Merging forces a wide table full of
   mostly-`NULL` columns gated by a `type` flag — the classic
   single-table-overloading anti-pattern that gets harder to query over time.

3. **Opposite trust models (the dealbreaker).** The contact form *must* allow
   **anonymous INSERT** from the browser. Orders almost always require an
   **authenticated user**, with policies like "a customer can only read their
   own orders" and "anon can never touch this table." A single table can only
   carry one RLS policy set — so you would either over-expose real orders to the
   public key or block legitimate contact submissions. You cannot satisfy both
   safely in one table.

4. **Different lifecycle & retention.** Orders mutate through states (paid,
   shipped, refunded) and carry financial/audit obligations. Submissions are
   write-once records you triage and eventually archive. Their PII, retention,
   and backup rules differ.

**The correct relationship is *relate, not merge*.** If you later want to tie a
lead to the order it produced, keep the tables separate and add a nullable
`contact_submission_id` foreign key on `orders`. You keep clean attribution
without compromising either table's schema or security.

---

## 3. Next steps (optional, in priority order)

1. **Production env vars.** Ensure `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in the Vercel project. (They already
   exist in local `.env`.)

2. **Decide how the team reads submissions.** Today reads happen via the
   dashboard only. If you want an in-app admin view, add Supabase Auth and a
   SELECT policy scoped to an authenticated admin role — *do not* loosen the
   anon policy.

3. **New-submission notifications.** Add a Supabase Database Webhook or trigger
   → Edge Function to email/Slack the team on insert, or keep routing the
   Book-a-Call form through n8n for this. Useful so leads aren't missed.

4. **Spam protection.** The insert policy is intentionally open (any visitor can
   submit). If spam appears, add Cloudflare Turnstile / a captcha, or move the
   insert behind an Edge Function with rate limiting.

5. **Indexing & housekeeping.** As volume grows, add indexes on `created_at` and
   `source` for triage, and define a retention/archival policy for old leads
   (PII hygiene).

6. **If orders come later.** Create the `orders` table in its own migration with
   its own (authenticated) RLS, and link it to `contact_submissions` via FK as
   described above — rather than merging.
