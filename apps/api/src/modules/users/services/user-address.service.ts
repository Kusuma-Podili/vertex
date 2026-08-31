import { Injectable } from '@nestjs/common';

export interface UserAddress {
  id: string;
  userId: string;
  title: string;
  recipient: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  phoneNumber: string;
  isDefault: boolean;
}

@Injectable()
export class UserAddressService {
  private addresses: UserAddress[] = [
    {
      id: 'addr-01',
      userId: 'usr-customer-john',
      title: 'Home HQ',
      recipient: 'John Doe',
      streetLine1: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
      countryCode: 'US',
      phoneNumber: '+1-555-0101',
      isDefault: true,
    }
  ];

  async getUserAddresses(userId: string): Promise<UserAddress[]> {
    return this.addresses.filter(a => a.userId === userId);
  }

  async addAddress(userId: string, address: Omit<UserAddress, 'id' | 'userId'>): Promise<UserAddress> {
    const newAddr: UserAddress = {
      id: `addr-${Date.now()}`,
      userId,
      ...address,
    };
    this.addresses.push(newAddr);
    return newAddr;
  }
}
