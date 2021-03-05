import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

export default class HomeScreen extends React.Component {

  state = {
    status: "",
  };

  statusUpdate = (status) => {
    try {
        if(this.state.status){
          this.state.status = 0;
          alert(this.state.status);
          this.forceUpdate();
        }
        else{
          this.state.status = 1;
          alert(this.state.status);
          this.forceUpdate();
        }
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };
  
  render() {
    console.log(this.props.navigation.state.params);
    this.state.status = this.props.navigation.state.params.status;
    
    return (
      <View style={styles.container}>
          <Image
          source={require("./../assets/register.png")}
          style={{ width: "90%", top: 5 }}
        />
            { this.state.status
                ?
                <View>
                  <TouchableOpacity
                      onPress={() => this.statusUpdate()}
                  >
                  <Image
                      source={require("./../assets/off.png")}
                      style={{ width: 300,height:300,  top: 15 }}
                      onPress={() => this.statusUpdate()}

                    />
                    </TouchableOpacity>
                  <Text
                  style={{ fontSize:60,marginTop:20,marginBottom:20,color:"lightgreen" }}
                  >Your Live Now</Text>
              </View> 
              :  
                <View>
                  
                  <TouchableOpacity
                      onPress={() => this.statusUpdate()}
                  >
                    <Image
                        source={require("./../assets/on.png")}
                        style={{ width: 300,height:300,  top: 15 }}
                        onPress={() => this.statusUpdate()}
                      />
                  </TouchableOpacity>
                <Text
               style={{ fontSize:60,marginTop:20,marginBottom:20,color:"#E03535" }}
               >Your Ofline Now</Text>
                </View> 
            }     
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#424242",
    flex: 1,
    padding: 0,
    width: "100%",
    alignItems:"center"
  },

  header: {
    resizeMode: "stretch",
    width: "100%",
    height: 400,
    marginTop: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },

  body: {
    resizeMode: "stretch",
    width: "100%",
    height: 650,
    marginTop: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
