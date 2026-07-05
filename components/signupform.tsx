"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Controller } from "react-hook-form";
import {
    Field,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const signupSchema = z.object({
    email: z.email("Please Enter A Valid Email Address"),
    password: z.string().min(1, "Password Is Required"),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Don't Match",
    path:["confirmPassword"]
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm() {
    const router = useRouter();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: SignupFormValues) => {
        await authClient.signUp.email({
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },
        {
            onSuccess: () => {
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
            },
        }
    )
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card >
                <CardHeader className="text-center">
                    <CardTitle>Create An Account</CardTitle>
                    <CardDescription>
                        Sign Up To Create An Account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input type="email" placeholder="m@example.com" {...field} />
                                            <FieldError errors={[form.formState.errors.email]} />
                                        </Field>
                                    )} />
                                <Controller
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>Password</FieldLabel>

                                            <Input type="password" placeholder="*********" {...field} />

                                            <FieldError errors={[form.formState.errors.password]} />
                                        </Field>
                                    )} />
                                <Controller
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>Confirm Password</FieldLabel>

                                            <Input type="password" placeholder="*********" {...field} />

                                            <FieldError errors={[form.formState.errors.confirmPassword]} />
                                        </Field>
                                    )} />
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    Sign Up
                                </Button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}
                                >
                                    Continue With Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    type="button"
                                    disabled={isPending}
                                >
                                    Continue With GitHub
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already Have A Account?{" "}
                                <Link href="/login"
                                    className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}