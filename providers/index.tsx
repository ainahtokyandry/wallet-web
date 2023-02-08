import { PropsWithChildren } from "react";
import AuthProvider from "./Auth";

const providers = [AuthProvider];

const Providers = providers.reduce(
	(Prev, Curr) =>
		({ children }: PropsWithChildren) =>
			(
				<Prev>
					<Curr>{children}</Curr>
				</Prev>
			)
);

export default Providers;
