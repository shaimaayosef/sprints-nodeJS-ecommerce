/**
 * The Authntication provider for our app | v 0.1
 * created: 16/4/22
 * author: Sameh Hassan
 *
 * @format
 */

import { useState, createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
