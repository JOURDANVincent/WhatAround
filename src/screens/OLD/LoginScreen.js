import React, { useState, useMemo, useContext, useEffect } from "react";
import { Image, TextInput, View, StyleSheet, TouchableOpacity, Text,ScrollView } from "react-native";

// CONTEXT //
import { MainContext } from '../../contexts/MainContext';


const LoginScreen = ({ navigation }) => {


    // récupère fonction signUp de Maincontext
    const context = useContext(MainContext)
    const { userContext, useSelector } = context
    const { signIn } = userContext

    // const errorAlert = useUserSelector((userState) => { return userState.error; })erreur d'inscription //
    const errorAlert = useSelector((state) => { return state.error; })


    const [email, setEmail] = useState("vince@enzo.fr");
    const [password, setPassword] = useState("Deszvins@80");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [errorMail, setErrorMail] = useState(null);
    const [errorPass, setErrorPass] = useState(null);


    const iconVisibility = useMemo(() => {
        return passwordVisibility
            // ? require("../img/form/oeil-barrée.png")
            // : require("../img/form/oeil.png");
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


    const doConnect = () => {
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

            signIn(data)

            // navigation.navigate('Home')
        }
    };


    useEffect(() => {
        
        const connection = async () => {

            try {

				const app = getRealmApp()
				const credentials = Realm.Credentials.emailPassword(email, password);
				const user = await app.logIn(credentials);
				console.log('successfully logged in ', user.id);
				
			} catch (error) {
				
				console.log(
					"l'authentification a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
			}
        }

        connection()
    }, [])

    
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <View style={styles.imageBlock}>
                    <Image
                        style={styles.image}
                        // source={require("../img/logo/logo.png")}
                    />
                </View>

                <View style={styles.groupInput}>
                    <Text style = {styles.TexteTopInput}>Email : </Text>
                    <TextInput
                        style={styles.input}
                        onBlur={() => verifyMail(email)}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    {errorMail ? (
                        <Text style={styles.error}>{errorMail}</Text>
                    ) : null}

                    <Text style = {styles.TexteTopInput}>Mot de passe : </Text>
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
                        // onPress={() => doConnect()}
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
                </View>
            </View>
        </ScrollView>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    image: {
        alignSelf: "center",
        resizeMode: 'contain',
        height: '60%',
    },
    container: {
        flex: 1,
        backgroundColor: "#020D02D4",
    },
    groupInput: {
        flex: 0.3,
        alignItems: "center",
    },
    imageBlock: {
        flex: 0.5,
        justifyContent: "center",
    },
    input: {
        height: 60,
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
        width: "70%",
        backgroundColor:'#FFF'
    },
    buttonBloc: {
        backgroundColor: "#5E24C3",
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
        color:'#FFF'
    },
    navigationToRegister: {
        fontSize: 12,
        color: "#6C63FF",
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
        backgroundColor:'#FFF'
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
        color:'#5D00FF',
        marginTop:5,
        fontSize: 25,
        fontWeight: "bold"
    },

    inputPassword: {
        width: '80%',
    }
});