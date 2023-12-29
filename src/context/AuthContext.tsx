import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';

import { IContextType, IUser } from '../types';
import { getCurrentUser } from '../lib/appwrite/api';

export const INITIAL_USER: IUser = {
	id: '',
	name: '',
	email: '',
	username: '',
	imageUrl: '',
	bio: '',
};

const INITIAL_STATE: IContextType = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthentificated: false,
	setUser: () => {},
	setIsAuthentificated: () => {},
	checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(INITIAL_USER);
	const [isLoadiing, setIsLoadiing] = useState(false);
	const [isAuthentificated, setIsAuthentificated] = useState(false);
	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentUser();

			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount?.name,
					username: currentAccount?.username,
					imageUrl: currentAccount?.imageUrl,
					email: currentAccount?.email,
					bio: currentAccount?.bio,
				});
			}
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setIsLoadiing(false);
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		// localStorage.getItem('coockieFallback') === null ||
		if (localStorage.getItem('cookieFallback') === '[]') {
			navigate('/sign-in');
		}

		checkAuthUser();
	}, []);

	const contextValue = {
		user,
		setUser,
		isLoadiing,
		isAuthentificated,
		setIsAuthentificated,
		checkAuthUser,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useUserContext = () => useContext(AuthContext);
