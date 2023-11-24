/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppState } from "@/context/appContext";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { setUserState } = AppState();
  const navigate = useNavigate();

  const form = useForm();

  async function onSubmit(user: any) {
    setIsLoading(true);
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}admin/login`,
      user,
    );
    setIsLoading(false);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserState(data.user);
    navigate("/search");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...form.register("email", { required: true })}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...form.register("password", { required: true })}
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
