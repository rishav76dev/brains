Brains is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows authenticated users to manage notes and learning content efficiently — enabling them to create, update, and delete their materials with ease.

🚀 Features

✅ User authentication with JWT
✅ Create, edit, delete, and view notes/content
✅ Responsive UI with a clean, modern design
✅ RESTful API architecture
✅ Modular, scalable code structure


🛠️ Tech Stack
Frontend

React
TypeScript
Tailwind CSS

Backend

Node.js
Express
TypeScript

Database

MongoDB (via Mongoose)

Authentication

JSON Web Token (JWT)

Deployment

Backend: Render
Frontend: Vercel


📂 Project Structure
brains/
│
├── client/              # React frontend
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/              # Node.js/Express backend
│   ├── src/
│   └── ...
│
└── package.json         # Project metadata and scripts

⚙️ Environment Variables
Backend (server/.env):
iniPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Frontend (client/.env):
iniVITE_BACKEND_URL=http://localhost:5000

🧑‍💻 Local Development
1️⃣ Clone the repository
bashgit clone https://github.com/rishav76dev/brains.git
cd brains
2️⃣ Install dependencies
Backend
bashcd server
npm install
Frontend
bashcd ../client
npm install
3️⃣ Run the development servers
Backend
bashnpm run dev
Frontend
bashnpm run dev

Frontend: http://localhost:5173
Backend: http://localhost:5000


🧪 API Endpoints (Server)
MethodEndpointDescriptionPOST/api/auth/signupUser registrationPOST/api/auth/loginUser loginGET/api/contentGet all content for the userPOST/api/contentCreate new contentPUT/api/content/:idUpdate contentDELETE/api/content/:idDelete content

🌐 Deployment

Backend: Render, Railway, or any Node hosting service
Frontend: Vercel, Netlify


🙌 Contributing
Pull requests are welcome!

Fork the repository
Create a feature branch

bashgit checkout -b feature/your-feature

Commit your changes

bashgit commit -m "Add your feature"

Push to your branch

bashgit push origin feature/your-feature

Open a pull request


📝 License
This project is licensed under the MIT License.

📫 Contact

GitHub: @rishav76dev
Twitter: @rishav76dev
