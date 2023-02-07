import { ChangeEvent, SyntheticEvent, useState } from "react";
import { GET_USERS, CREATE_USER } from "@/graphql/user";
import { useMutation } from "@apollo/client";
import Error from "@/components/base/Error";

const CreateUser = () => {
	// const { data, loading, error } = useQuery(GET_USERS);
	const [createUser] = useMutation(CREATE_USER, {
		refetchQueries: [{ query: GET_USERS }],
		onError(err: { message: string }) {
			setErr(err.message);
		},
	});
	const [err, setErr] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [canSubmit, setCanSubmit] = useState<boolean>(false);
	// const [updateTodo] = useMutation(UPDATE_TODO);
	// const [deleteTodo] = useMutation(DELETE_TODO, {
	// 	refetchQueries: [{ query: GET_TODOS }],
	// });

	const submitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		setErr("");
		await createUser({ variables: { email, password } });
	};

	const divClasses = "flex flex-col w-full gap-2";
	const inputClasses = "p-2";

	const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};
	const confirmationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (password) {
			setCanSubmit(e.currentTarget.value === password);
		}
	};

	return (
		<main className="flex flex-col h-screen w-11/12 mx-auto justify-center gap-4">
			<Error>{err}</Error>
			<form onSubmit={submitHandler} className="flex flex-col gap-4">
				<div className={divClasses}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						autoFocus
						id="email"
						onChange={emailChangeHandler}
						className={inputClasses}
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
				<div className={divClasses}>
					<label htmlFor="confirmation">Confirm password</label>
					<input
						type="password"
						id="confirmation"
						className={inputClasses}
						onChange={confirmationChangeHandler}
					/>
				</div>
				<button type="submit" className={"uppercase"} disabled={!canSubmit}>
					Submit
				</button>
			</form>
		</main>
	);
};

export default CreateUser;
