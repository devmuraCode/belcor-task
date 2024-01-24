'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { authUser } from '@/features/Auth/service/authUser';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button } from '@/widgets/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/widgets/Form/Form';
import { Input } from '@/widgets/Input/input';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' }),
});

export function UserAuthForm() {
  const dispatch = useAppDispatch();
  const authSlice = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [authSlice, navigate]);
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(authUser());
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
