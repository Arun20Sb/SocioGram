
---


```
📱 Sociogram - Social Media App

A full-stack social media platform where users can log in, create posts, interact with friends, and explore a structured, intuitive UI.
Built with React.js, Tailwind CSS, and MongoDB.

---

🚀 Features

- User authentication (register/login)
- Create, view, and manage posts
- Friends system and profiles
- Responsive UI for smooth user experience

---

🛠️ Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB

---

🖥️ Getting Started

1. Clone the repository
```
git clone https://github.com/Arun20Sb/SocioGram.git
cd foldername
```

2. Install dependencies for both client and server folders
```
npm install
```

3. Configure environment variables in server
Create a `.env` file in the root directory and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=your_port
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server for both client and server folders
```
npm run dev
```

The app should now be running at(most cases):  
http://localhost:3000 - server
http://localhost:5173 - client

---
```
