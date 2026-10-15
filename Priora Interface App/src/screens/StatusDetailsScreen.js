import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';
import { useApp } from '../context';

export default function StatusDetailsScreen({navigation,route}){
 const { getReport, cancelReport } = useApp();
 const r = route.params?.reportId ? getReport(route.params.reportId) : route.params?.report;
 if (!r) return <View style={styles.root}><Header title="Detalhes" onBack={()=>navigation.goBack()}/><View style={styles.empty}><Text>Denúncia não encontrada.</Text></View></View>;
 const done = r.status === 'Resolvida' || r.status === 'Concluído';
 const statusLabel = r.status === 'Concluído' ? 'Resolvida' : r.status;
 const statusStyle = {
   'Registrado': styles.registered,
   'Em análise': styles.pending,
   'Em atendimento': styles.attending,
   'Resolvida': styles.done
 }[statusLabel] || styles.pending;
 const statusTextStyle = {
   'Registrado': styles.registeredText,
   'Em análise': styles.pendingText,
   'Em atendimento': styles.attendingText,
   'Resolvida': styles.doneText
 }[statusLabel] || styles.pendingText;
 const cancel = () => Alert.alert('Cancelar denúncia', 'Tem certeza que deseja cancelar esta denúncia?', [
   {text:'Não',style:'cancel'},
   {text:'Sim, cancelar',style:'destructive',onPress:()=>{cancelReport(r.id);navigation.navigate('Home');}}
 ]);
 return <View style={styles.root}><Header title="Detalhes" onBack={()=>navigation.goBack()}/><ScrollView contentContainerStyle={styles.content}>
  <Text style={styles.label}>Qual seu problema?</Text><View style={styles.field}><Text>{r.title}</Text></View>
  <Text style={styles.label}>Descrição do problema</Text><View style={[styles.field,styles.big]}><Text>{r.description||'Sem descrição informada.'}</Text></View>
  <Text style={styles.label}>Categoria do problema</Text><View style={styles.field}><Text>{r.category}</Text></View>
  <Text style={styles.label}>Foto do problema</Text>{r.photo?<Image source={{uri:r.photo}} style={styles.photo}/>:r.image?<Image source={r.image} style={styles.photo}/>:<View style={styles.noPhoto}><Text>Sem foto</Text></View>}
  <Text style={styles.label}>Status</Text><View style={[styles.pill, statusStyle]}><Text style={[styles.pillText, statusTextStyle]}>{statusLabel}</Text></View>
  <Text style={styles.label}>Localização</Text><View style={styles.field}><Text>{r.address || 'Localização associada à ocorrência'}</Text></View>
  <Text style={styles.label}>Órgão responsável</Text><View style={styles.field}><Text>Secretaria Municipal responsável</Text></View>
  {!done && <PrimaryButton danger onPress={cancel}>Cancelar denúncia</PrimaryButton>}
 </ScrollView></View>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fff'},content:{padding:20,paddingBottom:40},empty:{flex:1,alignItems:'center',justifyContent:'center'},label:{fontSize:13,marginTop:10,marginBottom:7},field:{minHeight:36,borderWidth:1,borderColor:'#ddd',borderRadius:9,backgroundColor:'#FAFAFA',padding:10,justifyContent:'center'},big:{minHeight:90,justifyContent:'flex-start'},photo:{height:150,width:'100%',resizeMode:'cover',borderRadius:4},noPhoto:{height:100,backgroundColor:'#f4f4f4',alignItems:'center',justifyContent:'center'},pill:{alignSelf:'flex-start',paddingHorizontal:13,paddingVertical:7,borderRadius:15,marginBottom:12},registered:{backgroundColor:'#E8EEF5'},pending:{backgroundColor:colors.warningBg},attending:{backgroundColor:'#EAF3FF'},done:{backgroundColor:colors.green},pillText:{fontWeight:'800'},registeredText:{color:'#315A7D'},pendingText:{color:colors.warningText},attendingText:{color:'#1F67B1'},doneText:{color:'#fff'}});
