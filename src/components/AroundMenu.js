import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';

import Slider from '@react-native-community/slider';


const AroundMenu = ( props ) => {

    const { navigation, toggleMenu, radius, setRadius, } = props;

    const defaultVehicules = [
        {type: 'walk', selected: true, minRadius: '100', maxRadius: '2000' },
        {type: 'bike', selected: false, minRadius: '500', maxRadius: '5000' },
        {type: 'car', selected: false, minRadius: '1000', maxRadius: '10000' }
    ];

    const [ vehicleChoice, setVehicleChoice] = useState(defaultVehicules)
    const [ range, setRange ] = useState([50, 1000])

    const upVehicleChoice = ( current ) => {
        
        let newVehicules = vehicleChoice.map( element => {
            
            element.selected = element.type == current ? !element.selected : false
            element.selected ? setRange([element.minRadius, element.maxRadius]) : null
            element.selected ? setRadius(element.maxRadius) : null
            
            return element
        })

        // console.log(newVehicules)
        setVehicleChoice(newVehicules)
    }


    if(toggleMenu){

        return (

            <View style={{ width: '92%', backgroundColor: '#fffd', justifyContent: 'center', borderRadius: 24, paddingHorizontal: 5, elevation: 4, }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, marginBottom: 8, marginTop: 15, }}>

                    { vehicleChoice[0].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('walk')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/walkWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('walk')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/walkRed.png')}
                            />
                        </TouchableOpacity>
                    }

                    { vehicleChoice[1].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('bike')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/bikeWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('bike')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/bikeRed.png')}
                            />
                        </TouchableOpacity>
                    }

                    { vehicleChoice[2].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('car')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/carWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => upVehicleChoice('car')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/carRed.png')}
                            />
                        </TouchableOpacity>
                    }
                    

                </View>

                <View style={{ marginLeft: '10%', width: '80%', height: 1, backgroundColor: '#bbb'}}></View>

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, marginBottom: 8 }}>
                    
                    <Text style={{ color: '#E21232', marginBottom: 10, fontSize: 16, fontWeight: 'bold',}}>Périmètre de recherche</Text>
                    { parseInt(radius) <= 2000 ?
                        <Text style={{ color: '#666', fontSize: 20, fontWeight: 'bold',}}>{radius + ' m '}</Text>
                    :
                        <Text style={{ color: '#666', fontSize: 20, fontWeight: 'bold' }}>{(parseInt(radius) / 1000) + ' km '}</Text>
                    }

                    <Slider
                        style={{width: '80%', height: 30}}
                        minimumValue={Number(range[0])}
                        maximumValue={Number(range[1])}
                        value={Number(radius)}
                        step={100}
                        minimumTrackTintColor="#E2123288"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#E21232"
                        onValueChange={(value) => setRadius(Math.round(value))}
                    />

                </View>

            </View>
        )

    } else { return null }

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


export default AroundMenu;