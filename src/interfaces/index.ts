import * as z from 'zod';

export const RequestUserSchema = z.object({
  name: z.string().nonempty('Nome nao deve ser vazio'),
  email: z.string().email({ message: 'Email possui formato inválido' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve possui no mínimo 8 caracteres' }),
});

export type NewUserSchema = z.infer<typeof RequestUserSchema>;
