# WeatherApp-Native

#WokrFlow

대기화면(App.js) -> fetch함수를 이용한 내위치 정보API를 가져옴 ->
컴포넌트(weather.js)에 정보를 넘겨줌 -> 
정보를 받아서 weatherCases에 맞게 화면에 렌더링해준다.

#Project

1) 화면 구성을 해준다.


app.js에서 native에서 필요한 부분들을 import해주고
import { StyleSheet, Text, View, StatusBar } from 'react-native';
사용하여

랜더링 되는 부분인 View와 Text부분에 CSS를 입혀준다.

css는 StyleSheet를 이용하여 객체를 만들어 inline으로 사용해준다.

기본적인 화면을 구성하였다면,

컴포넌트를 만들어 관리해준다.

Weather.js라는 컴포넌트를 만들고

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
//react 컴포넌트에 prop으로 넘어오는 입력값들이 어떤타입을 가져야
하는지 정의해주는 라이브러리이다.
즉 prop으로 함수의 인자로 받아와서 요쇼에서 ${}를 사용하여 
랜더링 해주는 간단한 react함수 컴포넌트이다.

필요한 부분들을 import해준다.

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

클래스형 대신 함수형 컴포넌트를 사용해준다.

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

똑같이 stylesheet를 이용하여 inline으로 CSS를 입혀 화면을 구성한다.



2) 그리고 내가 있는 위치에 대한 정보를 fetch를 통해 API를받아온다.

state에 화면 전환에 사용될 값을 초기화 시켜준다.

그 state값을 렌더링 되는 부분에 사용해주고,

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

만들어둔 weather 컴포넌트를 import하여 대기화면에서 weather 컴포넌트로
넘어갈수있게 boolean으로 관리해주면서 내 위치와 정보를 넘겨준다.

일단, 한번 화면을 렌더링 해주고 모바일에서 위치를 엑세스 할수
있도록 

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
함수를 사용하고 dom처럼 document를 이용한 

navigator.geolocation.getCurrentPosition으로 내 position의 정보를
받게되며 

그것을 getWeather함수에서 인자로 받아와 fetch하여 
json형태로 정보를 담아오고 setState해주어 화면을 넘기면서

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




json형태로 가져온 필요한 정보를 weather컴포넌트에 prop로
넘겨준다.



3) 정보를 내 안드로이드 앱으로 전송해준다. 

넘겨받은 정보인 weatherName과 temp를  weather컴포넌트에서
prop으로 받아와 맞는 정보를 weatherCases의 객체와 짝지어서


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


넘겨진 화면에 뿌려주게된다.
