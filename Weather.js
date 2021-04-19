import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";


// export default class Weather extends Component{
//     render(){
//         return(
//        <LinearGradient 
//             colors={["#00C6FB", "#005BEA", "red"]}
//             style={styles.container}
//         >
//             <View style={styles.upper}>
//                 <Ionicons color="white" size={50}
//                 name="ios-rainy"/>
//                 <Text style={styles.temp}>35º</Text>
//             </View>
//             <View style={styles.lower}> 
//                 <Text style={styles.title}>Raining like a MF</Text>
//                 <Text style={styles.subtitle}>for more info look outside</Text>
//             </View>
//              dddd

//         </LinearGradient>
//         );
//     }
// }

const weatherCases ={
     Rain: {
         colors: ["#00C6FB", "#005BEA"],
         title: "Raining like a MF",
         subtitle: "For more info look outside",
         icon: 'weather-rainy'
     },
     Clear: {
        colors: ["#FEF253", "#FF7300"],
        title: "Sunny",
        subtitle: "so scorching hot",
        icon: 'weather-sunny'
     },
     Thunderstorm: {
        colors: ["#00ECBC", "#007ADF"],
        title: "Thunderstorm in the house",
        subtitle: "Actually, outside of the house",
        icon: 'weather-lightning'
     },
     Clouds: {
        colors: ["#D7D2CC", "#304352"],
        title: "Clouds",
        subtitle: "so kind weather",
        icon: 'weather-cloudy'
     },
     Snow: {
        colors: ["#7DE2FC", "#B986E5"],
        title: "cold as balls",
        subtitle: "Do you want to build a snowman? ",
        icon: 'weather-snowy'
     },
     Drizzle: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "Drizzle",
        subtitle: "Is like rain, ",
        icon: 'weather-hail'
     },
     Haze: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "Haze",
        subtitle: "Oh my god , I Cant see anything ",
        icon: 'weather-hail'
     }
     ,
     Mist: {
        colors: ["#D7D2CC", "#304352"],
        title: "Mist",
        subtitle: "Its like you no glasses on ",
        icon: 'weather-fog'
     }
}

function Weather({ weatherName, temp }){
    return(
        <LinearGradient 
            // colors={["#00C6FB", "#005BEA"]}
            colors={weatherCases[weatherName].colors}
            style={styles.container}
        >
            <View style={styles.upper}>
                <MaterialCommunityIcons color="white" size={80}
                name={weatherCases[weatherName].icon}/>
                <Text style={styles.temp}>{temp}º</Text>
            </View>
            <View style={styles.lower}> 
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>


        </LinearGradient>
    );
}

Weather.propTypes = {
    temp:  PropTypes.number.isRequired ,
    weatherName: PropTypes.string.isRequired
};


export default Weather;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    upper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        backgroundColor: "transparent"
    },
    temp: {
        fontSize: 38,
        backgroundColor:"transparent",
        color: 'white',
        marginTop: 10
    },
    lower: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end",
        marginBottom: 70
    },
    title: {
        fontSize: 38,
        backgroundColor:"transparent",
        color: "white",
        marginBottom: 10,
        fontWeight: "300"
    },
    subtitle: {
        fontSize: 24,
        backgroundColor:"transparent",
        color: 'white',
        marginBottom : 24
    }
});