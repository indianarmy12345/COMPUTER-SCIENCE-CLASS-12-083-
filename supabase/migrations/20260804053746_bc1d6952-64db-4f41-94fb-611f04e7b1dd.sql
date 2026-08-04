CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = 'lavishkumar1232@gmail.com'
$$;

CREATE POLICY "Anyone can send a contact message"
ON public.contact_messages FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admin can read messages"
ON public.contact_messages FOR SELECT TO authenticated
USING (public.is_site_admin());

CREATE POLICY "Admin can update messages"
ON public.contact_messages FOR UPDATE TO authenticated
USING (public.is_site_admin())
WITH CHECK (public.is_site_admin());

CREATE POLICY "Admin can delete messages"
ON public.contact_messages FOR DELETE TO authenticated
USING (public.is_site_admin());