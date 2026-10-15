import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import { categories } from '../data/mock';
import { colors } from '../theme';

export default function CategoryPickerScreen({ navigation }) {
  return <View style={styles.root}>
    <Header title="Relatar problema" onBack={() => navigation.goBack()} />
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.heading}>Selecione uma categoria</Text>
      {categories.map(c => <Pressable key={c.id} onPress={() => navigation.navigate('Report', { category: c.name })} style={styles.item} accessibilityRole="button">
        <Image source={c.image} style={styles.image} />
        <Text style={styles.name}>{c.name}</Text><Text style={styles.arrow}>›</Text>
      </Pressable>)}
    </ScrollView>
  </View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fff'},body:{padding:20,paddingBottom:30},heading:{fontSize:16,fontWeight:'800',marginBottom:14,color:'#111'},item:{height:62,borderBottomWidth:1,borderColor:'#ddd',flexDirection:'row',alignItems:'center'},image:{width:42,height:42,borderRadius:9,marginRight:12},name:{fontSize:15,fontWeight:'600',flex:1,color:colors.text},arrow:{fontSize:28,color:'#777'}});
