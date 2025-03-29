# Impress - Artist Portfolio & Artwork Marketplace

A modern web platform for artists to showcase and sell their artwork with advanced features including AR visualization.

## Features

- Home page with featured artworks
- Exhibition management (Past, Current, Future)
- Artwork gallery with advanced filtering
- Awards showcase
- Patron section
- Artist profile
- Press & Media coverage
- Testimonials
- Contact form
- Admin dashboard
- Shopping cart system
- AR visualization for artwork placement
- Social media integration
- User authentication

## Tech Stack

- Frontend: React.js, Three.js (for AR), TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Payment Integration: Stripe
- AR: AR.js, Three.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:

   - Create `.env` files in both frontend and backend directories
   - Add necessary environment variables (see .env.example files)

4. Start the development servers:

   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm start
   ```

### Running the Application

#### Running the Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Start the backend server:
   ```bash
   npm run dev OR node server.js OR npm start
   ```

#### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the frontend server:
   ```bash
   npm start
   ```

## Project Structure

```
impress/
├── frontend/           # React frontend application
├── backend/           # Node.js backend application
├── public/            # Static files
└── README.md          # Project documentation
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

✅ Mongodb + Cloudinary
