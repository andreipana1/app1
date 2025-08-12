# 🏡 RuralHop - Boutique Hotel Booking Platform

RuralHop is a modern, full-stack hotel booking application designed for rural and boutique hotels. Built with Next.js 15, TypeScript, and Prisma, it provides a seamless experience for both hotel owners and guests.

## ✨ Features

### For Guests
- 🔍 **Hotel Discovery**: Browse and search through a curated collection of rural and boutique hotels
- 🏨 **Hotel Categories**: From farm stays and mountain lodges to luxury resorts and spa retreats
- 📅 **Easy Booking**: Intuitive booking system with date selection
- ❤️ **Favorites**: Save and manage your favorite hotels
- 🗺️ **Interactive Maps**: Explore hotel locations with integrated mapping
- 📱 **Responsive Design**: Perfect experience across all devices

### For Hotel Owners
- 🏨 **Hotel Listings**: Create detailed hotel listings with photos and amenities
- 📊 **Booking Management**: Track and manage hotel reservations
- 💰 **Pricing Control**: Set competitive room rates
- 📈 **Property Analytics**: Monitor your hotel's performance

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom RuralHop theme
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **Image Upload**: Cloudinary
- **Maps**: Leaflet
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Data Fetching**: TanStack Query

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Database (PostgreSQL recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ruralhop-hotel-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # Database
   DATABASE_URL="your-database-url"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Cloudinary (for image uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   
   # Add other required environment variables
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your RuralHop application!

## 🎨 Design System

RuralHop features a carefully crafted design system inspired by rural landscapes:

### Color Palette
- **Forest Green** (`#2D5016`): Primary brand color
- **Meadow Green** (`#7FB069`): Fresh accents
- **Earth Brown** (`#8B4513`): Warm earth tones
- **Sand Beige** (`#F4E4BC`): Natural backgrounds
- **Stone Gray** (`#8D7053`): Neutral elements

## 📱 Key Components

- **Hotel Listings**: Browse hotels with filtering and search
- **Booking Modal**: Multi-step booking process
- **Interactive Maps**: Location-based hotel discovery
- **User Authentication**: Secure login and registration
- **Responsive Navigation**: Mobile-first design approach

## 🏨 Hotel Categories

- Boutique Hotels
- Farm Stays
- Mountain Lodges
- Lakeside Retreats
- Spa Resorts
- Historic Castles
- Eco Lodges
- Wine Country Hotels
- Luxury Resorts
- Beach Resorts
- Country Inns
- Unique Accommodations (Treehouses, etc.)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── actions/            # Server actions
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── store/              # Zustand stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── constants/          # App constants
```

## 🤝 Contributing

We welcome contributions to RuralHop! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License.

## 🌟 About RuralHop

RuralHop was created to connect travelers with unique rural and boutique hotel experiences. We believe in supporting local communities and providing authentic hospitality experiences away from the crowded city centers.

---

**Happy travels with RuralHop! 🏡✨**
