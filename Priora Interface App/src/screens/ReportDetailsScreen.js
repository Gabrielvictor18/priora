import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';
import { useApp } from '../context';

export default function ReportDetailsScreen({ navigation, route }) {
  const draft = route.params?.draft || {};
  const { addReport } = useApp();
  const [saving,setSaving]=useState(false);
  const submit = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const report = addReport(draft);
      navigation.replace('StatusDetails', { reportId: report.id, report });
    } catch(e) { Alert.alert('Erro', 'Não foi possível salvar a denúncia.'); }
    finally { setSaving(false); }
  };
  return <View style={styles.root}><Header title="Detalhes" onBack={()=>navigation.goBack()} /><ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.label}>Qual seu problema?</Text><View style={styles.field}><Text>{draft.title || '—'}</Text></View>
    <Text style={styles.label}>Descrição do problema</Text><View style={[styles.field,styles.description]}><Text>{draft.description || 'Sem descrição informada.'}</Text></View>
    <Text style={styles.label}>Categoria do problema</Text><View style={styles.field}><Text>{draft.category || '—'}</Text></View>
    <Text style={styles.label}>Foto do problema</Text>{draft.photo ? <Image source={{uri:draft.photo}} style={styles.photo}/> : <View style={styles.noPhoto}><Text>Sem foto</Text></View>}
    <Text style={styles.label}>Status</Text><View style={[styles.status,{backgroundColor:colors.warningBg}]}><Text style={{color:colors.warningText,fontWeight:'800'}}>Em análise</Text></View>
    <PrimaryButton onPress={submit}>{saving ? 'Enviando...' : 'Enviar denúncia'}</PrimaryButton>
  </ScrollView></View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#fff'},content:{padding:20,paddingBottom:40},label:{fontSize:13,marginTop:10,marginBottom:7},field:{minHeight:36,borderWidth:1,borderColor:'#ddd',borderRadius:9,backgroundColor:'#FAFAFA',padding:10,justifyContent:'center'},description:{minHeight:120,justifyContent:'flex-start'},photo:{width:'100%',height:150,resizeMode:'cover',borderRadius:4},noPhoto:{height:100,backgroundColor:'#f4f4f4',alignItems:'center',justifyContent:'center'},status:{alignSelf:'flex-start',borderRadius:16,paddingHorizontal:12,paddingVertical:7,marginBottom:20}});
