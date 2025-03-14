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
```bash
git clone https://github.com/Arun20Sb/SocioGram.git
cd Sociogram
```

2. Install dependencies for both client and server folders
```bash
cd client
npm install

cd ../server
npm install
```

3. Configure environment variables in `/server`  
Create a `.env` file inside the `/server` directory and add:
```env
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

4. Run the development servers for both client and server folders
```bash
# Run the backend (server)
cd server
npm run dev

# In a new terminal, run the frontend (client)
cd client
npm run dev
```

The app should now be running at:  
- Server API: http://localhost:3000  
- Client App: http://localhost:5173

---
