# DIY Craft Supplies – E-Commerce Website

A frontend mini-project for an online DIY craft supplies store. The website lets users browse craft products, search and filter the catalogue, manage a shopping cart, save favourite products, and complete a demo checkout flow.

## Project Overview

This project was initially created with HTML and CSS and later enhanced with JavaScript to add interactive e-commerce features. Product information is stored in a JavaScript array of objects and product cards are generated dynamically on the page.

## Technologies Used

- **HTML5** – page structure and checkout form
- **CSS3** – layout, styling and responsive design
- **JavaScript** – dynamic product rendering, search, filtering, cart, wishlist, form validation and order confirmation
- **LocalStorage** – saves cart, wishlist and demo order data in the browser

## Features

1. **Product catalogue** – 12 DIY craft products split into Featured Products and Latest Products.
2. **Dynamic product cards** – product cards are generated from JavaScript product data.
3. **Product search** – search by product name or category.
4. **Category filtering** – filter products by Drawing, Craft, Paper Craft, Painting or DIY.
5. **Shopping cart** – add products, increase or decrease quantities, remove products and clear the cart.
6. **Automatic totals** – the cart displays total quantity and calculated price.
7. **Cart persistence** – cart contents are saved in browser LocalStorage and restored on refresh.
8. **Wishlist** – add and remove favourite products, with wishlist data saved in LocalStorage.
9. **Checkout form** – collect customer and delivery information and select a demo payment method.
10. **Form validation** – browser validation checks required fields, email format, Indian mobile number format and six-digit PIN code.
11. **Order confirmation** – generate a demo order ID and display customer details, ordered products, quantities, payment selection and total amount.
12. **Order history storage** – save demo order details in LocalStorage.
13. **Responsive layout** – CSS media queries adjust the website for smaller screens.

## Product Categories

- Drawing
- Craft
- Paper Craft
- Painting
- DIY

## Project Structure


DIY-Craft-Supplies/
│
├── index.html
├── style.css
├── script.js
│
├── diy.png
├── diy craft.png
├── cart1.png
├── menu.png
├── pencil.png
├── buttons.png
├── paper.png
├── acrylic.png
├── 01.png ... 08.png
└── other image assets
```

Keep the image assets in the paths referenced by `index.html` and `script.js`. If your images are in a separate folder, update the image paths accordingly.

## How to Run the Project

1. Download or clone the project folder.
2. Open the folder in Visual Studio Code.
3. Check that `index.html`, `style.css`, `script.js` and the image assets are in the expected locations.
4. Open `index.html` with the VS Code Live Server extension, or use another local web server.
5. Browse the products, add items to the cart or wishlist, and try the checkout demo.

## LocalStorage Data

The website uses these browser storage keys:

- `diyCraftSuppliesCart` – cart product IDs and quantities
- `diyCraftSuppliesWishlist` – saved wishlist product IDs
- `diyCraftSuppliesOrders` – saved demo orders
- `diyCraftSuppliesLastOrder` – most recent demo order

The data is stored locally in the browser for the same website origin. Clearing browser site data or using a different browser/profile may remove or hide this data.

## Important Project Limitations

This is a **frontend demonstration project**. It does not include a backend, database, user authentication, inventory management, real payment gateway, or server-side order processing. The UPI option is labelled as a demo, and selecting Cash on Delivery does not dispatch a real order. Demo customer details and orders are stored in the browser's LocalStorage; use sample details when demonstrating the project.

## Future Enhancements

- Add a backend and database for products, users and orders.
- Add secure authentication and customer accounts.
- Integrate a payment gateway in a secure test environment.
- Add server-side order processing, inventory and order tracking.
- Add product detail pages, sorting and pagination.

## Author

**Kuppala Lakshmi Pravallika**
