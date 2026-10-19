import { assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { contactSchema } from './schema.ts';
Deno.test('accepts valid contact message', () => {
  assertEquals(contactSchema.safeParse({ name: 'Portfolio visitor', email: 'visitor@example.com', subject: 'Engineering discussion', message: 'I would like to discuss your solar project.', website: '' }).success, true);
});
Deno.test('rejects invalid email and empty message', () => {
  assertEquals(contactSchema.safeParse({ name: 'Visitor', email: 'not-email', subject: 'Discussion', message: '' }).success, false);
});
Deno.test('rejects honeypot submissions', () => {
  assertEquals(contactSchema.safeParse({ name: 'Visitor', email: 'visitor@example.com', subject: 'Discussion', message: 'Message', website: 'spam.example.com' }).success, false);
});
