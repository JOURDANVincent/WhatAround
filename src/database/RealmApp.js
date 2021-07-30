import Realm from 'realm';

// Returns the shared instance of the Realm app.
// let private = "7913620b-0065-48d8-949d-44137ae24abc"
	// let public = "rfgakhnu"
	
export const getRealmApp = () => {

	const appId = "whataround-aynbk"

	const appConfig = {

		id: appId,
		timeout: 10000,
	};

	return new Realm.App(appConfig);
}		