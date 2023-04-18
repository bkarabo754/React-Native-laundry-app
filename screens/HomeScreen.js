import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native'
import * as Location from 'expo-location'

const HomeScreen = () => {
    const [displayCurrentAddress, setdisplayCurentAddress] = useState("We are loading your location");
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);


    useEffect(() => {
      checkIfLocationEnabled();
      getCurrentLocation();
    }, [])

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if(!enabled) {
            Alert.alert('Location services not enabled', 'Please enable the location services', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        } else {
            setlocationServicesEnabled(enabled);
        }
    }

    const getCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== "granted") {
            Alert.alert('Permission denied', 'allow the app to use the location services', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false }

            );
        }
        
        const {coords} = await Location.getCurrentPositionAsync();
        console.log(coords);
    if(coords) {
        const {latitude, longitude} = coords

        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        })

        console.log(response);

        for(let item of response.results) {
            let address = `${item.name} ${item.city} ${item.postalCode}`
            setdisplayCurentAddress(address)
        }
    }
    
}

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
  }

export default HomeScreen

const styles = StyleSheet.create({})