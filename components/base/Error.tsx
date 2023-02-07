import { PropsWithChildren } from "react";

const Error = ({ children }: PropsWithChildren) => {
	return <span className="text-red-500">{children}</span>;
};

export default Error;
