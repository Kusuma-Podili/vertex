export interface SeedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ADMIN' | 'VENDOR' | 'SUPER_ADMIN' | 'SUPPORT_AGENT';
  phoneNumber?: string;
}

export const SEED_USERS: SeedUser[] = [
  {
    id: 'usr-admin-01',
    email: 'admin@ecommerce-enterprise.internal',
    firstName: 'Alexander',
    lastName: 'Wright',
    role: 'SUPER_ADMIN',
    phoneNumber: '+1-555-0199'
  },
  {
    id: 'usr-vendor-aero',
    email: 'merchant@aeroacoustics.io',
    firstName: 'Elena',
    lastName: 'Rostova',
    role: 'VENDOR',
    phoneNumber: '+1-555-0144'
  },
  {
    id: 'usr-customer-john',
    email: 'john.doe@enterprise-dev.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CUSTOMER',
    phoneNumber: '+1-555-0101'
  },
  {
    id: 'usr-customer-sarah',
    email: 'sarah.connor@cyberdyne.org',
    firstName: 'Sarah',
    lastName: 'Connor',
    role: 'CUSTOMER',
    phoneNumber: '+1-555-0102'
  }
];
