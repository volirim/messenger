import { createHmac } from 'crypto';
import { secret } from 'src/models/auth';

export const createHmacFromString = (stringToHmac): string =>
  createHmac('sha256', secret).update(stringToHmac).digest('hex');
