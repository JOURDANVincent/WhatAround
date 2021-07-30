import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';


const CategoryMenu = ( props ) => {

    const { navigation, toggleMenu, radius, setCategory } = props;

    const defaultChoice = [
        {term: 'restaurants', cat: 'restauration', selected: false}, // resto, food n drink
        {term: 'hotel', cat: 'hotel', selected: false}, // hotel et voyage
        {term: 'nightlife', cat: 'nightlife', selected: false}, // vie nocturne
        {term: 'shopping', cat: 'shopping', selected: false}, // shopping
        {term: 'active', cat: 'activities', selected: false}, // sport n active life life
        {term: 'eventservices,arts,localflavor', cat: 'event', selected: false} // festival et événement / culture
    ];

    const [ catChoice, setCatChoice] = useState(defaultChoice)
    const [ alias, setAlias] = useState(null)

    const upCatChoice = ( current ) => {
        
        let newChoice = catChoice.map( element => {
            
            if(element.cat == current) {
                element.selected = !element.selected
                setCategory(element.term)
            } else { element.selected = false}
            return element
        })

        setCatChoice(newChoice)
    }


    if(toggleMenu){

        return (

            <View style={{ width: '100%', backgroundColor: 'transparent', justifyContent: 'center', borderRadius: 24, paddingHorizontal: 5 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, marginBottom: 8 }}>
                    
                    { catChoice[0].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('restauration')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/restaurantWhite.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>Restauration</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('restauration')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/restaurantRed.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>Restauration</Text>
                        </TouchableOpacity>
                    }

                    { catChoice[1].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('hotel')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/hotel2White.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>hôtel</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('hotel')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/hotel2Red.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>hôtel</Text>
                        </TouchableOpacity>
                    }

                    { catChoice[2].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('nightlife')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/pubWhite.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>nocturne</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('nightlife')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/pubRed.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>nocturne</Text>
                        </TouchableOpacity>
                    }

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, marginBottom: 8 }}>

                    { catChoice[3].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('shopping')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/shoppingWhite.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>shopping</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('shopping')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/shoppingRed.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>shopping</Text>
                        </TouchableOpacity>
                    }

                    { catChoice[4].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('activities')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/sportWhite.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>activités</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('activities')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/sportRed.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>activités</Text>
                        </TouchableOpacity>
                    }

                    { catChoice[5].selected ? 
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('event')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/partyWhite.png')}
                            />
                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold',  }}>événement</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            style={{ width: '32%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                            onPress={ (cat) => upCatChoice('event')}
                        >
                            <Image
                                style={{ height: 40, resizeMode: 'contain', }}
                                source={require('../img/icon/partyRed.png')}
                            />
                            <Text style={{ color: '#E21232', fontSize: 14, fontWeight: 'bold',  }}>événement</Text>
                        </TouchableOpacity>
                    }
                    
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


export default CategoryMenu;