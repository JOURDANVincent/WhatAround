import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import SplashScreen from '../SplashScreen';

import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("sk.eyJ1IjoibGVuZGVzeiIsImEiOiJja3FrcDlzbzYzc2lpMnBtdngxNzVpOHF5In0.BxvcSz7hFOONMHhz2lNLbA");

import Slider from '@react-native-community/slider';


const defaultVehiculesFilters = [
    {type: 'walk', selected: true},
    {type: 'bike', selected: false},
    {type: 'car', selected: false}
];


const FilterScreen = ( props ) => {

    const { navigation, route, currentPosition, search } = props
    const { actualFilters } = route.params

    const [ toggleCatMenu, setToggleCatMenu ] = useState(false)
    const [ toggleFilterMenu, setToggleFilterMenu ] = useState(false)
    const [ catFilters, setCatFilters] = useState(actualFilters)
    const [ vehiculeFilters, setVehiculeFilters] = useState(defaultVehiculesFilters)
    
    const [ radius, setRadius ] = useState('100'); // périmètre de recherche
    const [ aroundData, setAroundData ] = useState([]); // résulta recherche sur yelp

    const [ selectedItem, setSelectedItem ] = useState(null)
    
    console.log('filter', search)


    const toggleFilter = ( current ) => {
        
        let newFilters = catFilters.map( element => {
            
            if(element.cat == current) {
                element.selected = !element.selected
            }
            return element
        })

        // console.log(newFilters)
        setCatFilters(newFilters)
    }

    const toggleVehicule = ( current ) => {
        
        let newVehicules = vehiculeFilters.map( element => {
            
            if(element.type == current) {
                element.selected = !element.selected
            } else {
                element.selected = false
            }
            return element
        })

        // console.log(newVehicules)
        setVehiculeFilters(newVehicules)
    }

    const getAroundData = async () => {

        console.log('getAround !!')

		let id = '7l34sAxh_Oy3UicYnDFqhw'
		let key = 'RK9BvdqB4pat9WubUNEXmnAq8w9tTbHEQspC1G4bmymdl5WoiFcYYDjBKncJQev2wYFQNVbVXLFrINhkYQJ9CwZ2OQ-DGrIms0Z_hjijZ0Fapt7ZdZYKJmxXZZ3ZYHYx';
        // let radius = '2000' // distance autour en mètre
        let limit = '50' // nombre max de résultats

        // ajouter categories ou categories pour affiner recherche depuis les préference user
		let url = `https://api.yelp.com/v3/businesses/search?client_id=${id}&term=${search}&longitude=${currentPosition.lon}&latitude=${currentPosition.lat}&radius=${radius}&limit=${limit}`;
		
		try {
			
			await fetch(url, {
				method: "GET", //ou POST, PUT, DELETE, etc.
				headers: {
					'Authorization': `Bearer ${key}`,
				}
			})
            .then(res => res.json())
			.then(data => {
				console.log('around data', data)
				setAroundData(data);
			})

            setToggleMenu(false)

		} catch (err) {
			console.error("Failed to connect at YELP..", err.message);
		}
	}

    useEffect(() => {

		getAroundData()
        
	}, [radius, search]);



    return (

        <View style={styles.container} >

            { !currentPosition ?

                <SplashScreen />
            :
                <MapboxGL.MapView
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomLevel={12}
                    animated={true}
                    pitch={50}
                    centerCoordinate={[currentPosition.lon, currentPosition.lat]}
                    showUserLocation={true}
                    style={{flex: 1, height: '100%', width: '100%', tintColor: 'gray' }}>
                        <MapboxGL.Camera
                            zoomLevel={12}
                            centerCoordinate={[currentPosition.lon, currentPosition.lat]}
                        />
                        <MapboxGL.UserLocation 
                            showsUserHeadingIndicator={true}
                            animationMode={'flyTo'}
                            animationDuration={0.5}
                        />

                        { aroundData.length != 0 ? (aroundData.businesses).map(element => { 
                            
                            return(

                                <MapboxGL.PointAnnotation
                                    key={element.id}
                                    id={element.id}
                                    title={element.alias}
                                    coordinate={[element.coordinates.longitude, element.coordinates.latitude]}
                                    onSelected={() => {console.log(element); setSelectedItem(element)}}
                                >
                                    <View style={{
                                        height: 20, 
                                        width: 20, 
                                        backgroundColor: '#f005', 
                                        borderRadius: 50, 
                                        borderColor: 'red', 
                                        borderWidth: 1
                                    }} 
                                    />
                                </MapboxGL.PointAnnotation>
                            )

                        }) : null }

                </MapboxGL.MapView>
            }

            
            { selectedItem ?

                <View style={{ position: 'absolute', bottom: '17%', width: '95%', justifyContent: 'center', alignItems: 'center',  }}>
                    <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#fffd', borderRadius: 5, padding: 8, elevation: 3}}>
                        <View style={{ flex: 2, }}>
                            { selectedItem.image_url != '' ? 
                                <Image
                                    style={{ height: 110, width: '100%', resizeMode: 'contain', borderRadius: 3, overflow: 'hidden'}}
                                    source={{ uri: selectedItem.image_url}}
                                />
                                :
                                <View
                                    style={{ height: 110, width: '100%', backgroundColor: '#ccca', borderRadius: 3}}
                                />
                            }
                        </View>
                        <View style={{ flex: 3, paddingLeft: 10, }}>
                            <Text numberOfLines={1} style={{ flex: 1, fontSize: 18, fontWeight: 'bold', color: '#E21232', paddingTop: 5 }}>{(selectedItem.alias).replace('-', ' ')}</Text>
                            <View style={{ flex: 4, }}>
                                <Text style={{ flex: 1, fontSize: 16, color: '#444', }}>{selectedItem.phone}</Text>
                            </View>
                            <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: '#E21232', alignItems: 'flex-end' }}>{Math.round(selectedItem.distance) + " m"}</Text>
                        </View>
                        
                    </View>
                </View>
                
            : null}


            { toggleCatMenu ? 

                <View style={{ position: 'absolute', top: '2%', width: '100%', height: '84%', backgroundColor: '#fff0', justifyContent: 'center', borderRadius: 24, paddingHorizontal: 5, zIndex: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, marginBottom: 8 }}>
                        
                        { catFilters[0].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('restauration')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/pubWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>Restauration</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('restauration')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/pubRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>Restauration</Text>
                            </TouchableOpacity>
                        }

                        { catFilters[1].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('culture')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/museumWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>culture</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('culture')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/museumRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>culture</Text>
                            </TouchableOpacity>
                        }

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, marginBottom: 8 }}>
                        
                        { catFilters[2].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('visit')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/visitWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>visite</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('visit')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/visitRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>visite</Text>
                            </TouchableOpacity>
                        }

                        { catFilters[3].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('park')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/parkWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>détente</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('park')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/parkRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>détente</Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 5, marginBottom: 0 }}>
                        
                        { catFilters[4].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('activitie')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/sportWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>activités</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('activitie')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/sportRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>activités</Text>
                            </TouchableOpacity>
                        }

                        { catFilters[5].selected === true ? 
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#E21232dd', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('event')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/museumWhite.png')}
                                />
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold',  }}>événement</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity 
                                style={{ width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffe', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20, elevation: 8, }}
                                onPress={ (cat) => toggleFilter('event')}
                            >
                                <Image
                                    style={{ height: 60, resizeMode: 'contain', }}
                                    source={require('../img/icon/museumRed.png')}
                                />
                                <Text style={{ color: '#E21232', fontSize: 20, fontWeight: 'bold',  }}>événement</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    


                </View>
            : null }

            { toggleFilterMenu ? 

            <View style={{ position: 'absolute', bottom: '17%', width: '92%', backgroundColor: '#fffd', justifyContent: 'center', borderRadius: 24, paddingHorizontal: 5, elevation: 4 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, marginBottom: 8, marginTop: 15, }}>

                    { vehiculeFilters[0].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('walk')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/walkWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('walk')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/walkRed.png')}
                            />
                        </TouchableOpacity>
                    }

                    { vehiculeFilters[1].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('bike')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/bikeWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('bike')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/bikeRed.png')}
                            />
                        </TouchableOpacity>
                    }

                    { vehiculeFilters[2].selected ?
                        <TouchableOpacity
                            style={{ backgroundColor: '#E21232', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('car')}
                        >
                            <Image
                                style={{ height: 30, width: 30, resizeMode: 'contain'}}
                                source={require('../img/icon/carWhite.png')}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderColor: '#E21232', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingHorizontal: 20, marginHorizontal: 5, paddingVertical: 5, }}
                            onPress={() => toggleVehicule('car')}
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
                        <Text style={{ color: '#666'}}>{(parseInt(radius) / 1000) + ' km '}</Text>
                    }

                    <Slider
                        style={{width: '80%', height: 30}}
                        minimumValue={100}
                        maximumValue={2000}
                        // value={500}
                        step={100}
                        minimumTrackTintColor="#E2123288"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#E21232"
                        onValueChange={(value) => setRadius(Math.round(value))}
                    />

                </View>

            </View>
            : null }

            <View style={{ position: 'absolute', bottom: '4%', paddingHorizontal: '4.5%'}}>
                
                <View style={{ flexDirection: 'row', backgroundColor: '#E21232', borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 5, }}>

                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', padding: 15, borderRightColor: '#ccc', borderRightWidth: 1 }}
                            onPress={() => {
                                setToggleMenu(false)
                                setToggleFilterMenu(!toggleMenu)
                            }}
                        >
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain'}}
                                source={require('../img/icon/filterWhite.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center', padding: 15, }}
                            onPress={() => {
                                // setSelectedItem(null)
    
                                setToggleMenu(!toggleMenu)
                            }}
                        >
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain'}}
                                source={require('../img/icon/menuWhite.png')}
                            />
                        </TouchableOpacity>

                </View>

                
            </View>

        </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    
});


export default FilterScreen;