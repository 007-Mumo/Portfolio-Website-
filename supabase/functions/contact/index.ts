import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { contactSchema } from './schema.ts';

Deno.serve(async (req) => {
  const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    if (Number(req.headers.get('content-length')) > 24000) return reply({ error: 'Message is too large.' }, 413);
    const raw = await req.text();
    if (raw.length > 24000) return reply({ error: 'Message is too large.' }, 413);
    const parsed = contactSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return reply({ error: 'Please check your name, email, subject and message.' }, 400);
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) return reply({ error: 'Contact service unavailable.' }, 503);
    const db = createClient(url, key);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key + ip));
    const ip_hash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
    const { count, error: rateError } = await db.from('contact_messages').select('id', { count: 'exact', head: true }).eq('ip_hash', ip_hash).gte('created_at', new Date(Date.now() - 3600000).toISOString());
    if (rateError) return reply({ error: 'Unable to send right now. Please try again.' }, 503);
    if ((count ?? 0) >= 5) return reply({ error: 'Too many messages. Please try again later.' }, 429);
    const { website: _website, ...message } = parsed.data;
    const { data, error } = await db.from('contact_messages').insert({ ...message, ip_hash }).select('id').single();
    if (error) return reply({ error: 'Your message could not be saved. Please try again.' }, 500);
    return reply({ success: true, reference: data.id });
  } catch {
    return reply({ error: 'Unable to send your message. Please try again.' }, 400);
  }
});
