import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function FigmaImageScreen({ route, navigation }) {
  const { source, hotspots = [] } = route.params || {};
  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <Image source={source} style={styles.image} resizeMode="contain" />
      {hotspots.map((h, i) => (
        <Pressable
          key={i}
          onPress={() => navigation.navigate(h.route, h.params)}
          style={[styles.hotspot, h.style]}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:'#000',alignItems:'center',justifyContent:'center'},
  image:{width:'100%',height:'100%',maxWidth:320,maxHeight:680},
  hotspot:{position:'absolute'},
});
