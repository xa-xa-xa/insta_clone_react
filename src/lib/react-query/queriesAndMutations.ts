import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, singInAccount } from '../appwrite/api';
import { ILoginUser, INewUser } from '../../types';

export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};

export const useSignInAccount = () => {
	return useMutation({
		mutationFn: (user: ILoginUser) => singInAccount(user),
	});
};