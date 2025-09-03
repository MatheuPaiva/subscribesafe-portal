-- Drop the problematic admin policy that causes recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a security definer function to check if user is admin
-- This bypasses RLS and prevents recursion
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Create new admin policies using the security definer function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Also update the solicitacoes admin policies to use the same function
DROP POLICY IF EXISTS "Admins can view all requests" ON public.solicitacoes;
DROP POLICY IF EXISTS "Admins can update all requests" ON public.solicitacoes;

CREATE POLICY "Admins can view all requests"
ON public.solicitacoes
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all requests"
ON public.solicitacoes
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));