// Mock database implementation to replace Prisma
interface User {
  id: string;
  email: string;
  name: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
  favoriteIds?: string[];
  isAdmin?: boolean;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
}

interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
}

class MockDatabase {
  private users: User[] = [];
  private listings: Listing[] = [];
  private reservations: Reservation[] = [];

  user = {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      const user = this.users.find(u => 
        (where.email && u.email === where.email) || 
        (where.id && u.id === where.id)
      );
      return user || null;
    },

    create: async ({ data }: { data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      };
      this.users.push(user);
      return user;
    },

    findMany: async () => {
      return this.users;
    },

    update: async ({ where, data }: { where: { id: string }, data: Partial<User> }) => {
      const index = this.users.findIndex(u => u.id === where.id);
      if (index === -1) throw new Error('User not found');
      
      this.users[index] = {
        ...this.users[index],
        ...data,
        updatedAt: new Date(),
      };
      return this.users[index];
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const index = this.users.findIndex(u => u.id === where.id);
      if (index === -1) throw new Error('User not found');
      
      const deleted = this.users[index];
      this.users.splice(index, 1);
      return deleted;
    },
  };

  listing = {
    findMany: async ({ where }: { where?: any } = {}) => {
      return this.listings;
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      return this.listings.find(l => l.id === where.id) || null;
    },

    create: async ({ data }: { data: Omit<Listing, 'id' | 'createdAt'> }) => {
      const listing: Listing = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data,
      };
      this.listings.push(listing);
      return listing;
    },

    update: async ({ where, data }: { where: { id: string }, data: Partial<Listing> }) => {
      const index = this.listings.findIndex(l => l.id === where.id);
      if (index === -1) throw new Error('Listing not found');
      
      this.listings[index] = {
        ...this.listings[index],
        ...data,
      };
      return this.listings[index];
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const index = this.listings.findIndex(l => l.id === where.id);
      if (index === -1) throw new Error('Listing not found');
      
      const deleted = this.listings[index];
      this.listings.splice(index, 1);
      return deleted;
    },
  };

  reservation = {
    findMany: async ({ where }: { where?: any } = {}) => {
      return this.reservations;
    },

    findUnique: async ({ where }: { where: { id: string } }) => {
      return this.reservations.find(r => r.id === where.id) || null;
    },

    create: async ({ data }: { data: Omit<Reservation, 'id' | 'createdAt'> }) => {
      const reservation: Reservation = {
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        ...data,
      };
      this.reservations.push(reservation);
      return reservation;
    },

    delete: async ({ where }: { where: { id: string } }) => {
      const index = this.reservations.findIndex(r => r.id === where.id);
      if (index === -1) throw new Error('Reservation not found');
      
      const deleted = this.reservations[index];
      this.reservations.splice(index, 1);
      return deleted;
    },
  };
}

const globalForMockDb = globalThis as unknown as {
  mockDb: MockDatabase | undefined;
};

const prisma = globalForMockDb.mockDb ?? new MockDatabase();

if (process.env.NODE_ENV !== "production") globalForMockDb.mockDb = prisma;

export default prisma;