import { SET_USER } from "./actions";

const initialState = {
	user: {
		name: '',
		id: '',
		isAuthenticated: false,
	}
}

function userReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
}

export default userReducer;