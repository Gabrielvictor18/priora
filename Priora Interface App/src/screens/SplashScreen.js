import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
export default function SplashScreen({ navigation }) { useEffect(()=>{const t=setTimeout(()=>navigation.replace('Home'),1400);return()=>clearTimeout(t)},[navigation]); return <View style={styles.container}><Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain"/></View>; }
const styles=StyleSheet.create({container:{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},logo:{width:150,height:150}});
