import {ObjectId} from 'bson';


export function getUserActions(dispatch) { // ??!! rajouter base firebase !!?? //

	return {

		// CONNEXION //
		signIn: async data => {

			const {email, password} = data;

			try {

				dispatch({type: 'SIGN_IN', isLoading: true});
				
				// ------ inclure firebase ------ //

				dispatch({type: 'SIGN_IN', userId: '1234', isLoading: false}); //#//
				
			} catch (error) {
				console.log(
					"l'authentification a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_IN', error: error.message});
			}
		},

		// CONNEXION WITHOUT ACCOUNT //
		signInUnknown: async () => {

			// const {email, password} = data;

			try {

				dispatch({type: 'SIGN_IN_UNKNOWN', isLoading: true});
				
				// ------ inclure firebase ------ //

				dispatch({type: 'SIGN_IN_UNKNOWN', userId: 'unknown', isLoading: false}); //#//
				
			} catch (error) {
				console.log(
					"l'authentification a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_IN_UNKNOWN', error: error.message});
			}
		},


		// DECONNEXION //
		signOut: async () => {

			try {
				
				// ------ inclure firebase ------ //

				dispatch({type: 'SIGN_OUT'});
				console.log('successfully unlogged');

			} catch (error) {
				console.log(
					"la deconnexion a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_OUT', error: error.message});
			}
		},

		// INSCRIPTION //
		signUp: async data => {

			const  {email, password, lastname, firstname,  } = data;

			try { // SIGNUP in firebase //

				dispatch({type: 'SIGN_UP', isLoading: true});
				
				console.log('new user data is added in DB !!') 

				dispatch({type: 'SIGN_UP', userId: '1234', userData: data, isLoading: false}); //#//

			} catch (error) {
				console.log(
					"l'enregistrement en base a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_UP', error: error.message});
			}
		},

		// ACK ERREUR //
		ackErrorLog: async () => {

			try {

				dispatch({type: 'ACK_ERROR_LOG', error: null});
				console.log('erreur acquitée')

			} catch (error) {
				console.log(
					"l'acquittement a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'ACK_ERROR_LOG', error: error.code});
			}
		},

		// // GET USER DATA //
		// getErrorLog= () => {

		// 	try {

		// 		dispatch({type: 'SIGN_UP', error: null});
		// 		console.log('erreur acquitée')

		// 	} catch (error) {
		// 		console.log(
		// 			"l'acquittement a échouée avec l'erreur : ",
		// 			error.code,
		// 			error.message,
		// 		);
		// 		dispatch({type: 'SIGN_UP', error: error.code});
		// 	}
		// }
	};
}
