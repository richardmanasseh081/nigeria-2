import { rest } from "msw";

const allProducts = [
  { id: 1, name: "Jollof Rice", price: 2500, category: "rice", rating: 4.8, reviews: 124, image: "https://kikifoodies.com/wp-content/uploads/2025/03/ET5B8958-4.jpeg", featured: true },
  { id: 2, name: "Fried Chicken", price: 3500, category: "protein", rating: 4.9, reviews: 256, image: "https://cjeatsrecipes.com/wp-content/uploads/2023/07/Easy-Fried-Chicken-on-a-plate.jpg", featured: true },
  { id: 3, name: "Moi Moi 2", price: 1500, category: "snacks", rating: 4.7, reviews: 89, image: "https://pulses.org/images/com_yoorecipe/422/moi-moi-rollup.jpg", featured: false },
  { id: 4, name: "Egusi Soup 2", price: 2000, category: "soups", rating: 4.6, reviews: 145, image: "https://cheflolaskitchen.com/wp-content/uploads/2018/06/Egusi-soup-Recipe-2-scaled.jpg", featured: false },
  { id: 5, name: "Suya 2", price: 2200, category: "protein", rating: 4.9, reviews: 312, image: "https://www.allrecipes.com/thmb/gDS9yte-01ySoy-LvCrLm998T1Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4619789-nigerian-suya-Avrile-Ngonga-4x3-1-521c46e035b149128577a25365173cab.jpg", featured: true },
  { id: 6, name: "Chin Chin", price: 1200, category: "snacks", rating: 4.5, reviews: 67, image: "https://cookingwithclaudy.com/wp-content/uploads/2023/11/20231109103244_IMG_6461-1.jpg", featured: false },
  { id: 7, name: "Pepper Soup", price: 1800, category: "soups", rating: 4.8, reviews: 178, image: "https://allnigerianfoods.com/wp-content/uploads/pepper-soup-recipe-500x500.jpg", featured: false },
  { id: 8, name: "Plantain Chips", price: 1000, category: "snacks", rating: 4.4, reviews: 92, image: "https://foreignfork.com/wp-content/uploads/2022/02/SweetPlantainChipsFEATURE.jpg", featured: false },
  { id: 9, name: "Beef Stew", price: 2800, category: "rice", rating: 4.7, reviews: 134, image: "https://static01.nyt.com/images/2024/10/28/multimedia/beef-stew-mlfk/beef-stew-mlfk-mediumSquareAt3X.jpg", featured: false },
  { id: 10, name: "Akara", price: 800, category: "snacks", rating: 4.6, reviews: 103, image: "https://www.mydiasporakitchen.com/wp-content/uploads/2023/11/IMG_2412.jpeg", featured: true },
  { id: 11, name: "Okra Soup", price: 1900, category: "soups", rating: 4.7, reviews: 156, image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Okro_soup_with_shrimps%2Cdried_fish%2Ccow_leg_and_tail_with_meat.jpg", featured: false },
  { id: 12, name: "Grilled Fish", price: 4000, category: "protein", rating: 4.9, reviews: 201, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj84bWOvomrFiKeQUdk4RYxEgNKS6PeZLY8Q&s", featured: true },
];

export const handlers = [
  rest.post('/auth/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: 'Missing credentials' }));
    }
    return res(ctx.delay(700), ctx.status(200), ctx.json({ user: { email, name: 'Demo User' } }));
  }),

  rest.post('/auth/signup', async (req, res, ctx) => {
    const { fullName, email } = await req.json();
    if (!email) {
      return res(ctx.status(400), ctx.json({ message: 'Missing email' }));
    }
    return res(ctx.delay(900), ctx.status(201), ctx.json({ user: { email, name: fullName || 'New User' } }));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(400), ctx.status(200), ctx.json({ products: allProducts }));
  }),
];
