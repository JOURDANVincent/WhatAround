import {actionTypes} from '../constants/actionTypes';


export function userReducer(state, action) {

	switch (action.type) {

		// INSCRIPTION //
		case actionTypes.SIGN_UP: {
			return {
				...state,
				error: action.error,
				isLoading: action.isLoading,
				userId: action.userId,
				userData : action.userData,
				currentPosition: action.currentPosition
			};
		}

		// CONNEXION //
		case actionTypes.SIGN_IN: {
			return {
				...state,
				error: action.error,
				isLoading: action.isLoading,
				userId: action.userId,
				userData : action.userData,
				currentPosition: action.currentPosition
			};
		}

		// CONNEXION WITHOUT ACCOUNT //
		case actionTypes.SIGN_IN_UNKNOWN: {
			return {
				...state,
				error: action.error,
				isLoading: action.isLoading,
				userId: action.userId,
				userData : action.userData,
				currentPosition: action.currentPosition
			};
		}

		// DECONNEXION //
		case actionTypes.SIGN_OUT: {
			return {
				...state,
				error: null,
				userId: null,
				userData : [],
				isLoading: false, 
				currentPosition: null
			};
		}
		
		// DEFAUT //
		default:
			return state;
	}
}