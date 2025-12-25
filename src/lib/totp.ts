import * as OTPAuth from 'otpauth';
import { Account } from '../types';

export function generateToken(account: Account): { token: string; period: number; timeLeft: number } {
  const totp = new OTPAuth.TOTP({
    issuer: account.issuer,
    label: account.accountName,
    algorithm: account.algorithm || 'SHA1',
    digits: account.digits || 6,
    period: account.period || 30,
    secret: OTPAuth.Secret.fromBase32(account.secret),
  });

  const token = totp.generate();
  
  // Calculate time left
  const period = account.period || 30;
  const epoch = Math.floor(Date.now() / 1000);
  const timeLeft = period - (epoch % period);

  return { token, period, timeLeft };
}
