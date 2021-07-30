import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen2 = ( props ) => {

  const { navigation, route } = props;
  const { data } = route.params
  // console.log('register2', data)


  const [civility, setCivility] = useState("");
  const [errorCivility, setErrorCivility] = useState(null);
  const [civilityChange, setCivilityChange] = useState(false);
  const iCivility = useRef();

  const [firstname, setFirstname] = useState("Pavel");
  const [errorFirstname, setErrorFirstname] = useState(null);
  const iFirstname = useRef();

  const [lastname, setLastname] = useState("Zaitchev");
  const [errorLastname, setErrorLastname] = useState(null);
  const iLastname = useRef();

  const [birth, setBirth] = useState('12/12/1212');
  const [errorBirth, setErrorBirth] = useState(null)
  const iBirth = useRef();

  const [errorForm, setErrorForm] = useState('');


  const validate = (text, name) => {
    const regexName = /^[A-z]+$/;
    const regexBirth = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    switch (name) {
        case "firstname":
            const validateFirstname = regexName.test(text);
            if (text == "") {
                setErrorFirstname("Veuillez remplir ce champ");
            } else if (!validateFirstname) {
                setErrorFirstname("Le prénom n'est pas valide");
            } else {
                setErrorFirstname(null);
            }
            break;

        case "lastname":
            const validateLastname = regexName.test(text);
            if (text == "") {
                setErrorLastname("Veuillez remplir ce champ");
            } else if (!validateLastname) {
                setErrorLastname("Le nom n'est pas valide");
            } else {
                setErrorLastname(null);
            }
            break;

        case "civility":
            if (text == "default") {
                setErrorCivility("Veuillez choisir votre civilité");
            } else {
                setErrorCivility(null);
            }
            break;
        case 'birth':
            const validateBirth = regexBirth.test(text);
            if (text == "") 
            {
                setErrorBirth("Veuillez choisir votre date de baissance");
            } 
            else if(!validateBirth)
            {
                setErrorBirth("Veuillez choisir votre date de naissance");
            }
            else {
                setErrorBirth(null);
            }
            break;
    }
    return errorCivility == null &&
      errorFirstname == null &&
      errorLastname == null &&
      civilityChange &&
      errorBirth == null &&
      firstname != "" &&
      lastname != ""
      ? false
      : true;
  };

  const next = () => {
    var newData = {
      firstname: firstname,
      lastname: lastname,
      birthdate: birth,
      civility: civility,
      ...data,
    };
    navigation.navigate("Register3", { data: newData });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style = {styles.TexteTopInput}>Civilitée : </Text>
        <View style={styles.pickerBloc}>
          <Picker
            mode="dialog"
            style={styles.inputPicker}
            selectedValue={civility}
            onValueChange={(itemValue) => {
              setCivility(itemValue);
              setCivilityChange(true);
              validate(itemValue, "civility");
              iFirstname.current.focus();
            }}
          >
            <Picker.Item label="Votre civilité" value="default" />
            <Picker.Item label="Monsieur" value="monsieur" />
            <Picker.Item label="Madame" value="madame" />
            <Picker.Item label="Avion de chasse" value="avionchasse" />
            <Picker.Item label="Fiat Multiplat 1000CV" value="miletipla" />
          </Picker>
        </View>
        {errorCivility != null ? (
          <Text style={styles.error}>{errorCivility}</Text>
        ) : null}


        <Text style = {styles.TexteTopInput}>Prenom : </Text>
        <TextInput
          ref={iFirstname}
          value={firstname}
          style={styles.input}
          onChangeText={(text) => setFirstname(text)}
          placeholder="Entrez votre Prénom"
          onBlur={() => validate(firstname, "firstname")}
          onSubmitEditing={() => {
              iLastname.current.focus();
          }}
          returnKeyType="next" // bouton suivant
        />
        {errorFirstname != null ? (
          <Text style={styles.error}>{errorFirstname}</Text>
        ) : null}


    <Text style = {styles.TexteTopInput}>Nom : </Text>
        <TextInput
          ref={iLastname}
          value={lastname}
          style={styles.input}
          onChangeText={(text) => setLastname(text)}
          placeholder="Entrez votre Nom"
          onBlur={() => validate(lastname, "lastname")}
          onSubmitEditing={() => {
              iBirth.current.focus();
          }}
          returnKeyType="next" // bouton suivant
        />
        {errorLastname != null ? (
          <Text style={styles.error}>{errorLastname}</Text>
        ) : null}


        <Text style = {styles.TexteTopInput}>Date de naissance : </Text>

        <TextInput style={styles.inputBirth}
          ref={iBirth}
          keyboardType="numeric"
          placeholder="JJ/MM/AAAA"
          value={birth}
          onChangeText={(text) => setBirth(text)}
          onBlur={() => validate(birth, 'birth')}
          blurOnSubmit={true}
        />
        {errorBirth != null ? (
          <Text style={styles.error}>{errorBirth}</Text>
        ) : null}

            <Text>{errorForm}</Text>
        <TouchableOpacity
          disabled={false}
          style={styles.nextButton}
          onPress={() => next() }
        >
        <Text style={styles.textButton}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default RegisterScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#020D02D4'
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

  DateStyle: {
    height: 60,
    marginVertical: -15,
    width: "70%",
  },
  error: {
    color: "red",
  },
  nextButton: {
    width: "40%",
    alignItems: "center",
    backgroundColor: "#5E24C3",
    marginVertical: 20,
    height: 50,
    borderRadius: 10,
    padding: 10,
    marginTop: 60,
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight:"bold"
  },
  inputPicker: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
    width: "100%",
  },
  pickerBloc: {
    paddingHorizontal: 20,
    height: 60,
    width: "70%",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'#FFF'
  },
  TexteTopInput: {
    color:'#5D00FF',
    marginTop:10,
    fontSize: 25,
    fontWeight:"bold"
    },

    inputBirth: {
        backgroundColor: 'white', 
        padding: 20, 
        width :'70%', 
        height: 60, 
        borderWidth: 1, 
        borderRadius: 20
    }
});