# Contest Tracker 🏆

Welcome to Contest Tracker! Your one-stop solution for staying on top of coding competitions across Codeforces, CodeChef, and LeetCode. Never miss a contest again and keep all your favorite competitions just a click away.

## ✨ What Makes This Special

### Keep Track of Your Favorite Competitions 🗓️
- **All Platforms in One Place**: We bring contests from Codeforces, CodeChef, and LeetCode together in a single dashboard
- **Smart Filtering**: Easily find what matters - see what's coming up, what's happening now, or what you've missed
- **Save for Later**: Found a contest you're excited about? Bookmark it and come back when you're ready

### Learn From Every Contest 📚
- **Solution Hub**: Watch hand-picked YouTube tutorials explaining contest problems
- **Community Knowledge**: Benefit from solution links added by our dedicated admins
- **Auto-Discovery**: Our system finds relevant contest solutions so you don't have to search

### Built With You in Mind 👤
- **Quick Access**: Create your account and jump right in
- **Personal Collection**: All your bookmarked contests in your own space
- **Easy on the Eyes**: Toggle between dark and light modes whenever you want

## 🛠️ The Tech Behind It

We've built this platform using the powerful MERN stack:
- **Frontend**: React.js for a smooth user experience
- **Backend**: Node.js and Express.js for reliable performance
- **Database**: MongoDB to keep your data secure
- **Security**: JWT authentication to protect your account

## 🚀 Ready to Dive In?

### Before You Start
Make sure you have:
- Node.js installed
- npm ready to go
- MongoDB set up

### Setting Up the Frontend
1. Clone the repo to your machine
2. Head over to the frontend folder
3. Get everything installed:
   ```bash
   npm i
   ```
4. Fire it up:
   ```bash
   npm run dev
   ```

### Getting the Backend Running
1. Navigate to where the backend code lives
2. Install what you need:
   ```bash
   npm i
   ```
3. Create a `.env` file with these details:
   ```
   PORT = 5002
   MONGODB_URI = <your_mongodb_connection_string>
   JWT_SECRET = "NITRR"
   NODE_ENV = development
   ADMIN_PASSKEY = <your_admin_passkey>
   API_KEY = <your_api_key>
   ```
4. Launch the server:
   ```bash
   npm run dev
   ```

## 🔌 API Breakdown

### User Management
- `POST /api/auth/signup`: Join the community
- `POST /api/auth/login`: Come on in
- `POST /api/auth/logout`: Take a break
- `GET /api/auth/check`: Quick account verification

### Contest Features
- `GET /api/contest/list`: See what's out there
- `GET /api/contest/past`: Look back at previous contests
- `POST /api/contest/updateLink`: Add that perfect solution video
- `POST /api/contest/bookmark`: Save contests for later
- `POST /api/contest/removeBookmark`: Clear out your saved list

## 👑 Admin Powers

If you're an admin, you can:
1. Curate the best solution links for the community
2. Fine-tune how YouTube solutions are discovered

## 👏 Thanks To

- The teams at Codeforces, CodeChef, and LeetCode for their amazing platforms
- YouTube creators sharing their knowledge through solution videos
- Special thanks to TLE ELIMINATORS for providing this opportunity to work on this project

## Video :-


https://github.com/user-attachments/assets/d436c62f-9d58-406a-af98-14f7a4c64278




---

Happy coding! 💻
