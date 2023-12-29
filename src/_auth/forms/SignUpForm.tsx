import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../components/ui/form';

import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';

import { Button } from '../../components/ui/button';
import { SignUpValidationSchema } from '../../lib/validation';
import React from 'react';
import Loader from '../../components/shared/loader';
import { Link, useNavigate } from 'react-router-dom';
import { createUserAccount } from '../../lib/appwrite/api';
import { useCreateUserAccount, useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SignUpForm = () => {
	const { toast } = useToast();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
	const { mutateAsync: createUserAccount, isPending: isCreateingUser } = useCreateUserAccount();
	const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
	const navigate = useNavigate();

	// 1. Define your form.
	const form = useForm<z.infer<typeof SignUpValidationSchema>>({
		resolver: zodResolver(SignUpValidationSchema),
		defaultValues: {
			username: '',
			name: '',
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
		// create user
		const newUser = await createUserAccount(values);

		if (!newUser) {
			return toast({
				title: 'Sign up failed. Please try again',
			});
		}

		const session = await signInAccount({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			return toast({ title: 'Sing in failed. Please try again.' });
		}

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			navigate('./');
		} else {
			toast({ title: 'Sign up failed. Please try again.' });
			return;
		}
	}

	//
	return (
		<Form {...form}>
			<div className='sm:w-420 flex-center flex-col'>
				<img
					src='/images/logo.svg'
					alt='logo'></img>
				<h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
				<p className='text-light-3 small-medium md:base-regular mt-2'>
					To use the app enter your account details
				</p>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full mt-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type='text'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										className='shad-input'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='shad-button_primary'>
						{isCreateingUser ? (
							<div className='flex-center gap-2'>
								<Loader />
								Loading...
							</div>
						) : (
							'Sign up'
						)}
					</Button>
					<p className='text-small-regular text-light-2 text-center mt-2'>
						Alredy have an account?
						<Link
							to='/sign-in'
							className='ml-1 text-purple-400 text-small-semibold'>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignUpForm;
