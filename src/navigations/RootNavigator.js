import React, { useState } from 'react';

// navigation //
import { NavigationContainer } from '@react-navigation/native';
import ConnectionStackNavigator from './ConnectionStackNavigator'
import UserStackNavigator from './UserStackNavigator';
import UnknownStackNavigator from './UnknownStackNavigator';


const RootNavigator = ( props ) => {

    const { navigation, currentPosition, userId } = props 

        // RECHERCHE //
	const [ search, setSearch ] = useState(null);


    return (
        
        <NavigationContainer>

            { !userId ?
                <ConnectionStackNavigator />
            :
                userId == 'unknown' ?
                    <UserStackNavigator currentPosition={currentPosition} search={search} setSearch={setSearch} />
                :
                    <UnknownStackNavigator currentPosition={currentPosition} search={search} setSearch={setSearch} />
            }
        
        </NavigationContainer>
    )
}

export default RootNavigator;
