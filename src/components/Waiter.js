import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';


const Waiter = ( props ) => {

    const { navigation, getPosition } = props;

    return (

        <ImageBackground 
            style={styles.container}
            source={require('../img/bg/Amiens2.png')}
        >

            <View style={{ height: '100%', width: '92%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: '100%', backgroundColor: '#E21232dd', marginBottom: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5}} >
                    <Image
                        style={{ height: '40%', width: '80%', resizeMode: 'contain', opacity: 0.9, }}
                        source={require('../img/icon/mapWhite.png')} 
                    />
                    <Text style={{ fontSize: 90 , color: 'white'}}>WHAT</Text>
                    <Text style={{ fontSize: 50, color: 'white'}}>AROUND ?!</Text>
                </View>

                <TouchableOpacity
                    style={{ width: '100%', }}
                    onPress={getPosition}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', backgroundColor: '#E21232', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, textAlign: 'center' }}>Position</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    
});


export default Waiter;