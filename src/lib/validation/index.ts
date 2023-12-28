import * as z from 'zod'

const pswLen = 8;
const nameLen = 2

export const SignUpValidationSchema = z.object({
    name: z.string().min(nameLen, { message: `The name should be at least ${nameLen} characters long` }),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(pswLen, { message: `The password should be at least ${pswLen} characters long` }),
})