"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { FormContext } from "@/types/enums/form-context";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  setFormContext: (context: FormContext) => void;
}

const loginFormSchema = z.object({
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

export const LoginForm = ({ setFormContext }: LoginFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { errors } = form.formState;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // we define here, that we will use next-auth's handleLogin
    // the handleLogin function of next-auth is called signIn()
    const result = await signIn("credentials", {
      redirect: false, // prevents the automatic redirect
      email: values.email,
      password: values.password,
    });

    // handle success of error based on the result
    if (result?.error) {
      toast.error("Login failed, please try again", {
        position: "bottom-center",
      });
    } else {
      toast.success("Login successful", { position: "bottom-center" });
      router.push("/");
    }
  }

  return (
    <section>
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-2 font-semibold lg:text-3xl">Anmelden</h3>

          <p className="mb-8 w-7/12 text-muted-foreground text-sm">
            Haben Sie noch kein Konto?
            <span
              onClick={() => setFormContext(FormContext.REGISTER)}
              className="ml-1 cursor-pointer underline"
            >
              Registrieren Sie sich
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

              <span className="mb-4 text-sm self-start text-muted-foreground underline cursor-pointer">
                Passwort vergessen?
              </span>

              <Button type="submit" size="lg">
                Anmelden
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
