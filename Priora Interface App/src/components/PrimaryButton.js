import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export default function PrimaryButton({ children, onPress, danger = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, danger && styles.danger, pressed && styles.pressed]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: { backgroundColor: colors.green, minHeight: 44, paddingHorizontal: 18, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  danger: { backgroundColor: colors.red },
  pressed: { opacity: 0.8 },
  text: { color: '#fff', fontWeight: '700', fontSize: 15 }
});
