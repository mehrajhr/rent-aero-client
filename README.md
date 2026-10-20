<div align="center">
  <h1 align="center">RentAero — Frontend</h1>
  <p align="center"><b>Modern Equipment Rental Management & Marketplace Dashboard</b></p>
 
</div>

---

## 📖 Overview

**RentAero Client** is the frontend application for the RentAero equipment rental platform. Built with **Next.js 15 (App Router)** , **TypeScript** and **Tailwind CSS / Shadcn UI**, it provides an intuitive interface for Admins, Equipment Providers, and Customers.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Toast Notifications:** Sonner
* **Hosting / CI-CD:** [Netlify](https://www.netlify.com/)

---

## ✨ Key Features

### 👑 Admin Control Center
* **Analytics Overview:** Real-time metrics tracking platform revenue, active rentals, total equipment, and registered users.
* **Category Management:** Interactive modals to create/update equipment categories with dynamic slug generation and live searching.
* **User & Order Tracking:** Complete client-side searchable tables and status management.

### 🏠 Provider Dashboard
* **Gear Inventory Management:** Add, update, and manage equipment catalog listings.
* **Order Management:** Review and track rental requests from customers.

### 🛒 Customer Portal & Public Marketplace
* **Catalog Browsing:** Filter equipment listings by search terms and category tags.
* **Payment:** Secure payment gateway with stripe.
* **Rental Bookings:** Seamless booking flow with rental history and payment tracking.

---

## 🚀 Getting Started

Follow these steps to run the client application locally:

### **Prerequisites**
* Node.js (v18.0.0 or higher)
* `npm` or `pnpm` / `yarn`

### **1. Clone the Repository**
```bash
git clone [https://github.com/mehrajhr/rent-aero-client.git](https://github.com/mehrajhr/rent-aero-client.git)
cd rent-aero-client
npm install

Create a .env file in the root directory:
NEXT_PUBLIC_BACKEND_URL=https://rent-aero.vercel.app/api/
JWT_ACCESS_SECRET=YOUR JWT ACCESS SECRET
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET

Run Development Server
npm run dev

---

## 🔗 Related links

* **Backend Repository:** [\[RentAero Backend Repository\]](https://rent-aero.vercel.app/)
* **Backend API:** [\[RentAero Backend API\]](https://rent-aero.vercel.app/)

---
