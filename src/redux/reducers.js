import { SET_USER, SET_LATEST_VERSION } from "./actions";

const initialState = {
	user: {
		username: '',
		isAuthenticated: false,
		appVersion: '',
		latestVersion: ''
	}
}

function userReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_LATEST_VERSION:
			return { ...state, users: action.payload };
		default:
			return state;
	}
}

export default userReducer;