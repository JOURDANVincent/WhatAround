import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';


// REDUCER //
import { MainContext } from '../contexts/MainContext'

const SplashScreen = ( props ) => {

    const { navigation } = props;

    // récupère fonction signUp de Maincontext
    const context = useContext(MainContext)
    const { userContext, useSelector } = context
    const { signInUnknown } = userContext

    // const errorAlert = useUserSelector((userState) => { return userState.error; })erreur d'inscription //
    const errorAlert = useSelector((state) => { return state.error; })


    return (

        <ImageBackground 
            style={styles.container}
            source={require('../img/bg/Amiens2.png')}
        >

            <View style={{ height: '60%', width: '92%', backgroundColor: '#E21232dd', padding: 10, marginBottom: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5}} >
                <Image
                    style={{ height: '100%', width: '90%', resizeMode: 'contain', opacity: 0.9, }}
                    source={require('../img/logo/whatAroundBlack.png')} 
                />
                {/* <Text style={{ fontSize: 90 , color: 'white'}}>WHAT</Text>
                <Text style={{ fontSize: 50, color: 'white'}}>AROUND ?!</Text> */}
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#E21232', borderRadius: 10, marginHorizontal: '5%', elevation: 5 }}>
                
                <TouchableOpacity
                    style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderRightColor: '#fff8', borderRightWidth: 1}}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', backgroundColor: '#E21232', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }}>inscription</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => signInUnknown()}
                >
                    <Image
                        style={{ height: 25, width: 25, resizeMode: 'contain'}}
                        source={require('../img/icon/mapWhite.png')}
                    />
                    {/* <Text style={{ color: '#fff', }}>Entrez</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flex: 2, justifyContent: 'center', alignItems: 'center', borderLeftColor: '#fff8', borderLeftWidth: 1, elevation: 5}}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }}>connexion</Text>
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
        backgroundColor: '#fff'
    },
    
});


export default SplashScreen;