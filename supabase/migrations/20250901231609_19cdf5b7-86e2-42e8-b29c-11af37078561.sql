-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN role text DEFAULT 'user';

-- Add response and price fields to solicitacoes table
ALTER TABLE public.solicitacoes ADD COLUMN resposta_admin text;
ALTER TABLE public.solicitacoes ADD COLUMN valor_mensalidade decimal(10,2);
ALTER TABLE public.solicitacoes ADD COLUMN respondida_em timestamp with time zone;

-- Create admin policies for solicitacoes
CREATE POLICY "Admins can view all requests" 
ON public.solicitacoes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update all requests" 
ON public.solicitacoes 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create admin policies for profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p2
    WHERE p2.user_id = auth.uid() 
    AND p2.role = 'admin'
  )
);