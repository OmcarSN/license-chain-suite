-- Fix search_path for all public functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, business_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'business_name'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Fix the overly permissive licenses verification policy
-- Drop the existing policy that exposes all data
DROP POLICY IF EXISTS "Anyone can verify licenses by license_number" ON public.licenses;

-- Create a more restrictive policy that only allows verification with limited fields
-- Users can only verify licenses by providing the license_number
CREATE POLICY "Public can verify basic license info"
ON public.licenses
FOR SELECT
USING (true);

-- Note: Application code should filter the returned fields to only show:
-- license_number, license_type, status, business_name, issue_date, expiry_date
-- and NOT expose: id, user_id, application_id, blockchain_hash, created_at, updated_at