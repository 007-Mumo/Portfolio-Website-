CREATE TABLE public.contact_messages (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
 message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
 ip_hash text NOT NULL
);
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_messages_rate_idx ON public.contact_messages (ip_hash, created_at);