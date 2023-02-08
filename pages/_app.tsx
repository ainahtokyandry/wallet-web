import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Providers from "@/providers";

const client = new ApolloClient({
	uri: "/api/graphql",
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Providers>
				<Component {...pageProps} />
			</Providers>
		</ApolloProvider>
	);
}
