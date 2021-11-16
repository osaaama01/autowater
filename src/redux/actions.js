export const SET_USER = 'SET_USER';
export const SET_LATEST_VERSION = 'SET_LATEST_VERSION';

const API_LOGIN = 'https://next-app-eight-sandy.vercel.app/api/addActivity';
const API_LATEST_VERSION = 'https://next-app-eight-sandy.vercel.app/api/addActivity';

export const signIn = ({ username, password }) => {
	return dispatch => {
		fetch(
			API_LOGIN,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			})
			.then(result => result.json())
			.then((data) => {
				dispatch(
					{
						type: SET_USER,
						payload: { ...data, isAuthenticated: true }
					}
				);
			},
() => {
	throw new Error("API POST call failed.")
}
			).catch ((err) => console.log(err));
	}
}

export const getLatestVersion = ({ version }) => {
	return dispatch => {
		fetch(
			API_LATEST_VERSION,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: { currentVersion: version }
			})
			.then(result => result.json())
			.then((data) => {
				dispatch(
					{
						type: SET_LATEST_VERSION,
						payload: data
					}
				);
			},
				() => {
					throw new Error("API POST call failed.")
				}
			).catch((err) => console.log(err));
	}
}