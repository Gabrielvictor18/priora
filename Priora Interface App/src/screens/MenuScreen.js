import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { colors } from '../theme';
import { useApp } from '../context';

export default function MenuScreen({navigation}) {
 const [activity,setActivity]=useState(false); const [history,setHistory]=useState(false); const {reports}=useApp();
 const registered=reports.filter(r=>r.status==='Registrado').length; const analysis=reports.filter(r=>r.status==='Em análise').length; const attending=reports.filter(r=>r.status==='Em atendimento').length; const done=reports.filter(r=>r.status==='Resolvida'||r.status==='Concluído').length;
 return <View style={styles.root}><Header title="Menu" onBack={()=>navigation.navigate('Home')} /><ScrollView contentContainerStyle={styles.content}>
  <Pressable style={styles.row} onPress={()=>setActivity(!activity)}><Ionicons name="pulse-outline" size={27} color="#222"/><Text style={styles.rowText}>Atividade</Text><Ionicons name={activity?'chevron-up':'chevron-down'} size={20}/></Pressable>
  {activity&&<View style={styles.panel}><View><Text style={styles.metric}>{registered}</Text><Text style={styles.metricLabel}>Registradas</Text></View><View><Text style={styles.metric}>{analysis}</Text><Text style={styles.metricLabel}>Em análise</Text></View><View><Text style={styles.metric}>{attending}</Text><Text style={styles.metricLabel}>Atendimento</Text></View><View><Text style={styles.metric}>{done}</Text><Text style={styles.metricLabel}>Resolvidas</Text></View></View>}
  <Pressable style={styles.row} onPress={()=>setHistory(!history)}><Ionicons name="time-outline" size={27} color="#222"/><Text style={styles.rowText}>Histórico</Text><Ionicons name={history?'chevron-up':'chevron-down'} size={20}/></Pressable>
  {history&&<View style={styles.history}>{reports.length===0?<Text>Nenhuma denúncia registrada.</Text>:reports.map(r=><Pressable key={r.id} style={styles.historyItem} onPress={()=>navigation.navigate('StatusDetails',{reportId:r.id})}><View style={{flex:1}}><Text style={styles.hTitle}>{r.title}</Text><Text style={styles.hMeta}>{r.category} · {r.date}</Text></View><Text style={styles.hStatus}>{r.status}</Text></Pressable>)}</View>}
 </ScrollView></View>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fff'},content:{padding:0},row:{height:56,flexDirection:'row',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderBottomColor:'#eee'},rowText:{fontSize:16,fontWeight:'800',marginLeft:10,flex:1},panel:{padding:16,backgroundColor:'#F3F4F6',flexDirection:'row',justifyContent:'space-around'},metric:{fontSize:21,fontWeight:'800',color:colors.navy,textAlign:'center'},metricLabel:{color:'#666',fontSize:12,marginTop:3},history:{padding:10,backgroundColor:'#F6F7F8'},historyItem:{backgroundColor:'#fff',borderRadius:10,padding:12,marginBottom:8,flexDirection:'row',alignItems:'center'},hTitle:{fontWeight:'800'},hMeta:{fontSize:12,color:'#777',marginTop:4},hStatus:{fontSize:11,fontWeight:'800',color:colors.green,marginLeft:8}});
