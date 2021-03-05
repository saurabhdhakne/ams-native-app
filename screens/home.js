import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as Location from 'expo-location';
import  { useState, useEffect } from 'react';
  
export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      status:this.props.navigation.state.params.status,
      id:this.props.navigation.state.params.id
    };

  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (location) => {
    
        this.setState({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          error: null,
        });

        let details = {
          'id': this.state.id,
          'lat': location.coords.latitude,
          'lng': location.coords.longitude
        };
        
        let formBody = [];
        for (let property in details) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        fetch('http://65.0.81.59/updateLocationApi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: formBody
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1},
    );


  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  statusUpdate = (myid) => {
    try {
        if(this.state.status){
          this.setState({status:0});
          
          fetch('http://65.0.81.59/updateStatusApi?id='+myid+'&status=0', {
              method: 'GET'
          })
          .then((response) => response.json())
          .then((responseJson) => {
                alert("Your Ofline Now!!!");
          })
          .catch((error) => {
            alert(error);
              console.error(error);
          });

        }
        else{
          this.setState({status:1});

            fetch('http://65.0.81.59/updateStatusApi?id='+myid+'&status=1', {
              method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
                  alert("Your Live Now!!!");
            })
            .catch((error) => {
            alert(error);
            console.error(error);
            });
            
        }
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
          style={{ width: "90%", top: 5 }}
        />
            <View>

                  <TouchableOpacity
                      onPress={() => this.statusUpdate(this.state.id)}
                  >
                    {
                      (this.state.status)
                      ?
                      <View>
                          <Image
                            source={require("./../assets/off.png")}
                            style={{ width: 300,height:300,  top: 15 }}

                          />
                        <Text
                          style={{ fontSize:40,marginTop:65,marginBottom:20,color:"lightgreen" }}
                        >
                            Your Live Now
                        </Text>
                        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <Text>Latitude:: {this.state.latitude}</Text>
                          <Text>Longitude:: {this.state.longitude}</Text>
                          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                        </View>
                  </View>
                    :
                    
                    <View>
                        <Image
                          source={require("./../assets/on.png")}
                          style={{ width: 300,height:300,  top: 15 }}

                        />
                        <Text
                          style={{ fontSize:40,marginTop:65,marginBottom:20,color:"red" }}
                        >
                          Your Ofline Now
                      </Text>
                  </View>
                    }
                    </TouchableOpacity>
                    
                  
            </View> 
              
               
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
