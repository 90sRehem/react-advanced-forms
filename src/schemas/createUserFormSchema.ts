import { z } from "zod"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../config"

export const createUserFormSchema = z.object({
    name: z.string().nonempty({
        message: 'O nome é obrigatório',
    }).transform(name => {
        return name
            .trim()
            .split(' ')
            .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
            .join(' ')
    }),
    email: z.string().nonempty({
        message: 'O e-mail é obrigatório',
    }).email({
        message: 'Formato de e-mail inválido',
    }).toLowerCase(),
    password: z.string().nonempty({
        message: 'A senha é obrigatória',
    }).min(6, {
        message: 'A senha precisa ter no mínimo 6 caracteres',
    }),
    techs: z.array(z.object({
        title: z.string().nonempty({ message: 'O nome da tecnologia é obrigatório' })
    })).min(3, {
        message: 'Pelo menos 3 tecnologias devem ser informadas.'
    }),
    avatar: z.instanceof(FileList)
        .refine((files) => !!files.item(0), "A imagem de perfil é obrigatória")
        .refine((files) => files[0]?.size <= MAX_FILE_SIZE, `Tamanho máximo de 5MB`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
            "Formato de imagem inválido"
        ).transform(files => {
            return files?.item(0)!
        }),
})