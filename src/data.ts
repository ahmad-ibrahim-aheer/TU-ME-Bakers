import { Product, Review } from './types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Ahmad Ibrahim',
    text: 'The chocolate pastries here are absolutely amazing — so fresh and perfectly baked. Best bakery in Sargodha!',
    rating: 5.0,
    date: 'July 2, 2026',
    tag: 'Fresh bakery items'
  },
  {
    id: '2',
    author: 'Hamza Malik',
    text: 'Clean, well-maintained shop with professional and polite staff. The pizza slices are a must-try. Reasonable prices too!',
    rating: 5.0,
    date: 'June 28, 2026',
    tag: 'Delicious pizza'
  },
  {
    id: '3',
    author: 'Sana Khan',
    text: 'Love that this place has both fresh bakery and grocery items. The quality is consistently excellent. Highly recommended!',
    rating: 5.0,
    date: 'June 15, 2026',
    tag: 'Clean shop'
  },
  {
    id: '4',
    author: 'Zainab Fatima',
    text: 'They make the best custom cakes for birthdays in Sargodha Cantt. The sponge is incredibly soft and the design was exactly like the reference picture. Very polite behavior!',
    rating: 5.0,
    date: 'May 30, 2026',
    tag: 'Friendly staff'
  },
  {
    id: '5',
    author: 'Osama Mir',
    text: 'A perfect stop for daily grocery essentials and snack runs. Very clean premises and helpful staff. Highly recommended.',
    rating: 5.0,
    date: 'May 12, 2026',
    tag: 'Great prices'
  }
];

export const BAKERY_PRODUCTS: Product[] = [
  {
    id: 'b1',
    name: 'Gourmet Chocolate Fudge Pastry',
    price: 180,
    description: 'Decadent, rich chocolate cake layers with silky smooth fudge frosting and chocolate shavings.',
    category: 'Pastries',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'b2',
    name: 'Chicken Tikka Pizza Slice',
    price: 220,
    description: 'Freshly baked hand-tossed crust, topped with spicy tandoori chicken tikka chunks, onions, bell peppers, and stringy mozzarella.',
    category: 'Saves & Pizzas',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'b3',
    name: 'Buttery French Croissants',
    price: 150,
    description: 'Flaky, buttery multi-layered pastry freshly baked each morning. Perfect with coffee.',
    category: 'Breads & Buns',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    isPopular: true
  },
  {
    id: 'b4',
    name: 'Custom Celebration Fondant Cake',
    price: 1800,
    description: 'Pre-order customized cakes tailored for your birthdays, weddings or anniversaries. Choose your flavor and sponge (price per kg).',
    category: 'Custom Cakes',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    unit: 'kg'
  },
  {
    id: 'b5',
    name: 'Premium Red Velvet Pastry',
    price: 200,
    description: 'Delicate cocoa-flavored red sponge with whipped cream cheese icing and soft chocolate curls.',
    category: 'Pastries',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b6',
    name: 'Milky Bread Loaf (Large)',
    price: 140,
    description: 'Freshly baked premium bread enriched with fresh milk for a soft and nutritious breakfast loaf.',
    category: 'Breads & Buns',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    unit: 'pc'
  },
  {
    id: 'b7',
    name: 'Traditional Almond Nan Khatai (Box)',
    price: 450,
    description: 'Crumbly, traditional Pakistani buttery shortbread cookies garnished with rich almonds.',
    category: 'Cookies & Biscuits',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    unit: 'box'
  },
  {
    id: 'b8',
    name: 'Cheesy Chicken Fajita Calzone',
    price: 240,
    description: 'Baked golden pockets filled with spicy fajita chicken, olives, marinara, and double mozzarella cheese.',
    category: 'Saves & Pizzas',
    type: 'bakery',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80'
  }
];

export const MART_PRODUCTS: Product[] = [
  {
    id: 'm1',
    name: 'Fresh Dairy Yogurt',
    price: 140,
    description: 'Thick, creamy local milk yogurt, set naturally. Rich in calcium and live cultures.',
    category: 'Dairy & Eggs',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    unit: 'kg'
  },
  {
    id: 'm2',
    name: 'Organic Honey (Sargodha Sidr)',
    price: 950,
    description: '100% natural and pure honey sourced from regional Sargodha trees. High medicinal value.',
    category: 'Spreads & Jams',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    unit: 'jar',
    isPopular: true
  },
  {
    id: 'm3',
    name: 'Premium Chocolate Hazelnut Spread',
    price: 650,
    description: 'Sweet, creamy spread loaded with fresh roasted hazelnuts and cocoa. Perfect on bakery milk bread.',
    category: 'Spreads & Jams',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    unit: 'jar'
  },
  {
    id: 'm4',
    name: 'Gourmet Mixed Spiced Nuts',
    price: 550,
    description: 'Premium almonds, pistachios, cashews and walnuts slightly roasted and salted.',
    category: 'Snacks',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1511112465225-c6bf21703661?auto=format&fit=crop&w=600&q=80',
    unit: 'pack'
  },
  {
    id: 'm5',
    name: 'Cold Pressed Fruit Juice (1L)',
    price: 250,
    description: 'Naturally sweetened, refreshing multi-fruit juices with no artificial colors or preservatives.',
    category: 'Beverages',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    unit: 'bottle'
  },
  {
    id: 'm6',
    name: 'Local Organic Eggs (Dozen)',
    price: 280,
    description: 'Farm-fresh nutritious organic eggs, rich in protein. Delivered daily from trusted regional farms.',
    category: 'Dairy & Eggs',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?auto=format&fit=crop&w=600&q=80',
    unit: 'doz'
  },
  {
    id: 'm7',
    name: 'Crunchy Cheese Balls',
    price: 90,
    description: 'Delicious snack balls with rich Pakistani cheddar cheese flavoring. Perfect evening munch.',
    category: 'Snacks',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=600&q=80',
    unit: 'pack'
  },
  {
    id: 'm8',
    name: 'Premium Tea Leaves Blend (500g)',
    price: 780,
    description: 'Rich and strong blend of black CTC tea leaves, ideal for making authentic Pakistani milk chai.',
    category: 'Beverages',
    type: 'mart',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    unit: 'pack'
  }
];
