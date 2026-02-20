/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_urls` (text array)
      - `category` (text)
      - `colors` (jsonb - color options)
      - `sizes` (text array)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Public read access for products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_urls text[] NOT NULL,
  category text NOT NULL,
  colors jsonb DEFAULT '[]'::jsonb,
  sizes text[] DEFAULT ARRAY['6', '7', '8', '9', '10', '11', '12', '13', '14'],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);
