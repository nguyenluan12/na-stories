import { verify } from 'crypto';
import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
  .string()
  .refine((value) => (
    value.length >= 8 &&
    /[a-zA-Z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^a-zA-Z0-9]/.test(value)
  ), {
    message: 'Verify password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
  }),
    verifyPassword:z
    .string()
    .refine((value) => (
      value.length >= 8 &&
      /[a-zA-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^a-zA-Z0-9]/.test(value)
    ), {
      message: 'Verify password must be at least 8 characters long, contain at least one letter, one number, and one special character.'
    }),
    phoneNumber: z.string()
    .min(10, { message: 'Be at least 10 characters long' })
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    date:z.string()

})
export const SigninFormSchema = z.object({
  email: z.string(),
  password: z.string()
    
    
})
export const updateInforSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .refine((value) => value === '' || (
      value.length >= 8 &&
      /[a-zA-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^a-zA-Z0-9]/.test(value)
    ), {
      message: 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character, or be empty.'
    })
    ,
    verifyPassword:z
    .string()
    .refine((value) => value === '' || (
      value.length >= 8 &&
      /[a-zA-Z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[^a-zA-Z0-9]/.test(value)
    ), {
      message: 'Verify password must be at least 8 characters long, contain at least one letter, one number, and one special character, or be empty.'
    }),
  phoneNumber: z.string(),
  date: z.string(),
});

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
        verifyPassword?:string[]
      }
      message?: string
    }
  | undefined
  export const generateStoryForm = z.object({
    title:z.string()  
  })
  export type StoryFormState =
  | {
      errors?: {
        title?: string[]
        
      }
      message?: string
    }
  | undefined
export const LogoutForm =z.object({})