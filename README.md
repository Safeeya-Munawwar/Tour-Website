# Tour Website Project

## Project Overview

This project is a **Tour Booking Website** built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It includes functionalities for managing **Day Tours, Round Tours, Bookings, Blogs, Reviews, Destinations**, and an **Admin Panel** to manage content.

---

## Folder Structure

```
tour-website-project/
├── frontend/               # React Frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
├── backend/                # Node + Express Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Technologies Used

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** MongoDB (Atlas Cloud)
* **Email Service:** For booking and inquiry notifications
* **Version Control:** Git & GitHub

---

## Features

* View all tours (Day Tours & Round Tours)
* Tour Details Pages with highlights, duration, and images
* Booking & Inquiry forms
* Admin Panel:
  * Manage Tours
  * Manage Bookings
  * Manage Gallery
  * Manage Blogs & Reviews
* Separate handling for special tours vs regular tours
* Fully responsive UI
* PDF generation for bookings (if required)

---

## Database Details

Database hosted on **MongoDB Atlas (Cloud)**:

* **Database Name:** `tour-website`
* **Collections:**

  * abouts
  * admins
  * blogs
  * blogcomments
  * bookings
  * communityimpacts
  * contactforms
  * contacts
  * daytours
  * daytourdetails
  * daytourbookings
  * destinations
  * experiences
  * homes
  * journeys
  * reviews
  * roundtours
  * roundtourdetails
  * roundtourbookings
  * tailormadetourinquiries
* **Image Storage:** GridFS
* **Purpose:** Stores all tour data, bookings, inquiries, admin credentials, blogs, reviews, destinations, and gallery content.

---

## Setting Up the Project

### 1. Clone the Repository

```bash
git clone <your-repo-link>
cd tour-website-project
```

### 2. Setup Backend

```bash
cd backend
npm install
```

* Create `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
```

* Run backend:

```bash
node server.js
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## Admin Panel Login

* Admin credentials stored in `admins` collection
* Access panel to manage Tours, Bookings, Gallery, Blogs, Reviews

---

## Deployment

* Frontend can be deployed on **Vercel**
* Backend can be hosted on **Node.js server / Render / Railway**
* MongoDB remains hosted on **Atlas Cloud**
