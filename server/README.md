# AI Story Generator - Backend Server

This is the backend server for the AI Story Generator application, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Signup/Login/Logout)
- JWT-based authorization
- Password hashing with bcrypt
- Role-based access control (Admin/User)
- Cookie-based session management
- Cloudinary integration for file uploads
- MongoDB database integration

## Project Structure

```
server/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   └── database.js        # MongoDB configuration
├── controllers/
│   └── Auth.js            # Authentication controllers
├── middlewares/
│   └── auth.js            # Authentication & authorization middleware
├── models/
│   └── User.js            # User model schema
├── routes/
│   └── User.js            # User routes
├── index.js               # Main server file
├── package.json           # Dependencies
└── .env.example           # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server directory and add the following variables:

```env
PORT=4000
MONGODB_URL=mongodb://localhost:27017/ai-story-generator
JWT_SECRET=your_jwt_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**Note:** You can copy `.env.example` and rename it to `.env`, then fill in your actual values.

### 3. MongoDB Setup

Make sure MongoDB is installed and running on your system:

```bash
# For Windows (if installed as service)
net start MongoDB

# For macOS
brew services start mongodb-community

# For Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud database):
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string and use it as `MONGODB_URL`

### 4. Cloudinary Setup (Optional for Image Upload)

- Sign up at [Cloudinary](https://cloudinary.com/)
- Get your cloud name, API key, and API secret from the dashboard
- Add them to your `.env` file

### 5. Start the Server

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/signup` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | No |
| GET | `/api/v1/auth/test-auth` | Test authentication | Yes |
| GET | `/api/v1/auth/test-admin` | Test admin access | Yes (Admin) |
| GET | `/api/v1/auth/test-user` | Test user access | Yes (User) |

### Signup Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "accountType": "User"
}
```

### Login Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response Format

Success Response:
```json
{
  "success": true,
  "message": "User Login Success",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "accountType": "User",
    "image": "avatar_url"
  }
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## User Roles

- **Admin**: Full access to all features
- **User**: Standard user access

## Security Features

- Passwords are hashed using bcrypt (10 rounds)
- JWT tokens expire after 24 hours
- HTTP-only cookies for token storage
- CORS enabled for specified origins
- Protected routes with authentication middleware

## Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands

Example curl command for signup:
```bash
curl -X POST http://localhost:4000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123",
    "accountType": "User"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check if the `MONGODB_URL` in `.env` is correct
- For Atlas, ensure your IP is whitelisted

### CORS Issues
- Update the `origin` array in `index.js` if your frontend runs on a different port

### JWT Issues
- Make sure `JWT_SECRET` is set in `.env`
- Check if the token is being sent correctly in requests

## Next Steps

After setting up the backend:
1. Test all endpoints using Postman or similar tools
2. Integrate with the frontend
3. Add more features as needed

## Support

For issues or questions, please check the documentation or contact the development team.

