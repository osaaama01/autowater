export const SET_USER = 'SET_USER';
export const SET_LATEST_VERSION = 'SET_LATEST_VERSION';

const API_LOGIN = 'http://192.168.108.77:3000/api/v1.0/login';
const API_LATEST_VERSION = 'http://192.168.108.77:3000/api/v1.0/users/{userid}/version';

export const signIn = ({ name, password }) => {
	return (dispatch) => {
		fetch(
			API_LOGIN,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, password }),
			})
			.then(result => {
				if (result.ok) {
					return result.json();
				}
				throw new Error("API POST call failed.")
			})
			.then((data) => {
				dispatch(
					{
						type: SET_USER,
						payload: { id: data.data.user.id,name: data.data.user.name, isAuthenticated: true }
					}
				);
			},
				(error) => {
					throw new Error("API POST call failed.")
				}
			).catch((err) => console.log(err));
	}
}

export const getLatestVersion = (userid) => {
	return dispatch => {
		fetch(
			API_LATEST_VERSION.replace('{userid}', userid),
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			.then(result => result.json())
			.then((data) => {
				dispatch(
					{
						type: SET_LATEST_VERSION,
						payload: data.data
					}
				);
			},
				() => {
					throw new Error("API POST call failed.")
				}
			).catch((err) => console.log(err));
	}
}
