import Error from "@/components/base/Error";
import { LOGIN } from "@/graphql/user";
import { useAuthContext } from "@/providers/Auth";
import { useMutation } from "@apollo/client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

const SignIn = () => {
	const divClasses = "flex flex-col w-full gap-2";
	const inputClasses = "p-2";
	const [err, setErr] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [token, setToken] = useAuthContext();

	const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const submitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		setErr("");
		if (email && password) await userLogin({ variables: { email, password } });
		else setErr("Form not filled");
	};

	const [userLogin] = useMutation(LOGIN, {
		onError({ message }: { message: string }) {
			setErr(message);
		},
		onCompleted(data) {
			localStorage.setItem("token", data.userLogin);
			setToken(data.userLogin);
		},
	});

	return (
		<main className="flex flex-col h-screen w-11/12 mx-auto justify-center gap-4">
			<Error>{err}</Error>
			<form className="flex flex-col gap-4" onSubmit={submitHandler}>
				<div className={divClasses}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						autoFocus
						value={email}
						className={inputClasses}
						onChange={emailChangeHandler}
						required
					/>
				</div>
				<div className={divClasses}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						className={inputClasses}
						value={password}
						onChange={passwordChangeHandler}
						required
					/>
				</div>
				<button className="uppercase">Submit</button>
			</form>
		</main>
	);
};

export default SignIn;
