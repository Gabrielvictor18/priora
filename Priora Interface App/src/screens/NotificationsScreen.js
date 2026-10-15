import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../theme';
import { useApp } from '../context';

export default function NotificationsScreen({navigation}){
 const {reports}=useApp();
 return <View style={styles.root}><Header title="Notificações" onBack={()=>navigation.navigate('Home')}/><ScrollView contentContainerStyle={styles.content}>
  {reports.length===0?<Text style={styles.empty}>Você não possui notificações.</Text>:reports.map((r,i)=><Pressable key={r.id} style={styles.item} onPress={()=>navigation.navigate('StatusDetails',{reportId:r.id})}><Ionicons name={(r.status==='Resolvida'||r.status==='Concluído')?'checkmark-circle':r.status==='Em atendimento'?'construct-outline':r.status==='Registrado'?'document-text-outline':'information-circle'} size={28} color="#fff"/><Text style={styles.text}>{r.status==='Resolvida'||r.status==='Concluído'?'Sua denúncia foi resolvida.':r.status==='Em atendimento'?'Sua denúncia está em atendimento.':r.status==='Registrado'?'Sua denúncia foi registrada.':'Sua denúncia está em análise.'}{'\n'}<Text style={styles.small}>{r.title} · toque para ver detalhes</Text></Text></Pressable>)}
 </ScrollView></View>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fff'},content:{padding:12},item:{backgroundColor:colors.green,borderRadius:9,minHeight:64,marginBottom:9,padding:10,flexDirection:'row',alignItems:'center'},text:{color:'#fff',fontSize:12,fontWeight:'700',flex:1,marginLeft:10},small:{fontSize:11,fontWeight:'400'},empty:{color:'#777',textAlign:'center',marginTop:40}});
