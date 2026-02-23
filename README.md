# Project Name : Zavisoft Frontend Task (KICKS)

## 1. Description:

**KICKS** is a responsive e-commerce frontend built from a Figma design using Next.js, React.js, Context API, Axios, and Tailwind CSS. It integrates the Platzi Fake Store API to display dynamic product listings, product details, and categories, while maintaining clean architecture, proper state management, and loading/error state handling.

---

## 2. Used Technologies:

- Next.js (v16.1.6) – React Framework
- React.js (v19)
- JavaScript (ES6+)
- Context API – State Management
- Axios – API Data Fetching
- Tailwind CSS v4 – Utility-first Styling
- Swiper.js – Product sliders
- Lucide React & React Icons – Icon System
- AOS Animations – for engaging UI transitions
- clsx & tailwind-merge – Conditional class handling

---

## 3. Main Features:

- **Pixel-Perfect UI Implementation** – Matches Figma layout, spacing,
  typography, and colors.
- **Fully Responsive Design** – Optimized for Desktop and Mobile.
- **Dynamic Product Listing** – Integrated with Platzi Fake Store API.
- **Product Details Page:** - Dynamic routing with detailed product view.
- **Product Categories Filter** – Fetch and display categories dynamically.
- **Context API State Management** – Clean and centralized state handling.
- **Cart Functionality (Bonus Implemented)** – Local state-based cart system.
- **Loading, Empty & Error States** – Proper UI handling for all API states.
- **Reusable Component Architecture** – Modular and scalable folder structure.
- **Clean Data Fetching Layer** – Centralized Axios instance configuration.

---

## 4. API Integration:

The project uses the following endpoints from the Platzi Fake Store API:

 - Products: https://fakeapi.platzi.com/en/rest/products
 - Categories: https://fakeapi.platzi.com/en/rest/categories

---

## 5. Dependencies:

```json
"dependencies": {
  "axios": "^1.13.5",
  "clsx": "^2.1.1",
  "lucide-react": "^0.575.0",
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "react-icons": "^5.5.0",
  "swiper": "^12.1.2",
  "tailwind-merge": "^3.5.0"
}
```

---

## 6. devDependencies:

```json
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "@types/node": "25.3.0",
  "@types/react": "19.2.14",
  "eslint": "^9",
  "eslint-config-next": "16.1.6",
  "tailwindcss": "^4"
}
```

---

## 7. Installation:

```bash
# Clone the repository
git clone https://github.com/towfiq-islam/kicks-ecommerce

# Navigate into the project
cd kicks-ecommerce

# Add an .env file in root
.env = NEXT_PUBLIC_SITE_URL=https://api.escuelajs.co/api/v1

# Install dependencies
npm install

# Run the development server
npm run dev
```

---

## 8. Usage:

Run `npm run dev` to start the project locally. The app will run on
**http://localhost:3000**

---
