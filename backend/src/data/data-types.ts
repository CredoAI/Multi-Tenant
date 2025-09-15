export enum BusinessType {
  Restaurant = 'restaurant',
  Cafe = 'cafe',
  Barbershop = 'barbershop',
  BeautySalon = 'beauty-salon',
  LadiesWear = 'ladies-wear',
  MenWear = 'men-wear',
  ClothingStore = 'clothing-store',
  ShoeStore = 'shoe-store',
  ElectronicsStore = 'electronics-store',
  MobileShop = 'mobile-shop',
  Supermarket = 'supermarket',
  Bakery = 'bakery',
  Pharmacy = 'pharmacy',
  Clinic = 'clinic',
  Dentist = 'dentist',
  Gym = 'gym',
  Spa = 'spa',
  Mechanic = 'mechanic',
  CarWash = 'car-wash',
  Bookstore = 'bookstore',
  GiftShop = 'gift-shop',
  FurnitureStore = 'furniture-store',
  Ecommerce = 'ecommerce',
  Other = 'other',
}

export enum WhatSappConnectionStatus {
  Connected = 'connected',
  NotConnected = 'not-connected',
  Disconnected = 'disconnected',
}

export enum UserTypes {
  Owner = 'owner',
  Admin = 'admin', // Full system control
  Manager = 'manager', // Manages branches/employees
  Staff = 'staff', // Regular employee
}

export enum ProductStatusTypes {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export enum SubstriptionStatusTypes {
  active = "active",
  cancelled = "cancelled",
  expired = "expired",
  pending = "pending"
}

export enum CreditTransactionTypes {
  credit_add = "creditAdd",
  credit_use ="creditUse",
  credit_expire = "creditExpire"
}

export const supportedBusinessTypes = Object.values(BusinessType);
