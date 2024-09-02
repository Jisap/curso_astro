


import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const registerUser = defineAction({
  accept: 'form',
    input: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(2),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }) =>{

    console.log({ name, email, password, remember_me });
    return true
  },
});