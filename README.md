# 🩺 DocAppoint — Doctor Appointment Booking Platform

> A modern healthcare platform where users can explore specialized doctor profiles, check availability, and seamlessly book appointments online.

<img width="1896" height="838" alt="image" src="https://github.com/user-attachments/assets/cdfc4f0d-13fe-47de-98ef-52c307be3885" />
<img width="1895" height="843" alt="image" src="https://github.com/user-attachments/assets/521ab109-48f5-41a2-9c6a-ebe1abfc480d" />



## 🌐 Live Site & Repository

🔗 **Live Site:** [https://assignment-9-eight-drab.vercel.app/](https://assignment-9-eight-drab.vercel.app/)  
🔗 **Server API:** [https://assignment-9-server-ybq9.onrender.com](https://assignment-9-server-ybq9.onrender.com)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚡ Next.js 15 | Full-stack React Framework (App Router) |
| 🚀 Express.js | Backend REST API Framework |
| 🔐 BetterAuth & JWT | Hybrid Secure Authentication & Token Verification |
| 🍃 MongoDB | NoSQL Database for Profiles & Bookings |
| 🎨 Tailwind CSS | Styling & Responsiveness |
| 🌼 DaisyUI | Clean Medical UI Components |
| 🍪 Cookie Parser | Secure HTTP-Only Cookie Session Management |

---

## ✨ Key Features

### 🔐 Multi-Layer Authentication
- Secure login and registration using **BetterAuth**.
- Custom JWT (JSON Web Token) generation with secure HTTP-only cookies for cross-domain backend verification (`Vercel` to `Render`).
- State-persistent sticky navigation bar reflecting current authentication status.

### 🩺 Doctor Discovery & Profiling
- Publicly accessible directory showcasing all available doctors with specialty badges.
- Detailed single-doctor profile views featuring professional statements, consultation fees, experience ratings, and active reviews.

### 📅 Smart Appointment Booking System
- Dynamic booking modal auto-populating active patient info (Name & Email).
- Interactive scheduling form capturing required fields: phone number, gender, date, and specific symptoms/notes.
- Real-time interaction supported by responsive toast notifications (`react-hot-toast`).

### 🎨 Premium UI/UX Design
- Fully fluid and responsive architecture optimized across mobile, tablet, and desktop screens.
- Elegant color schema with professional pink/magenta accents (`#941865`).
- Custom scrollbars, interactive loaders, and disabled-state prevention on multi-form submissions.

---

## 📋 Pages & Route Accessibility

| Page Path | Access Type | Description |
|---|---|---|
| 🏠 `/` | Public | Home page with hero sections and core platform highlights. |
| 🩺 `/all-appointments` | Public | Explore all medical specialists and available chambers. |
| 📄 `/doctor/[id]` | Public | Comprehensive breakdown of a single doctor's profile & statement. |
| 🔑 `/login` | Public | Access account via credentials or social provider. |
| 📝 `/register` | Public | Create a new patient account. |
| 📅 `/my-bookings` | Protected | View, track, or manage successfully reserved appointments. |

---

## 👨‍💻 Author
- 👤 Name: Asmual Obaidul Hoque  
- 📧 Email: Asmual01@gmail.com
