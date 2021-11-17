export const SET_USER = 'SET_USER';

const API_LOGIN = 'http://192.168.108.77:3000/api/v1.0/login';

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
						payload: {
							id: data.data.user.id,
							isAuthenticated: true,
							name: data.data.user.name
						}
					}
				);
			},
				(error) => {
					throw new Error("API POST call failed.")
				}
			).catch((err) => console.log(err));
	}
}

