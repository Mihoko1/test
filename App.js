import React from 'react';
import { Platform, NativeModules, Animated, StyleSheet, TextInput, Text, View, ScrollView, SafeAreaView} from 'react-native';
// import Card from "./components/Card";
// import Header from './components/Header';

//  import RestaurantsJSON from './restaurants.json';

// Note that in order to get this to work on Android you need to set the following flags via UIManager:
const { UIManager } = NativeModules;
if (Platform.OS === 'android') {
 if (UIManager.setLayoutAnimationEnabledExperimental) {
   UIManager.setLayoutAnimationEnabledExperimental(true);
 } 
}

export default class App extends React.Component {
  
  text1= new Animated.Value(0)

  // state = { restaurants: []}

  componentDidMount() { // lifecycle function which is when component start, execute this function with commands in it
    Animated.timing(this.text1, {
      toValue: 0,
      duration: 1000
    }).start(() => {
      Animated.spring(this.text1, {
        toValue: 1,
        speed: 0,
        //tension:100,
        bounciness:10
      }).start(() => {
        Animated.loop(Animated.sequence([
          Animated.timing(this.text1,{
            toValue:0,
            duration:500
          }),
          Animated.timing(this.text1,{
            toValue:1,
            duration:500
          })
        ]), {iterations: 4}).start()
      })
    });
  }

  render(){
    return (


      <View style={styles.container}>
            {/* Animation Example 1 : Opacity Text*/}
            <Animated.Text style={{...styles.h1,
              opacity: this.text1
            }}>Hello World1!</Animated.Text>

            {/* Example 4: interpolate / transform:rotate */}
            <Animated.Text style={{...styles.h1,
              transform:[{
                rotate: this.text1.interpolate({
                  inputRange:[0,1],
                  outputRange: ['0deg','360deg'] //0 : 150, 0.5 :75, 1:0
                }),
              }]
            }}>Hello World4! </Animated.Text>


            {/* Animation Example 5: muliple transform values, animate Text*/}
            <Animated.View style={{
              transform:[{
                translateX: this.text1.interpolate({
                  inputRange:[0,1],
                  outputRange: [150,0] //0 : 150, 0.5 :75, 1:0
                }),
              },{
                translateY : this.text1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [150, 0]
                })
              }]
            }}>
              <TextInput style={style.input} placeholder="Hello world5!">
              </TextInput>
              </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#e53935',
    marginBottom: 50,
  },
  container: {
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems:'center',
  },
  heading: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:20,
    marginBottom:20,
  },
  cardBox: {
    alignItems:'center',
  },
  line: {
    marginTop: 20,
    marginBottom: 20,
  },
});
