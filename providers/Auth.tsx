import Router from "next/router";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

const Auth = createContext([] as any);

export default function AuthProvider({ children }: PropsWithChildren) {
	const [isSignedIn, setIsSignedIn] = useState<string>();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setIsSignedIn(token);
			Router.push("/");
		} else Router.push("/signin");
	}, []);
	return (
		<Auth.Provider value={[isSignedIn, setIsSignedIn]}>
			{children}
		</Auth.Provider>
	);
}

export function useAuthContext() {
	return useContext(Auth);
}
