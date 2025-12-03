
# 🧠 Brains

**Brains** is a full-stack **MERN** (MongoDB, Express, React, Node.js) application that allows authenticated users to manage notes and learning content efficiently — enabling them to **create**, **update**, and **delete** their materials with ease.

---

## 🚀 Features
- ✅ **User authentication** with JWT
- ✅ **Create, edit, delete, and view** notes/content
- ✅ **Responsive UI** with a clean, modern design
- ✅ **RESTful API** architecture
- ✅ **Modular, scalable** code structure

---

## 📸 Screenshots
*(Add screenshots here — e.g., Sign In page, Dashboard, Note Editor, etc.)*

---

## 🛠️ Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express
- TypeScript

**Database**
- MongoDB (via Mongoose)

**Authentication**
- JSON Web Token (JWT)

**Deployment**
- **Backend:** Render
- **Frontend:** Vercel

---

## 📂 Project Structure
```
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
```

---

## ⚙️ Environment Variables

**Backend (`server/.env`):**
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**Frontend (`client/.env`):**
```ini
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🧑‍💻 Local Development

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rishav76dev/brains.git
cd brains
```

### 2️⃣ Install dependencies

**Backend**
```bash
cd server
npm install
```

**Frontend**
```bash
cd ../client
npm install
```

### 3️⃣ Run the development servers

**Backend**
```bash
npm run dev
```


**Frontend**
```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## 🧪 API Endpoints (Server)

| Method | Endpoint           | Description                  |
|--------|-------------------|------------------------------|
| POST   | `/api/auth/signup` | User registration            |
| POST   | `/api/auth/login`  | User login                   |
| GET    | `/api/content`     | Get all content for the user |
| POST   | `/api/content`     | Create new content           |
| PUT    | `/api/content/:id` | Update content               |
| DELETE | `/api/content/:id` | Delete content               |

---

## 🌐 Deployment

- **Backend:** Render
- **Frontend:** Vercel

---

## 🙌 Contributing

Pull requests are welcome!

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 📫 Contact

- **GitHub:** [@rishav76dev](https://github.com/rishav76dev)
- **Twitter:** [@rishav76dev](https://twitter.com/rishav76)
