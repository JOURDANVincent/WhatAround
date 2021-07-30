import React, { useState, useEffect, useContext } from "react";
import { Text,StyleSheet, View, TouchableOpacity,ScrollView } from "react-native";
import Slider from '@react-native-community/slider';


// CONTEXT //
import { MainContext } from '../contexts/MainContext';


const RegisterScreen3 = ( props ) => {

    const { navigation, route } = props;
    const { data } = route.params
    // console.log('register3', data)

    // récupère fonction signUp de Maincontext
    const context = useContext(MainContext)
    const { userContext, useSelector } = context
    const { signUp } = userContext

    // const errorAlert = useUserSelector((userState) => { return userState.error; })erreur d'inscription //
    const errorAlert = useSelector((state) => { return state.error; })

    // FORM INPUT //
    const [checkCulture,setCheckCulture] = useState(true);
    const [checkSport,setCheckSport] = useState(true);
    const [checkGastro,setCheckGastro] = useState(true);
    const [checkBallade,setCheckBallade] = useState(true);
    const [checkSurprise,setCheckSurprise] = useState(true);

    const [sliderBudget , setSliderBudget] = useState("100");
    const [sliderRadius, setSliderRadius] = useState("500");

    const submitAll = () => {
        // var newData = {
        //   checkCulture: checkCulture,
        //   checkSport: checkSport,
        //   checkGastro: checkGastro,
        //   checkBallade: checkBallade,
        //   sliderBudget: sliderBudget,
        //   sliderRadius: sliderRadius,          
        //   ...data,
        // };

        // enregistrement en DB //

        console.log('trying to add this user..', data)

        signUp(data)
        // navigation.navigate("Home", { data: newData });

    };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style = {styles.container}>
                {/* <View style = {styles.CenterALL}>
                    <Text style = {styles.TexteTopCheck}>Mes préférences de voyage</Text>
                </View>
                <View style = {styles.BlocCheck}>
                    <Text style={styles.TexteCheck}>Culture</Text>
                    <Checkbox
                        status={checkCulture ? 'checked' : 'unchecked'}
                        uncheckedColor="#5D00FF"
                        color="#5D00FF"
                        onPress={() => {setCheckCulture(!checkCulture);                
                        }}
                    />                
                </View>

                <View style = {styles.BlocCheck}>
                    <Text style={styles.TexteCheck}>Sportif</Text>
                    <Checkbox
                        status={checkSport ? 'checked' : 'unchecked'}
                        uncheckedColor="#5D00FF"
                        color="#5D00FF"
                        onPress={() => {setCheckSport(!checkSport);                
                        }}
                    />                
                </View>

                <View style = {styles.BlocCheck}>
                    <Text style={styles.TexteCheck}>Gastronomique</Text>
                    <Checkbox
                        status={checkGastro ? 'checked' : 'unchecked'}
                        uncheckedColor="#5D00FF"
                        color="#5D00FF"
                        onPress={() => {setCheckGastro(!checkGastro);                
                        }}
                    />                
                </View>

                <View style = {styles.BlocCheck}>
                    <Text style={styles.TexteCheck}>Ballade</Text>
                    <Checkbox
                        status={checkBallade ? 'checked' : 'unchecked'}
                        uncheckedColor="#5D00FF"
                        color="#5D00FF"
                        onPress={() => {setCheckBallade(!checkBallade);                
                        }}
                    />                
                </View>

                <View style = {styles.BlocCheck}>
                    <Text style={styles.TexteCheck}>Surprenez-moi</Text>
                    <Checkbox
                        status={checkSurprise ? 'checked' : 'unchecked'}
                        uncheckedColor="#5D00FF"
                        color="#5D00FF"
                        onPress={() => {setCheckSurprise(!checkSurprise);                
                        }}
                    />                
                </View>

                <View style = {styles.CenterALL}>
                    <Text style = {styles.TopTexte}>Budget :</Text>
                    <View style = {styles.BlocSlider}>
                        <Text style = {styles.TexteSlider}>50€</Text>                        
                    
                        <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={50}
                            maximumValue={5000}
                            step={10}
                            minimumTrackTintColor="#5D00FF"
                            maximumTrackTintColor="#3B92D4"
                            onValueChange={(value) => setSliderBudget(value)}                            
                        />

                        <Text style = {styles.TexteSlider}>5000€</Text>
                    </View>
                </View>

                <View style = {styles.CenterALL}>
                    <Text style = {styles.TopTexte}>Rayon :</Text>
                    <View style = {styles.BlocSlider}>
                        <Text style = {styles.TexteSlider}>500m</Text>                        
                    
                        <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={500}
                            maximumValue={20000}
                            step={100}
                            minimumTrackTintColor="#5D00FF"
                            maximumTrackTintColor="#3B92D4"
                            onValueChange={(value) => setSliderRadius(value)}                            
                        />

                        <Text style = {styles.TexteSlider}>20km</Text>
                    </View>
                    <TouchableOpacity style={styles.endButton} onPress={() => submitAll()}>
                        <Text style={styles.endText}>Terminer</Text>
                    </TouchableOpacity>
                </View> */}

                
            </View>
        </ScrollView>
    );
};
export default RegisterScreen3;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#020D02'
    },

    BlocCheck: {
        flexDirection: "row",
        justifyContent:'space-between',
        paddingHorizontal: 20,
        marginVertical: 7,
    },

    TexteCheck: {
        padding:8,
        color:'#3B92D4',
        fontSize:20, 
    },

    BlocSlider: {
        flexDirection: "row",
        justifyContent:'space-between'
    },

    TexteSlider: {
        color:'#3B92D4',
        fontSize:20
    },

    endButton: {
        width: "40%",
        alignItems: "center",
        backgroundColor: "#5E24C3",
        marginVertical: 30,
        height: 50,
        borderRadius: 10,
        padding: 10,
    },

    endText: {
        color:"#3B92D4",
        fontWeight:"bold",
        fontSize:20
    },

    TopTexte: {
        color:'#5D00FF',
        fontWeight:"bold",
        fontSize:20
    },

    CenterALL: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },

    TexteTopCheck: {
        color:'#5D00FF',
        marginTop:30,
        fontSize: 25,
        fontWeight:"bold", 
        marginBottom: 20,
    }
});
