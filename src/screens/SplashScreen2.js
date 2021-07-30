import React, { useState, useContext, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

import { MainContext } from '../contexts/MainContext';


const SplashScreen = (props) => {

    const { navigation, currentPosition, setConnection } = props;

    //intégration connection

    // récupère fonction signUp de Maincontext
    const context = useContext(MainContext)
    const { userContext, useSelector } = context
    const { signIn } = userContext

    // const errorAlert = useUserSelector((userState) => { return userState.error; })erreur d'inscription //
    const errorAlert = useSelector((state) => { return state.error; })


    const [email, setEmail] = useState("test@mail.com");
    const [password, setPassword] = useState("Azerty987@");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [errorMail, setErrorMail] = useState(null);
    const [errorPass, setErrorPass] = useState(null);


    const iconVisibility = useMemo(() => {
        return passwordVisibility
            ? require("../img/form/oeye.png")
            : require("../img/form/ceye.png");
    }, [passwordVisibility]);


    const verifyMail = (text) => {
        const regexMail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validate = regexMail.test(text);
        if (text == null || text == "") {
            setErrorMail("Veuillez remplir ce champ");
        } else if (!validate) {
            setErrorMail("Le mail n'est pas valide");
        } else {
            setErrorMail(null);
        }
    };


    const verifyPassword = (text) => {
        if (text == null || text == "") {
            setErrorPass("Veuillez remplir ce champ");
        } else {
            setErrorPass(null);
        }
    };


    const doConnect = async () => {
        if (
            errorMail == null &&
            errorPass == null &&
            email != "" &&
            password != ""
        ) {
            var data = {
                email: email,
                password: password,
            };
            // alert("mail: " + data.email + " | " + "pass: " + data.password);

            await signIn(data)
            if (auth().currentUser.email === email)
                setConnection('user')
            else
                alert("L'utilisateur n'existe pas ou vérifier votre mot de passe")

            // navigation.navigate('Home')
            // setConnection('user')
        }
    };

    return (

        <ImageBackground
            style={styles.container}
            source={require('../img/bg/Amiens2.png')}
        >

            <View style={{ width: '40%', height: '20%', backgroundColor: '#E21232dd', padding: 10, marginBottom: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 5 }} >
                <Image
                    style={{ height: '40%', width: '80%', resizeMode: 'contain', opacity: 0.9, }}
                    source={require('../img/icon/mapWhite.png')}
                />
                <Text style={{ fontSize: 20, color: 'white' }}>WHAT</Text>
                <Text style={{ fontSize: 14, color: 'white' }}>AROUND ?!</Text>
            </View>

            <View style={styles.containerForm}>

                <View style={styles.groupInput}>
                    <Text style={styles.TexteTopInput}>Email : </Text>
                    <TextInput
                        style={styles.input}
                        onBlur={() => verifyMail(email)}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    {errorMail ? (
                        <Text style={styles.error}>{errorMail}</Text>
                    ) : null}

                    <Text style={styles.TexteTopInput}>Mot de passe : </Text>
                    <View style={styles.passwordBloc}>

                        <TextInput
                            style={styles.inputPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={passwordVisibility}
                            onBlur={() => verifyPassword(password)}
                        />
                        <View style={styles.IconeStyle}>
                            <TouchableOpacity
                                onPress={() =>
                                    passwordVisibility
                                        ? setPasswordVisibility(false)
                                        : setPasswordVisibility(true)
                                }
                            >
                                <Image style={styles.icon} source={iconVisibility} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {errorPass ? (
                        <Text style={styles.error}>{errorPass}</Text>
                    ) : null}
                </View>
                <View style={styles.bottomBloc}>
                    <TouchableOpacity
                        style={styles.buttonBloc}
                        disabled={
                            errorPass == null &&
                                errorMail == null &&
                                password != "" &&
                                email != ""
                                ? false
                                : true
                        }
                        onPress={() => doConnect()}
                    >
                        <Text style={styles.text}>Se connecter</Text>
                    </TouchableOpacity>
                    <View style={styles.blocNewUser}>
                        <Text style={styles.miniText}>Pas encore inscrit ?</Text>

                        <TouchableOpacity
                            onPress={() => navigation.push("Register")}
                        >
                            <Text style={styles.navigationToRegister}>
                                Créer un compte
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', width: 30, height: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: 20,borderRadius: 20  }}
                        onPress={() => setConnection('unkown')}
                    >
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain'}}
                            source={require('../img/icon/mapWhite.png')}
                        />
                        {/* <Text style={{ color: '#fff', }}>Entrez</Text> */}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#E21232', borderRadius: 10, marginHorizontal: '4%', elevation: 5 }}>
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
        backgroundColor: 'black',
    },

    containerForm: {
        width: "90%",
        height: '60%',
        backgroundColor: 'black'
    },

    image: {
        alignSelf: "center",
        resizeMode: 'contain',
        height: '60%',
    },
    groupInput: {
        // flex: 0.3,
        alignItems: "center",
    },
    imageBlock: {
        flex: 0.5,
        justifyContent: "center",
    },
    input: {
        height: 60,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        width: "70%",
        backgroundColor: '#FFF',
        color: 'black'
    },
    buttonBloc: {
        backgroundColor: "red",
        opacity: 0.9,
        marginVertical: 20,
        width: "60%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 10,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    miniText: {
        fontSize: 12,
        marginRight: 10,
        color: '#FFF'
    },
    navigationToRegister: {
        fontSize: 12,
        color: "#E21232",
        fontWeight: "bold",
        marginLeft: 10,
    },
    blocNewUser: {
        flexDirection: "row",
        justifyContent: "center"
    },
    icon: {
        width: 31,
        height: 20,
    },
    passwordBloc: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        width: "70%",
        backgroundColor: '#FFF'
    },
    IconeStyle: {
        padding: 15,
        // width: '10%'
    },
    bottomBloc: {
        flex: 0.2
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },

    TexteTopInput: {
        color: 'white',
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'left',
        width: '100%',
        marginLeft: 100
    },

    inputPassword: {
        width: '80%',
        color: 'black',
    }

});


export default SplashScreen;