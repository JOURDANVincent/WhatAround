import React, { useState, useMemo, useRef, useContext } from "react";
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { MainContext } from '../contexts/MainContext';


const RegisterScreen = ({ navigation, setConnection }) => {

    const [email, setEmail] = useState("vince@enzo.fr");
    const [errorMail, setErrorMail] = useState(null);
    const iEmail = useRef();

    const [password, setPassword] = useState("Deszvins@80");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [errorPassword, setErrorPassword] = useState(null);
    const iPassword = useRef();

    const [confirmPassword, setConfirmPassword] = useState("Deszvins@80");
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
    const iConfirmPassword = useRef();


    const context = useContext(MainContext)
    const { userContext, useSelector } = context
    const { signIn } = userContext


    const iconVisibility = useMemo(() => {
        return passwordVisibility
            ? require("../img/form/oeye.png")
            : require("../img/form/ceye.png");
    }, [passwordVisibility]);

    const iconVisibilityConfirm = useMemo(() => {
        return confirmPasswordVisibility
            ? require("../img/form/oeye.png")
            : require("../img/form/ceye.png");
    }, [confirmPasswordVisibility]);


    const validateMail = (email) => {
        const regexMail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validate = regexMail.test(email);
        if (email == "" || email == null) {
            setErrorMail("Veuillez remplir ce champ");
        } else if (!validate) {
            setErrorMail("Le mail n'est pas valide");
        } else {
            setErrorMail(null);
        }
    };

    const validatePassword = (password) => {
        const regexPassword =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const validate = regexPassword.test(password);
        if (password == "" || password == null) {
            setErrorPassword("Veuillez remplir ce champ");
        } else if (!validate) {
            setErrorPassword(
                "Le mot de passe doit contenir : \n 8 caractères, \n 1 majuscule, \n 1 minuscule \n 1 caractère spéciale \n 1 numéro"
            );
        } else {
            setErrorPassword(null);
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword == "" || confirmPassword == null) {
            setErrorConfirmPassword("Veuillez remplir ce champ");
        } else if (confirmPassword != password) {
            setErrorConfirmPassword("Les mots de passe ne correspondent pas");
        } else {
            setErrorConfirmPassword(null);
        }
    };


    const registerAccount = () => {
        if (
            errorMail == null &&
            errorPassword == null &&
            errorConfirmPassword == null &&
            email != "" &&
            password != "" &&
            confirmPassword != ""
        ) {
            var data = {
                email: email,
                password: password,
            };
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created !');
                    const ref = firestore().collection('Users');
                    try {
                        //authentification utilisateur pour récupérer son UID et l'insérer en base
                        auth().onAuthStateChanged((user) => {
                            if (user) {
                                // Ajout dans la collection user
                                ref.add({
                                    UID: user.uid,
                                    user: email,
                                    favourite: [],
                                });
                                navigation.navigate('Splash')
                            }
                        });

                    }
                    catch (err) {
                        console.log(err)
                    }
                    // signIn(data)
                    // setConnection('user');
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });
        }
    };
    const iSubmit = useRef();

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>

                <View style={{ flex: 2, width: '100%', paddingHorizontal: 20, alignItems: 'center', }}>

                    <Text style={styles.textTopInput}>Email</Text>
                    <TextInput
                        ref={iEmail}
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Entrez votre Email"
                        onBlur={() => validateMail(email)}
                        onSubmitEditing={() => {
                            iPassword.current.focus();
                        }}
                        returnKeyType="next" // bouton suivant
                    />
                    {errorMail != null ? (
                        <Text style={styles.error}>{errorMail}</Text>
                    ) : null}


                    <Text style={styles.textTopInput}>Mot de passe</Text>
                    <View style={styles.inputBlock}>
                        <TextInput
                            style={{ width: '80%', color: 'black' }}
                            ref={iPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Entrez votre mot de passe"
                            secureTextEntry={passwordVisibility}
                            onBlur={() => validatePassword(password)}
                            onSubmitEditing={() => {
                                iConfirmPassword.current.focus();
                            }}
                            returnKeyType="next" // bouton suivant
                        />
                        <TouchableOpacity
                            style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}
                            onPress={() =>
                                passwordVisibility
                                    ? setPasswordVisibility(false)
                                    : setPasswordVisibility(true)
                            }
                        >
                            <Image style={styles.icon} source={iconVisibility} />
                        </TouchableOpacity>
                    </View>
                    {errorPassword != null ? (
                        <Text style={styles.error}>{errorPassword}</Text>
                    ) : null}


                    <Text style={styles.textTopInput}>Confirmer votre mot de passe</Text>
                    <View style={styles.inputBlock}>
                        <TextInput
                            style={{ width: '80%', color: 'black' }}
                            ref={iConfirmPassword}
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            placeholder="Entrez votre mot de passe"
                            secureTextEntry={confirmPasswordVisibility}
                            onBlur={() => validateConfirmPassword(confirmPassword)}
                            blurOnSubmit={true}
                            onSubmitEditing={() => {
                                iSubmit.current.focus();
                            }}
                        />

                        <TouchableOpacity
                            style={{ width: '20%', justifyContent: 'center', alignItems: 'center', }}
                            onPress={() =>
                                confirmPasswordVisibility
                                    ? setConfirmPasswordVisibility(false)
                                    : setConfirmPasswordVisibility(true)
                            }
                        >
                            <Image style={styles.icon} source={iconVisibilityConfirm} />
                        </TouchableOpacity>

                    </View>
                    {errorConfirmPassword != null ? (
                        <Text style={styles.error}>{errorConfirmPassword}</Text>
                    ) : null}


                    <TouchableOpacity
                        style={styles.nextButton} onPress={() => registerAccount()}
                    >
                        <Text
                            style={styles.textNext}
                        >Créer son compte</Text>
                        <TextInput ref={iSubmit} style={{ height: 0, width: 0 }} />
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#020D02D4'
    },

    imageBlock: {
        flex: 0.5,
        justifyContent: "center",
        marginBottom: 50
    },

    textTopInput: {
        width: '100%',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: "bold",
        color: '#5D00FF',
        paddingLeft: 8,
        marginBottom: 5,
    },

    input: {
        height: 60,
        width: "100%",
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        marginBottom: 20,
        color: 'black'
    },
    error: {
        color: "red",
    },

    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },

    inputBlock: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        paddingLeft: 12,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 20,

        backgroundColor: '#FFF'
    },
    IconeStyle: {
        padding: 15
    },

    nextButton: {
        width: "60%",
        alignItems: "center",
        backgroundColor: "#5E24C3",
        marginTop: 50,
        marginVertical: 20,
        height: 50,
        borderRadius: 10,
        padding: 10,
    },
    textNext: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    imageNext: {
        width: 30,
        height: 30,
    },


});