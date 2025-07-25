# Next.js Fullstack Airbnb Clone

A modern, full-featured Airbnb clone built with Next.js 13, React, Prisma, MongoDB, NextAuth, and Tailwind CSS. This application provides a complete property rental platform with features for both hosts and guests.

## Features

- 🔐 **Authentication**: Email/password and social login (Google) using NextAuth
- 🏠 **Property Listings**: Create, browse, and search for properties
- 🔍 **Advanced Filtering**: Filter properties by category, date range, location, and more
- 📅 **Reservation System**: Book properties with date selection
- 💰 **Pricing Calculation**: Automatic price calculation based on duration
- 📍 **Map Integration**: Interactive maps for property locations using Leaflet
- 📱 **Responsive Design**: Fully responsive UI for all devices
- 🖼️ **Image Upload**: Cloudinary integration for property images
- ❤️ **Favorites System**: Save and manage favorite properties
- 👤 **User Profiles**: Manage your properties, trips, and reservations
- 🔄 **Real-time Updates**: Instant UI updates using React Query

## Tech Stack

### Frontend
- **Next.js 13** (App Router): React framework
- **React 18**: UI library
- **TailwindCSS**: Utility-first CSS framework
- **React Hook Form**: Form validation
- **React Query**: Data fetching and caching
- **Zustand**: State management
- **React Leaflet**: Maps integration
- **React Date Range**: Date picker for reservations

### Backend
- **Next.js API Routes**: Backend API
- **Prisma**: ORM for database operations
- **MongoDB**: Database
- **NextAuth.js**: Authentication
- **Cloudinary**: Image hosting and management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn
- MongoDB database (local or Atlas)
- Cloudinary account
- Google OAuth credentials (for social login)

## Environment Setup

1. Clone the repository
2. Copy the `.env.example` file to `.env` and fill in the required values:

```
# Database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/airbnb
DIRECT_URL=mongodb+srv://username:password@cluster.mongodb.net/airbnb

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

## Installation and Running

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. Push the database schema to your MongoDB instance:
```bash
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
next-fullstack-airbnb/
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
├── src/
│   ├── actions/           # Server actions for data operations
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── favorites/     # Favorites page
│   │   ├── listings/      # Listings pages
│   │   ├── properties/    # User properties management
│   │   ├── reservations/  # Reservations management
│   │   └── trips/         # User trips
│   ├── components/        # React components
│   │   ├── inputs/        # Form inputs
│   │   ├── listings/      # Listing components
│   │   ├── modals/        # Modal dialogs
│   │   └── navbar/        # Navigation components
│   ├── constants/         # Application constants
│   ├── hooks/             # Custom React hooks
│   ├── providers/         # Context providers
│   ├── store/             # State management (Zustand)
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── .env                   # Environment variables
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Deployment

This application can be deployed on Vercel, the platform from the creators of Next.js:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Cloudinary](https://cloudinary.com/) - Image and video management
- [MongoDB](https://www.mongodb.com/) - Document database
