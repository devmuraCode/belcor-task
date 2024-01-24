'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '@/app/providers/storeProvider/store';
import { RoutePath } from '@/shared/config/routeConfig/routes';
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

import { loginUser } from '../service/loginUserService';
import { resetLoginState } from '../slice/LoginSlice';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters.' }),
});

export function UserAuthForm() {
  const { loading, userInfo, error } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate(RoutePath.main);
      dispatch(resetLoginState());
    }
  }, [navigate, userInfo]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginUser(values));
  }

  return (
    <Form {...form}>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          Неправильное имя пользователя или пароль
        </div>
      )}
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
        <Button isLoading={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
