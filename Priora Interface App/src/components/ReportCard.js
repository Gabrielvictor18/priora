import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function ReportCard({ report, onPress }) {
  const done = report.status === 'Concluído';
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{report.title}</Text>
        <Text style={styles.meta}>{report.category} · {report.date}</Text>
        <Text style={styles.address}>📍 {report.address}</Text>
      </View>
      <View style={styles.side}>
        <View style={[styles.status, done ? styles.done : styles.pending]}><Text style={[styles.statusText, done ? styles.doneText : styles.pendingText]}>{report.status}</Text></View>
        <Pressable onPress={onPress} style={styles.detail}><Text style={styles.detailText}>Ver detalhes</Text></Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { minHeight: 82, backgroundColor: '#F4F5F6', borderColor: '#D8D8D8', borderWidth: 1, borderRadius: 15, padding: 12, marginBottom: 12, flexDirection: 'row' },
  title: { fontWeight: '800', fontSize: 14, color: colors.text, marginBottom: 4 },
  meta: { color: colors.muted, fontSize: 12 },
  address: { color: '#9A9A9A', fontSize: 11, marginTop: 5 },
  side: { alignItems: 'flex-end', justifyContent: 'space-between', marginLeft: 8 },
  status: { borderRadius: 15, paddingVertical: 6, paddingHorizontal: 10 },
  pending: { backgroundColor: colors.warningBg }, done: { backgroundColor: colors.green },
  statusText: { fontSize: 10, fontWeight: '800' }, pendingText: { color: colors.warningText }, doneText: { color: '#fff' },
  detail: { backgroundColor: colors.green, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  detailText: { color: '#fff', fontSize: 12, fontWeight: '700' }
});
