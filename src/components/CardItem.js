import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';


const CardItem = ( props ) => {

    const { navigation, selectedItem, setSelectedItem } = props;

    return (

        selectedItem ?

            <View style={{ position: 'absolute', bottom: 0, width: '95%', justifyContent: 'center', alignItems: 'center',  }}>
                <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#fffd', borderRadius: 5, elevation: 3}}>
                    <View style={{ flex: 2, padding: 5 }}>
                        { selectedItem.image_url != '' ? 
                            <Image
                                style={{ height: 120, width: '100%', resizeMode: 'cover', borderRadius: 5, overflow: 'hidden',}}
                                source={{ uri: selectedItem.image_url}}
                            />
                            :
                            <View
                                style={{ height: 110, width: '100%', backgroundColor: '#ccca', borderRadius: 3}}
                            />
                        }
                    </View>
                    <View style={{ flex: 4, paddingLeft: 10, padding: 5}}>
                        <View style={{ flex: 1, flexDirection: 'row',}}>
                            <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, fontWeight: 'bold', color: '#E21232', paddingTop: 5 }}>{(selectedItem.alias).replace('-', ' ')}</Text>
                            <TouchableOpacity
                                onPress={() => setSelectedItem(null)}
                            >
                                <Image style={{ height: 12, width: 12, marginHorizontal: 10, marginTop: 5 }}
                                    source={require('../img/icon/cancel.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2, width: '100%' }}>
                            <Text style={{ fontSize: 16, color: '#444', }}>{selectedItem.display_phone}</Text>
                            <Text style={{ fontSize: 14, color: '#444', }} numberOfLines={1} >{selectedItem.location.address1}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row',}}>
                            <Text style={{ flex: 2, fontSize: 18, fontWeight: 'bold', color: '#E21232', textAlignVertical: 'bottom' }}>{Math.round(selectedItem.distance) + " m"}</Text>
                            <Image style={{ height: 25, width: 25, marginHorizontal: 25 }}
                                source={require('../img/icon/infoBlack.png')}
                            />
                            <Image style={{ height: 25, width: 25, marginRight: 5 }}
                                source={require('../img/icon/favoriteBlack.png')}
                            />
                        </View>
                    </View>
                    
                </View>
            </View>

        : null
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


export default CardItem;