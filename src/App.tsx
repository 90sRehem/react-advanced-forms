import { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, XCircle } from 'lucide-react'

import "./styles/global.css";
import { supabase } from "./lib/supabase";
import { Form } from "./components";
import { createUserFormSchema } from "./schemas";

type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;

function App() {
  const createUserForm = useForm<CreateUserFormSchema>({
    resolver: zodResolver(createUserFormSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    control,
  } = createUserForm;

  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userPassword)

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "techs",
  })

  const [output, setOutput] = useState<string>("");

  async function onSubmit(data: CreateUserFormSchema) {
    setOutput(JSON.stringify(data, null, 2));
    await supabase.storage.from("forms-react").upload(data.avatar.name, data.avatar)
  };

  function addTech() {
    append({ title: "" });
  }

  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col gap-10 items-center justify-center'>
      <FormProvider {...createUserForm}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Field>
            <Form.Label htmlFor="avatar">
              Avatar
            </Form.Label>

            <Form.Input type="file" name="avatar" />
            <Form.ErrorMessage field="avatar" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="name">
              Nome
            </Form.Label>
            <Form.Input type="name" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">
              E-mail
            </Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">
              Senha

              {isPasswordStrong
                ? <span className="text-xs text-emerald-600">Senha forte</span>
                : <span className="text-xs text-red-500">Senha fraca</span>}
            </Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Tecnologias

              <button
                type="button"
                onClick={addTech}
                className="text-emerald-500 font-semibold text-xs flex items-center gap-1"
              >
                Adicionar nova
                <PlusCircle size={14} />
              </button>
            </Form.Label>
            <Form.ErrorMessage field="techs" />

            {fields.map((field, index) => {
              const fieldName = `techs.${index}.title`

              return (
                <Form.Field key={field.id}>
                  <div className="flex gap-2 items-center">
                    <Form.Input type={fieldName} name={fieldName} />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                  <Form.ErrorMessage field={fieldName} />
                </Form.Field>
              )
            })}
          </Form.Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
          >
            Salvar
          </button>
        </Form>
      </FormProvider>
      <pre>
        <code>{output}</code>
      </pre>
    </main>
  )
}

export default App
