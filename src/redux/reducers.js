import { SET_USER, SET_LATEST_VERSION } from "./actions";

const initialState = {
	user: {
		name: '',
		id: '',
		isAuthenticated: false,
	},
	version: {
		currentVersion: '',
		latestVersion: ''
	}
}

function userReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_LATEST_VERSION:
			return { ...state, version: action.payload };
		default:
			return state;
	}
}

export default userReducer;