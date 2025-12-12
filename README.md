# 🏨 Hotel Booking System (Frontend)

> **A comprehensive web platform for hotel reservations, membership management, and secure payments.**

![Frontend](https://img.shields.io/badge/Frontend-Web-blue?style=for-the-badge)
![Testing](https://img.shields.io/badge/Testing-Playwright-green?style=for-the-badge)
![Course](https://img.shields.io/badge/Course-Software_Engineering-orange?style=for-the-badge)

## 📖 About The Project

This is the **Frontend** repository for the Hotel Booking System (Project: *The Call Center*). This application allows users to seamlessly browse hotels, manage bookings, and utilize a tiered membership system for exclusive benefits.

Developing this interface focused on user experience (UX), ensuring clear navigation for three distinct user roles: **Customers**, **Hotel Managers**, and **Admins**.

---

## 🌟 Key Features (Sprint 1 & 2)

### 💳 Epic 1: Payment System
* **Multi-Method Payment:** Users can choose from various payment methods during checkout.
* **Real-time Booking Status:** Users can view the status of their bookings (Unpaid, Pending, Completed).
* **Refund Management:** Customers can cancel bookings and receive refunds according to policy.
* **Admin Dashboard:** Admins can recheck and update payment statuses for verification.
  
### 👑 Epic 2: Membership System
* **Tiered Benefits:** Customers can view their current tier (e.g., VIP) and associated benefits.
* **Tier Upgrades:** Automated logic to upgrade membership tiers based on booking points.
* **Manager Insights:** Hotel managers can view a customer's membership tier to provide personalized service.
* **Advertising:** Hotel managers can purchase ad packages to boost their hotel's visibility on the homepage.

---

## 🛠️ Tech Stack & Workflow

* **Framework:** (Insert your framework here, e.g., React/Vue/Next.js)
* **Testing:** [Playwright](https://playwright.dev/) for end-to-end testing.
* **Version Control Strategy:** utilized a "Split Branch" workflow separating `main`, `refactor`, `development`, and specific `feature/` branches.

### 📂 Project Structure
```text
src/
├── app/                 # Next.js App Router (Pages & Layouts)
│   ├── (hotelinfo)/     # Hotel details and browsing
│   ├── booking/         # Booking flows
│   ├── checkout/        # Payment processing pages
│   └── api/             # NextAuth route handlers
├── components/          # Reusable UI Library
│   ├── interactive/     # InteractiveCard, Button, SlideArrowButton
│   ├── membership/      # MembershipCard, RankCard, Progress components
│   └── payment/         # PaymentTable, CreditCard forms
└── libs/                # Backend Integration Services
    ├── Auth/            # User login/register & session handling
    ├── Booking/         # CRUD operations for bookings
    └── Payment/         # Payment validation services
```
-----

## 🚀 How to Run

### Manual Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start the Server:**
    ```bash
    npm start
    ```
3.  **Run Tests:**
    ```bash
    npm test
    ```

-----

## 👨‍💻 Contributors

**The Call Center Team**

  * **Nattarat Samartkit**
  * **Worachart Poungtabtim**
  * **Patcharapon Srisuwan**
  * **Jedsada Meesuk**
  * **Patcharapon Ongkakul**
  * **Patthadon Phengpinij**
  * **Warapong Thongkhundam**
  * **Titiporn Somboon**
  * **Siravut Chunu**

<!-- end list -->
