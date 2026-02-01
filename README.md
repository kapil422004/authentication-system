# Authentication System

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS. This application provides secure user registration, email verification, and password recovery functionality.

🔗 **Live Demo:** [https://authentication-system-pink-two.vercel.app/](https://authentication-system-pink-two.vercel.app/)

## Features

- **User Registration** - Secure account creation with email confirmation
- **Welcome Email** - Automated welcome email sent upon successful registration
- **Email Verification** - OTP-based email verification system
- **Password Recovery** - Forgot password functionality with OTP verification
- **Secure Authentication** - JWT-based authentication with HTTP-only cookies
- **Password Encryption** - Bcrypt hashing for secure password storage

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Bcrypt
- Nodemailer (SMTP)

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- Gmail account (for SMTP configuration)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd authentication-system
```

### 2. Client Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Server Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SENDER_EMAIL=your_email@gmail.com
```

**Important:** 
- Replace `your_mongodb_connection_string` with your actual MongoDB connection string
- Generate a strong random string for `JWT_SECRET`
- Use Gmail App Password for `SMTP_PASSWORD` (not your regular Gmail password)

### 4. Configure CORS

In `server/server.js`, add your frontend URL to the CORS configuration:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

## Running the Application

### Development Mode

**Start the server:**
```bash
cd server
npm start
```

**Start the client:**
```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173` and the server on `http://localhost:3000`.

## Project Structure

```
authentication-system/
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── node_modules/
    ├── routes/
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js
```

## Important Notes

### Email Verification Limitations

**⚠️ Note:** The email verification and OTP functionality will **not work** when the backend is deployed on Render's free tier, as Render blocks SMTP ports on their free plan. 

**Solution:** To test email functionality:
1. Download and run the project locally
2. Configure SMTP settings in your `.env` file
3. The email features will work perfectly in a local environment

For production deployment with email functionality:
- Use a paid hosting service that allows SMTP connections
- Or integrate a third-party email service like SendGrid, AWS SES, or Mailgun

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **HTTP-Only Cookies** - Prevents XSS attacks
- **Bcrypt Hashing** - Industry-standard password encryption
- **Environment Variables** - Sensitive data stored securely

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/verify-email` - Email verification with OTP
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository.

---

**Developed with ❤️ using MERN Stack**
