# RuralHOP - Pet-Friendly Rural Romania Rental Platform 🐾🏡

> **Successfully upgraded to August 2025 compatibility!** ✅

RuralHOP is a Next.js 15 pet-friendly rental platform designed specifically for rural Romania. Built as an enhanced Airbnb clone with specialized features for pet owners and rural accommodation seekers.

## 🎉 August 2025 Upgrade Complete

This project has been successfully upgraded to meet August 2025 compatibility requirements:

- ✅ **Next.js 15.4.5** with App Router
- ✅ **React 19.1.1** with Server Components
- ✅ **NextAuth v5 Beta** (5.0.0-beta.29) authentication
- ✅ **MongoDB Atlas 2025** compatibility
- ✅ **React Query v5** for state management
- ✅ **Enhanced pet-friendly features**

## 🐾 Pet-Friendly Features

### Custom Components
- **PetBadge**: Display pet-friendly status with amenities
- **RuralFilters**: Advanced filtering for pet accommodations
- **Pet Categories**: Dedicated pet-friendly property categories

### Database Schema
Enhanced with pet-specific fields:
- `petsAllowed` - Boolean flag for pet-friendly properties
- `petFee` - Optional pet accommodation fee
- `maxPets` - Maximum number of pets allowed
- `petAmenities` - Array of pet amenities (dog parks, pet beds, etc.)
- `isPetOwner` - User role flag for pet owners

## 🏗️ Tech Stack

### Core Framework
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.1** - UI library with Server Components
- **TypeScript 5.9.2** - Type safety
- **TailwindCSS 3.4.0** - Styling

### Authentication & Security
- **NextAuth v5 Beta** - Authentication (Google OAuth + Credentials)
- **@auth/prisma-adapter** - Database session management
- **bcryptjs** - Password hashing

### Database & Storage
- **Prisma 5.8.0** - ORM with MongoDB
- **MongoDB 6.3.0** - Database (Atlas 2025 compatible)
- **Cloudinary 2.7.0** - Image storage and processing

### State Management & Forms
- **React Query v5** - Server state management
- **Zustand 5.0.7** - Client state management
- **React Hook Form 7.62.0** - Form handling
- **Zod 4.0.15** - Schema validation

## 🚀 Getting Started

### Prerequisites
- Node.js 20.0.0 or higher
- MongoDB Atlas account (2025 compatible)
- Cloudinary account
- Google OAuth credentials (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ruralhop
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://..."
   DIRECT_URL="mongodb+srv://..."
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   # Or use the rural-specific schema:
   npx prisma generate --schema=./prisma/schema.ruralhop.prisma
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   ├── listings/      # Property management
│   │   └── reservations/  # Booking management
│   ├── favorites/         # User favorites
│   ├── listings/          # Property details
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── modals/           # Modal components
│   ├── inputs/           # Form inputs
│   ├── pet-badge.tsx     # Pet-friendly indicator
│   └── rural-filters.tsx # Rural/pet filtering
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
│   └── auth.ts          # NextAuth configuration
├── store/               # Zustand stores
└── types/               # TypeScript types

prisma/
├── schema.prisma         # Main database schema
└── schema.ruralhop.prisma # Rural-specific schema
```

## 🔧 Development

### Key Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint

# Database
npx prisma generate     # Generate Prisma client
npx prisma db push      # Push schema changes
npx prisma studio       # Open Prisma Studio

# Pet-friendly schema
npx prisma generate --schema=./prisma/schema.ruralhop.prisma
```

### Available Scripts
- `npm run dev` - Start development server with Prisma generation
- `npm run build` - Build production bundle with Prisma generation
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## 🐾 Pet-Friendly Usage

### For Property Owners
1. **List your property** with pet-friendly options
2. **Set pet fees** and maximum pet limits
3. **Add pet amenities** (dog parks, pet beds, fenced yards)
4. **Manage reservations** with pet information

### For Pet Owners
1. **Filter properties** by pet-friendly status
2. **View pet amenities** and restrictions
3. **Book accommodations** with pet details
4. **Access rural filters** for ideal pet destinations

### Pet-Friendly Categories
- 🐾 **Pet-Friendly** - Properties that welcome pets
- 🏚️ **Barns** - Rural barn accommodations
- 🏔️ **Countryside** - Mountain and rural locations
- 🏕️ **Camping** - Pet-friendly camping experiences

## 📚 Migration Documentation

For detailed information about the August 2025 upgrade:
- 📖 **[Migration Guide](RURALHOP_MIGRATION_GUIDE.md)** - Complete upgrade documentation
- 🐛 **[Error Log](RURALHOP_ERROR_LOG.md)** - Issues encountered and solutions

## 🛡️ Security & Compatibility

### NextAuth v5 Security Features
- Enhanced JWT token handling
- Improved session management
- Google OAuth + credential authentication
- MongoDB session storage

### Database Compatibility
- MongoDB Atlas 2025 ready
- Prisma 5.x optimized queries
- Enhanced pet-related data models
- TypeScript strict mode compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/pet-amenities`)
3. Commit your changes (`git commit -am 'Add pet amenity filtering'`)
4. Push to the branch (`git push origin feature/pet-amenities`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Airbnb clone foundation (MIT licensed)
- NextAuth.js team for authentication framework
- Prisma team for excellent ORM
- Vercel for Next.js framework
- Rural Romania pet-friendly accommodation community

---

**RuralHOP** - *Making rural Romania accessible for you and your pets* 🐾❤️

*Successfully upgraded for August 2025 compatibility - ready for deployment!* ✅
