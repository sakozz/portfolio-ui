import { z } from 'zod';

export const nameValidator = z
  .string()
  .min(5, 'Should be at least 5 Characters')
  .max(100, 'Should be at max 100 characters');

export const descriptionValidator = z.string().min(20, 'Should be at least 20 Characters');

export const emailValidator = z.string().email('Invalid email address');

export const phoneValidators = z
  .string()
  .regex(/^[0-9]{5,12}$/, 'Invalid phone number')
  .min(8, 'Phone should be at least 8 characters')
  .max(10, 'Phone should be at max 10 characters');
