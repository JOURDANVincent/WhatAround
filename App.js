import React,  { useState, useEffect, useReducer, useMemo, } from 'react';
import {StyleSheet, StatusBar } from 'react-native';


// WAITER SCREEN //
import Waiter from './src/components/Waiter';

// NAVIGATION //
import RootNavigator from './src/navigations/RootNavigator';

// REDUCERS //
import {userReducer} from './src/reducers/userReducer';
import {getUserActions} from './src/actions/userActions';

// CONTEXT //
import { MainContext } from './src/contexts/MainContext';

// MAPS //
import Geolocation from '@react-native-community/geolocation';
// Geolocation.setRNConfiguration();
// Geolocation.requestAuthorization();



const App = () => {

	// GEOLOCALISATION //
	const [ currentPosition, setCurrentPosition ] =  useState(null);
	const [ permissionIsGranted, setPermissionIsGranted ] =  useState(false);

	const RequestPermision = async () => {

        const permission = await MapboxGL.requestAndroidLocationPermissions();
		console.log('perm', permission)
        setPermissionIsGranted(true)
    } 

	getPosition = () => {

		console.log('trying to get user position..')

		Geolocation.getCurrentPosition(data => {

			const position = { lat: data.coords.latitude, lon: data.coords.longitude }
			console.log('current : ',position)
			setCurrentPosition(position)

		},
			(error => alert("Le gps est éteind..", error.code, error.message)))
	}

	useEffect(() => {
		
		getPosition()

	}, []);


	// REALM MONGO DB N REDUCERS //

	const [state, dispatch] = useReducer(userReducer, { // dispatch l'action
		isLoading: false,
		error: null,
		userId: null,
		currentPosition: [],
		userData: [],
	});

	const userContext = useMemo(() => {
		return getUserActions(dispatch);
	}, []);

	const useSelector = (callback) => { // récupère les states du reducer
		return callback(state)
	};
	
	const context = {userContext, useSelector} // génére context global 


    return (

		<MainContext.Provider value={context}>
				
			<StatusBar hidden={true} />
			
			{ !currentPosition ?
				<Waiter getPosition={getPosition} />
			:	
				<RootNavigator currentPosition={currentPosition} userId={state.userId} />
			}

		</MainContext.Provider>

    );
};


export default App;
