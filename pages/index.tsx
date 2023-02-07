import { LOGIN } from "@/graphql/user";
import { useMutation } from "@apollo/client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

const SignIn = () => {
	const divClasses = "flex flex-col w-full gap-2";
	const inputClasses = "p-2";
	const [err, setErr] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();

	const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const submitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		setErr("");
		await userLogin({ variables: { email, password } });
	};

	const [userLogin] = useMutation(LOGIN, {
		onError(err: { message: string }) {},
		onCompleted(data) {
			console.log(data);
		},
	});

	return (
		<form
			className="flex flex-col h-screen w-11/12 mx-auto justify-center gap-4"
			onSubmit={submitHandler}
		>
			<div className={divClasses}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					autoFocus
					className={inputClasses}
					onChange={emailChangeHandler}
				/>
			</div>
			<div className={divClasses}>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					className={inputClasses}
					onChange={passwordChangeHandler}
				/>
			</div>
			<button className="uppercase">Submit</button>
		</form>
	);
};

export default SignIn;
