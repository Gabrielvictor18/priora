import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function Header({ title, onBack, right }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.back} accessibilityRole="button" accessibilityLabel="Voltar">
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { height: 64, backgroundColor: colors.navy, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, elevation: 4 },
  back: { width: 38, alignItems: 'flex-start', justifyContent: 'center' },
  title: { color: '#fff', fontSize: 21, fontWeight: '500', flex: 1 },
  right: { width: 38, alignItems: 'flex-end' }
});
