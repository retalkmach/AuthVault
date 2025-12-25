export enum AccountType {
  TOTP = 'totp',
  HOTP = 'hotp', // Reserved for future
}

export interface Account {
  id: string;
  issuer: string; // e.g., "Google", "GitHub"
  accountName: string; // e.g., "alice@example.com"
  secret: string; // Base32 encoded secret
  type: AccountType;
  period?: number; // Default 30
  digits?: number; // Default 6
  algorithm?: string; // Default SHA1
  createdAt: number;
}
