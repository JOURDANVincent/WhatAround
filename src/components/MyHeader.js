import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { TextInput  } from 'react-native-gesture-handler';


const MyHeader = ( props ) => {

    const { navigation, setSearch, search } = props

    return (
        
        // name == 'Home' ? 

            <View style={[styles.container, { minHeight: 70, paddingBottom: 15, }]}>

                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ 
                        // backgroundColor: '#fffc', 
                        color: '#E21232', fontSize: 32, fontWeight: 'bold', paddingHorizontal: 20, marginVertical: 5, borderRadius: 20}}>WHAT AROUND !?</Text>
                </View>  

                <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10,}}>
                    <TextInput
                        style={{zIndex: 999, width: '100%', backgroundColor: '#fffd', color: '#444', borderRadius: 10, paddingHorizontal: 20, elevation: 3}}
                        onChangeText={(search) => setSearch(search)}
                        // onSubmitEditing={(search) => updateSearch(search)}
                        value={search}
                        placeholder="Qu'y a t il autour de moi ..?"
                        placeholderTextColor='#555'
                    />
                </View>

            </View>

        // :
    
        //     <View style={{ position: 'absolute', top: 20, width: '100%', backfaceVisibility: 'visible', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10,}}>
        //         <TextInput
        //             style={{ width: '100%', backgroundColor: '#E21232dd', color: '#444', borderRadius: 10, paddingHorizontal: 20, elevation: 3}}
        //             onChangeText={(search) => setSearch(search)}
        //             // onSubmitEditing={(search) => updateSearch(search)}
        //             value={search}
        //             placeholder="Qu'est ce qu'il y a autour de moi ..?"
        //             placeholderTextColor='#ddd'
        //         />
        //     </View>
    )
}


const styles = StyleSheet.create({

    container: { 
        position: 'absolute',
        top: 5,
        width: '92%',
        marginLeft: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fffd',
        // backgroundColor: '#E2123220',
        // borderRadius: 10
    },

});


export default MyHeader;
