import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { importSchema } from "graphql-import";
import { PrismaClient } from "@prisma/client";
import { ServerResponse, IncomingMessage } from "http";
import { NextApiRequest } from "next";
import User from "@/types/user";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import jwt from "jsonwebtoken";

const typeDefs = importSchema("graphql/schema.graphql");
const prisma = new PrismaClient();

const resolvers = {
	Query: {
		users: async () => {
			return await prisma.user.findMany();
		},
		user: async (_parent: any, args: User) => {
			return await prisma.user.findUnique({
				where: {
					id: args.id,
				},
			});
		},
	},
	Mutation: {
		createUser: async (_: any, args: User) => {
			const SALTROUND = Number(process.env.SALTROUND);
			const password = await bcrypt.hash(
				`wallet.ata user ${args.password}`,
				SALTROUND
			);

			try {
				return await prisma.user.create({
					data: {
						email: args.email,
						password,
					},
				});
			} catch (e: any) {
				throw new GraphQLError("Email already used");
			}
		},
		userLogin: async (_: any, args: User) => {
			const user = await prisma.user.findUnique({
				where: { email: args.email },
			});
			if (!user) {
				throw new GraphQLError("No user found");
			}
			const isSame = await bcrypt.compare(
				`wallet.ata user ${args.password}`,
				user.password
			);

			if (isSame) {
				return jwt.sign(
					{ id: user.id, email: user.email },
					`${process.env.JWT_AUTH}`
				);
			} else {
				throw new GraphQLError("Wrong password");
			}
		},
		// updateTodo: async (_parent: any, args: { id: any; done: any }) => {
		// 	return await prisma.todo.update({
		// 		where: {
		// 			id: args.id,
		// 		},
		// 		data: {
		// 			done: args.done,
		// 		},
		// 	});
		// },
		// deleteTodo: async (_parent: any, args: { id: any }) => {
		// 	return await prisma.todo.delete({
		// 		where: {
		// 			id: args.id,
		// 		},
		// 	});
		// },
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const apolloServer = new ApolloServer({
	schema,
	context: (request) => {
		return {
			...request,
			prisma: new PrismaClient(),
		};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const serverStart = apolloServer.start();

export default async function handler(
	req: NextApiRequest,
	res: ServerResponse<IncomingMessage>
) {
	await serverStart;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
}
