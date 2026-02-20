/*
  # Insert sample products

  Adding initial product data to populate the store.
*/

INSERT INTO products (name, description, price, image_urls, category, colors, sizes)
VALUES
  (
    'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    'Experience comfort and performance with these cutting-edge running shoes. Engineered with advanced cushioning technology for all-day wear.',
    175.00,
    ARRAY[
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1599012/pexels-photo-1599012.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    'Running',
    '[{"name": "Black", "code": "#000000"}, {"name": "Navy", "code": "#001a4d"}, {"name": "Gray", "code": "#666666"}]',
    ARRAY['6', '7', '8', '9', '10', '11', '12', '13', '14']
  ),
  (
    'NIKE COURT LEGACY CANVAS',
    'Classic canvas sneakers with premium comfort. Perfect for casual everyday wear with timeless style.',
    89.00,
    ARRAY[
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    'Lifestyle',
    '[{"name": "White", "code": "#FFFFFF"}, {"name": "Black", "code": "#000000"}, {"name": "Olive", "code": "#808000"}]',
    ARRAY['6', '7', '8', '9', '10', '11', '12', '13', '14']
  ),
  (
    'NIKE AIR MAX IMPACT',
    'Maximum comfort meets modern style. The Nike Air Max Impact is engineered for both performance and everyday wear.',
    125.00,
    ARRAY[
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1599012/pexels-photo-1599012.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    'Running',
    '[{"name": "Black", "code": "#000000"}, {"name": "Red", "code": "#FF0000"}, {"name": "White", "code": "#FFFFFF"}]',
    ARRAY['6', '7', '8', '9', '10', '11', '12', '13', '14']
  ),
  (
    'JORDAN LEGACY 312',
    'Iconic basketball heritage meets contemporary design. Built for those who demand style and substance.',
    145.00,
    ARRAY[
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    'Basketball',
    '[{"name": "Black", "code": "#000000"}, {"name": "Red", "code": "#FF0000"}, {"name": "Green", "code": "#008000"}]',
    ARRAY['6', '7', '8', '9', '10', '11', '12', '13', '14']
  );
