import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme';

export default function ReportScreen({ navigation, route }) {
  const [title, setTitle] = useState(route.params?.title || '');
  const [description, setDescription] = useState(route.params?.description || '');
  const [category, setCategory] = useState(route.params?.category || '');
  const [photo, setPhoto] = useState(route.params?.photo || null);

  useEffect(() => { if (route.params?.category) setCategory(route.params.category); }, [route.params?.category]);

  const pick = async (camera = false) => {
    try {
      if (camera && Platform.OS !== 'web') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return Alert.alert('Permissão necessária', 'Permita o acesso à câmera para tirar uma foto.');
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.85 });
        if (!result.canceled) setPhoto(result.assets[0].uri);
        return;
      }
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return Alert.alert('Permissão necessária', 'Permita o acesso às fotos para selecionar uma imagem.');
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 0.85 });
      if (!result.canceled) setPhoto(result.assets[0].uri);
    } catch (e) { Alert.alert('Erro', 'Não foi possível abrir as fotos.'); }
  };

  const choosePhoto = () => {
    if (Platform.OS === 'web') return pick(false);
    Alert.alert('Adicionar foto', 'Escolha uma opção', [
      { text: 'Galeria', onPress: () => pick(false) },
      { text: 'Câmera', onPress: () => pick(true) },
      { text: 'Cancelar', style: 'cancel' }
    ]);
  };

  const submit = () => {
    if (!title.trim()) return Alert.alert('Atenção', 'Informe qual é o problema.');
    if (!category) return Alert.alert('Atenção', 'Selecione uma categoria.');
    navigation.navigate('ReportDetails', { draft: { title: title.trim(), description: description.trim(), category, photo } });
  };

  return <View style={styles.root}>
    <Header title="Relatar problema" onBack={() => navigation.navigate('Home')} />
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Qual seu problema?</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} accessibilityLabel="Qual seu problema" />
      <Text style={styles.label}>Descreva o problema (Opcional)</Text>
      <TextInput value={description} onChangeText={setDescription} multiline style={[styles.input, styles.textarea]} textAlignVertical="top" accessibilityLabel="Descrição do problema" />
      <Text style={styles.label}>Selecione a categoria do problema</Text>
      <Pressable style={styles.select} onPress={() => navigation.navigate('CategoryPicker', { selected: category })} accessibilityRole="button">
        <Text style={{ color: category ? colors.text : '#111', fontWeight: category ? '700' : '400' }}>{category || 'Selecionar Categoria'}</Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>
      <Text style={styles.label}>Adicione uma foto do problema</Text>
      <Pressable style={styles.photoBox} onPress={choosePhoto} accessibilityRole="button" accessibilityLabel="Adicionar foto">
        {photo ? <Image source={{ uri: photo }} style={styles.photo} /> : <Text style={styles.upload}>⇧</Text>}
      </Pressable>
      {photo && <Pressable onPress={() => setPhoto(null)} accessibilityRole="button"><Text style={styles.remove}>Remover foto</Text></Pressable>}
      <PrimaryButton onPress={submit}>Continuar</PrimaryButton>
    </ScrollView>
  </View>;
}
const styles=StyleSheet.create({
  root:{flex:1,backgroundColor:'#fff'}, content:{padding:20,paddingBottom:50}, label:{fontSize:15,marginTop:10,marginBottom:10,color:'#111'},
  input:{height:38,borderWidth:1,borderColor:'#D7D7D7',borderRadius:10,backgroundColor:'#F8F8F8',paddingHorizontal:10,fontSize:13,marginBottom:10},
  textarea:{height:158,paddingTop:10}, select:{height:32,borderWidth:1,borderColor:'#D7D7D7',borderRadius:10,paddingHorizontal:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'78%',marginBottom:14}, chevron:{color:'#777',fontSize:12},
  photoBox:{height:120,backgroundColor:'#F6F6F6',alignItems:'center',justifyContent:'center',overflow:'hidden',marginBottom:8}, photo:{width:'100%',height:'100%'}, upload:{fontSize:44,color:'#D4D4D4'}, remove:{color:colors.red,fontWeight:'700',marginBottom:12}
});
