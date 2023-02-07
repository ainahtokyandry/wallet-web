import gql from "graphql-tag";

const GET_USERS = gql`
	query {
		users {
			id
			email
		}
	}
`;

const CREATE_USER = gql`
	mutation ($email: String, $password: String) {
		createUser(email: $email, password: $password) {
			id
			email
		}
	}
`;

const LOGIN = gql`
	mutation ($email: String, $password: String) {
		userLogin(email: $email, password: $password) {
			token
		}
	}
`;
const UPDATE_TODO = gql`
	mutation UpdateTodo($id: ID!, $done: Boolean!) {
		updateTodo(id: $id, done: $done) {
			id
			title
			done
		}
	}
`;

const DELETE_TODO = gql`
	mutation DeleteTodo($id: ID!) {
		deleteTodo(id: $id) {
			id
			title
			done
		}
	}
`;

export { CREATE_USER, DELETE_TODO, GET_USERS, UPDATE_TODO, LOGIN };
