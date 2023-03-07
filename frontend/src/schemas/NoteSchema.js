import { object, string } from 'yup';

export const noteSchema = object({
    subject: string().required(),
    imageLink: string().nullable(),
    body: string().max(255).required()
});