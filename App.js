//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";


const API_KEY= "eed720acdefc868b7bd8c7b647613d25";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount(){
    //이걸 사용하면 모바일에서 위치를 엑세스하도록
    //알림창이 뜬다.
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude)
        // this.setState({
        //   isLoaded: true
        //   //error: "something went wrong..."
        // });
      },
      error => {
        this.setState({
          error:error
        })
      }
      );
  }
  _getWeather = (lat, long) =>{
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
    )
    .then(response => response.json())
    .then(json => {
      //console.log(json);
       this.setState({
         temperature: json.main.temp,
         name: json.weather[0].main,
         isLoaded: true
       })
    });
  };
  render() {
    const { isLoaded, error, temperature, name } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather weatherName={name} temp={Math.ceil(temperature - 273.15)} /> 
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}> Getting the weather </Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //오브젝트를
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color:"red",
    backgroundColor: "transparent",
    fontSize:20,
    marginBottom: 30
  },
  loading:{
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    alignItems: "center"
  },
  loadingText:{
    fontSize:30,
    marginBottom: 100
  }
  
});
