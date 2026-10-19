import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { useSeo } from "@/hooks/use-seo";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({ name: z.string().trim().min(1).max(100), email: z.string().trim().email().max(255), subject: z.string().trim().min(1).max(150), message: z.string().trim().min(1).max(5000), website: z.string().max(0) });
export default function Contact() {
  useSeo({ title: "Get in Touch — Brian Mumo Musyoki", description: "Contact Brian Mumo Musyoki in Nairobi, Kenya.", path: "/contact" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) { setError("Please complete every field with a valid email address."); return; }
    setSending(true); setError("");
    try {
      const { data, error: sendError } = await supabase.functions.invoke("contact", { body: parsed.data });
      if (sendError || !data?.success) { setError("Your message could not be sent. Please try again shortly."); return; }
      setReference(data.reference);
    } catch { setError("Connection unavailable. Please try again."); }
    finally { setSending(false); }
  }
  return <Layout><section className="container-wide pt-28 md:pt-32 pb-20">
    <p className="text-label text-primary mb-4">Contact</p><h1 className="text-headline mb-12">Get in Touch</h1>
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
      <div><h2 className="font-display text-2xl font-bold">{site.name}</h2><p className="text-muted-foreground mt-3 leading-relaxed">{site.title}</p><p className="text-label mt-8">Location</p><p className="mt-2">{site.location}</p>
        {site.email && <a className="block text-primary mt-6 break-words" href={`mailto:${site.email}`}>{site.email}</a>}
        {site.phone && <a className="block text-primary mt-4" href={`tel:${site.phone}`}>{site.phone}</a>}
        {site.linkedin && <a className="block text-primary mt-4" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
      </div>
      {reference ? <div role="status" className="border-t border-primary pt-6"><CheckCircle2 className="text-primary mb-4" /><h2 className="text-2xl font-display font-bold">Message received</h2><p className="text-muted-foreground mt-3">Thank you. Your message has been saved securely.</p><p className="text-xs font-mono text-muted-foreground mt-5 break-all">Reference: {reference}</p><Button variant="outline" className="mt-6" onClick={() => setReference("")}>Send another message</Button></div> :
      <form onSubmit={submit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">{[["name", "Name", "text", 100], ["email", "Email", "email", 255]].map(([name, label, type, max]) => <div key={name}><label htmlFor={String(name)} className="text-sm">{label}</label><input id={String(name)} name={String(name)} type={String(type)} maxLength={Number(max)} required autoComplete={String(name)} className="block w-full border border-input bg-card mt-2 px-3 h-12 text-foreground" /></div>)}</div>
        <div><label htmlFor="subject" className="text-sm">Subject</label><input id="subject" name="subject" required maxLength={150} className="block w-full border border-input bg-card mt-2 px-3 h-12" /></div>
        <div><label htmlFor="message" className="text-sm">Message</label><textarea id="message" name="message" required maxLength={5000} rows={6} className="block w-full border border-input bg-card mt-2 p-3 resize-y" /></div>
        <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
        <Button type="submit" disabled={sending} size="lg" className="font-mono text-xs">{sending ? "SENDING…" : "SEND MESSAGE"}<ArrowUpRight /></Button>
      </form>}
    </div>
  </section></Layout>;
}
