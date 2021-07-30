import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

// HEADER //
import MyHeader from '../components/MyHeader'
// COMPONENTS //
import CategoryMenu from '../components/CategoryMenu';
import AroundMenu from '../components/AroundMenu';
import CardItem from '../components/CardItem';

// MAPBOX GL //
import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("sk.eyJ1IjoibGVuZGVzeiIsImEiOiJja3FrcDlzbzYzc2lpMnBtdngxNzVpOHF5In0.BxvcSz7hFOONMHhz2lNLbA");


const MapScreen = ( props ) => {

    const { navigation, currentPosition } = props

    const [ search, setSearch ] = useState(null)

    const [ toggleMenu, setToggleMenu ] = useState(true)
    
    const [ radius, setRadius ] = useState('2000'); // périmètre de recherche
    const [ category, setCategory ] = useState(null)
    const [ aroundData, setAroundData ] = useState([]); // résulta recherche sur yelp
    const [ selectedItem, setSelectedItem ] = useState(null)
    

    const getAroundData = async () => {
        
        console.log('seraching ..', search)
        
		let id = '7l34sAxh_Oy3UicYnDFqhw'
		let key = 'RK9BvdqB4pat9WubUNEXmnAq8w9tTbHEQspC1G4bmymdl5WoiFcYYDjBKncJQev2wYFQNVbVXLFrINhkYQJ9CwZ2OQ-DGrIms0Z_hjijZ0Fapt7ZdZYKJmxXZZ3ZYHYx';

		let url = `https://api.yelp.com/v3/businesses/search?client_id=${id}&search=${search}&categories=${category}&longitude=${currentPosition.lon}&latitude=${currentPosition.lat}&radius=${radius}&limit=50`;
		
		try {
			
			await fetch(url, {
				method: "GET", //ou POST, PUT, DELETE, etc.
				headers: {
					'Authorization': `Bearer ${key}`,
				}
			})
            .then(res => res.json())
			.then(data => {
				console.log('around term data', data)
				setAroundData(data);
			})

		} catch (err) {
			console.error("Failed to connect at YELP..", err.message);
		}
	}

    useEffect(() => {

        if(search || category){
            console.log('get around ', search, category)
            getAroundData()
        } 
        
	}, [radius, search, category]);


    return (

        <View style={styles.container} >

            <MapboxGL.MapView
                styleURL={MapboxGL.StyleURL.Street}
                zoomLevel={14}
                animated={true}
                centerCoordinate={[currentPosition.lon, currentPosition.lat]}
                showUserLocation={true}
                style={{flex: 1, height: '100%', width: '100%', tintColor: 'gray' }}>
                    <MapboxGL.Camera
                        zoomLevel={14}
                        pitch={50}
                        size={80}
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
                                <Image style={{ height: 30 , width: 30}}
                                    source={require('../img/icon/mapRed.png')}
                                />
                            </MapboxGL.PointAnnotation>
                        )

                    }) : null }

            </MapboxGL.MapView>

            <MyHeader search={search} setSearch={setSearch} />

            <View style={{ position: 'absolute', bottom: 85, width: '100%', alignItems: 'center' }}>

                <CardItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} />

                {/* Menu categories */}
                    <CategoryMenu toggleMenu={toggleMenu} radius={radius} setCategory={setCategory}/>
                {/* Menu categories */}

                {/* Menu categories */}
                    <AroundMenu toggleMenu={toggleMenu} radius={radius} setRadius={setRadius} />
                {/* Menu categories */}
            </View>
            

        {/* Bottom tab choice */}
            <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingHorizontal: '4.5%'}}>
            
                <View style={{ flexDirection: 'row', minHeight: 50, backgroundColor: '#E21232', borderRadius: 10, elevation: 5 }}>
                    
                    <TouchableOpacity
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => {
                            setToggleMenu(false)
                            upSearchByCat(catChoice)
                        }}
                    >
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain'}}
                            source={require('../img/icon/mapWhite.png')}
                        />
                        <Text style={{ color: 'white'}}>démarrer !</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderLeftColor: '#fff', borderLeftWidth: 1, borderRightColor: '#fff', borderRightWidth: 1 }}
                        onPress={() => setToggleMenu(!toggleMenu)}
                    >
                        <Image
                            style={{ height: 18, width: 18, resizeMode: 'contain'}}
                            source={require('../img/icon/menuWhite.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => navigation.navigate('Filter', {aroundData: aroundData})}
                    >
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain'}}
                            source={require('../img/icon/homeWhite.png')}
                        />
                        <Text style={{ color: 'white'}}>accueil</Text>
                    </TouchableOpacity>

                </View>
            </View>
        {/* Bottom tab choice */}

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


export default MapScreen;