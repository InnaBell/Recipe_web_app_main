"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormInput } from "./form-input";
import { FormContext } from "@/types/enums/form-context";
import { handleSignup } from "@/actions/auth-actions";
import { toast } from "sonner";

interface RegisterFormProps {
  setFormContext: (context: FormContext) => void;
}

const registerFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    }),
});

export const RegisterForm = ({ setFormContext }: RegisterFormProps) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const response = await handleSignup(values.email, values.password);

    if (response.status === 201) {
      toast.success("Signup successful, you can login now", {
        position: "bottom-center",
      });
      setFormContext(FormContext.LOGIN);
    } else {
      toast.error(response.message, { position: "bottom-center" });
    }
  }

  return (
    <section>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-2 font-semibold lg:text-3xl">Registrieren</h3>

          <p className="mb-8 w-7/12 text-muted-foreground text-sm">
            Haben Sie ein Konto?
            <span
              onClick={() => setFormContext(FormContext.LOGIN)}
              className="ml-1 cursor-pointer underline"
            >
              Melden Sie sich an
            </span>
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-10/12 gap-4 sm:w-8/12"
            >
              <div className="flex flex-col gap-2 w-full">
                <small className="self-start font-medium">E-Mail *</small>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormInput errors={errors}>
                      <Input {...field} />
                    </FormInput>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <small className="self-start font-medium">Passwort *</small>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormInput errors={errors}>
                      <Input type="password" {...field} />
                    </FormInput>
                  )}
                />
              </div>

              <Button type="submit" size="lg">
                Registrieren
              </Button>
            </form>
          </Form>
        </div>

        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/session-image.jpg`}
          alt="Tablet mit Rezepten auf dem Küchentisch"
          className="hidden lg:block max-h-[500px] w-full object-cover rounded-md"
        />
      </div>
    </section>
  );
};
