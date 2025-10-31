# 🛍️ Mobile E-Commerce Website (Next.js + MongoDB)

A modern and fully responsive **e-commerce web application** built using **Next.js**, featuring product browsing, wishlist functionality, and an admin dashboard for product management.  
This project demonstrates **full-stack development**, clean UI design, and scalable architecture — ideal for production-level web applications.

---

## 🚀 Features

### 🧑‍💻 User Features
- Browse and view detailed product information (image, price, description, etc.)
- Add or remove items from the **Wishlist**
- Responsive UI for all devices (mobile, tablet, laptop)
- Smooth navigation with optimized image loading using `next/image`
- SEO-friendly pages using **Next.js dynamic routing**

### ⚙️ Admin Features
- Secure **Admin Panel** for managing products
- Add new products with images, price, and description
- Edit or delete existing products
- Real-time data storage using **MongoDB**
- Simple authentication for admin login

---

## 🏗️ Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| **Frontend** | Next.js (React), Tailwind CSS, React Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **State Management** | React Context API |
| **Deployment** | Vercel (Frontend), Render/Atlas (Backend + DB) |

---

## 📁 Project Structure

project-root/
│
├── app/ # Next.js App Router pages
│ ├── admin/ # Admin panel pages
│ ├── wishlist/ # Wishlist feature
│ ├── product/[id]/ # Product details page
│ └── page.tsx # Home page
│
├── components/ # Reusable UI components
├── context/ # Wishlist context provider
├── models/ # Mongoose models
├── pages/api/ # Backend API routes
├── public/ # Static assets
├── styles/ # Global CSS / Tailwind setup
├── .env.local # Environment variables (ignored in Git)
└── README.md


---

## ⚡ Getting Started (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/moreashish23/mobilemartNextJS
cd mobilemartNextJS

npm install

🧑‍💼 Admin Panel Access

Go to the Admin Dashboard page (/admin).

Login using the credentials from your .env.local file.

Perform actions:

➕ Add a new product

✏️ Edit product details

❌ Delete a product

All changes update automatically in the database and reflect in the product listings.
 ❤️ Wishlist Feature

Each product page has an “Add to Wishlist” button.

Users can view all saved products in the /wishlist page.

Wishlist data is persisted locally using React Context.

🧩 Responsive Design

Designed using Tailwind CSS for consistent styling.

Tested on all major screen sizes using Chrome DevTools.

Ensures smooth user experience across mobile, tablet, and desktop views.

🌐 Deployment

The application can be deployed easily using:

Vercel → for Next.js frontend

MongoDB Atlas → for database

Render / Railway → for backend if separated

🧑‍💼 Admin Panel Access

The website includes a secure Admin Dashboard where products can be added, updated, or deleted.

🔐 Login Credentials

Use the following credentials to access the admin panel:

🪪 Username (Email): admin  
🔑 Password: supersecret123


👨‍💻 Developer Info

Author: Ashish More
🎓 Department: Electronics & Telecommunication
💼 Role: Frontend Developer | Full-Stack Enthusiast
🔗 LinkedIn: https://www.linkedin.com/in/ashish-more-0651932a6/
