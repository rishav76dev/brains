 Brains
Brains is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows authenticated users to manage notes and content, enabling them to create, update, and delete their learning materials efficiently.

🚀 Features
✅ User authentication with JWT
✅ Create, edit, delete, and view notes/content
✅ Responsive UI with clean design
✅ RESTful API architecture
✅ Modular, scalable code structure

📸 Screenshots
(Add screenshots here if available, e.g., Sign In page, Dashboard, Note Editor, etc.)

🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS

Backend: Node.js, Express, TypeScript

Database: MongoDB (via Mongoose)

Authentication: JWT

Deployment: Render (Backend), Vercel (Frontend)

📂 Project Structure
php
Copy
Edit
brains/
│
├── client/            # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/            # Node.js/Express backend
│   ├── src/
│   ├── 
│   └── ...
│
└── package.json       # Project metadata and scripts
⚙️ Environment Variables
Create a .env file in the server/ directory with:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
For the frontend (client/), add:

ini
Copy
Edit
VITE_BACKEND_URL=http://localhost:5000
🧑‍💻 Local Development
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/rishav76dev/brains.git
cd brains
2️⃣ Install dependencies
Backend:

bash
Copy
Edit
cd server
npm install
Frontend:

bash
Copy
Edit
cd ../client
npm install
3️⃣ Run the development servers
Backend:

bash
Copy
Edit
npm run dev
Frontend:

bash
Copy
Edit
npm run dev
The frontend will run on http://localhost:5173, and the backend will run on http://localhost:5000.

🧪 API Endpoints (Server)
POST /api/auth/signup - User registration

POST /api/auth/login - User login

GET /api/content - Get all content for the authenticated user

POST /api/content - Create new content

PUT /api/content/:id - Update content

DELETE /api/content/:id - Delete content

🌐 Deployment
Backend: Deploy on Render, Railway, or your preferred Node hosting service.

Frontend: Deploy on Vercel or Netlify.

🙌 Contributing
Pull requests are welcome! If you wish to contribute:

Fork the repo

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add your feature')

Push to the branch (git push origin feature/your-feature)

Open a pull request

📝 License
This project is licensed under the MIT License.

📫 Contact
If you like this project or want to collaborate, feel free to connect:

GitHub: @rishav76dev

Twitter: @rishav76dev

