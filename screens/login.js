import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    password: "",
  };
  handleEmail = (text) => {
    this.setState({ email: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  login = (email, pass) => {
    try {

      fetch('http://65.0.81.59/apiUser?email='+email+'&password='+pass, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            data: responseJson
         })
        this.props.navigation.navigate("HomeScreen",responseJson);
      })
      .catch((error) => {
          alert("Login UnSuccessfully!!!");
          console.error(error);
      });

    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./../assets/register.png")}
          style={{ width: "90%", left: "5%", top: 0 }}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor:"#424242",
    height:"100%"
  },
  input: {
    margin: 15,
    height: 40,
    width: "90%",
    height: 52,
    borderColor: "#E03535",
    color:"white",
    borderWidth: 3,
    padding: 15,
  },
  submitButton: {
    backgroundColor: "#E03535",
    padding: 10,
    margin: 15,
    marginLeft: "5%",
    height: 40,
    width: "90%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
});
