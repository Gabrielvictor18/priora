import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useApp } from '../context';

const localProblems = [];

function Priority({ value }) {
  const k = value === 'ALTA' ? 'high' : value === 'MÉDIA' ? 'medium' : 'low';
  return (
    <View style={[styles.priority, styles[`p_${k}`]]}>
      <Text style={[styles.priorityText, styles[`pt_${k}`]]}>{value}</Text>
    </View>
  );
}

function LocalCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.localCard}>
      <View style={styles.cardTop}>
        <Text style={styles.localTitle}>{item.title}</Text>
        <Priority value={item.priority} />
      </View>
      <Text style={styles.meta}>{item.category} · {item.date}</Text>
      <View style={styles.distanceRow}>
        <Ionicons name="location" size={14} color="#C83E4C" />
        <Text style={styles.distance}>{item.distance} da sua localização</Text>
      </View>
    </Pressable>
  );
}

function ComplaintCard({ item, navigation }) {
  return (
    <View style={styles.complaintCard}>
      <View style={styles.cardTop}>
        <Text style={styles.complaintTitle}>{item.title}</Text>
        <Priority value={item.priority} />
      </View>
      <Text style={styles.meta}>{item.category}</Text>
      <View style={styles.complaintBottom}>
        <View style={styles.distanceRow}>
          <Ionicons name="location" size={14} color="#C83E4C" />
          <Text style={styles.distance}>{item.address || 'Localização associada à ocorrência'}</Text>
        </View>
        <Pressable
          style={styles.detailsButton}
          onPress={() => navigation.navigate('StatusDetails', { reportId: item.id, report: item })}
        >
          <Text style={styles.detailsText}>Ver detalhes</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [tab, setTab] = useState('Registrado');
  const { reports } = useApp();
  const visible = useMemo(
    () => reports.filter((x) => x.status === tab),
    [reports, tab]
  );

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('Menu')}>
          <Ionicons name="menu" size={28} color={colors.green} />
        </Pressable>

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Pressable style={styles.headerButton} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={29} color={colors.green} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={require('../../assets/figma_home_reference.jpg')}
          style={styles.hero}
          resizeMode="cover"
        />

        <View style={styles.reportSection}>
          <View style={styles.reportBox}>
            <Text style={styles.reportTitle}>Relate seu problema!</Text>
            <Pressable
              style={styles.newReportButton}
              onPress={() => navigation.navigate('Report')}
            >
              <Text style={styles.newReportText}>Nova denúncia</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.localSection}>
          <Text style={styles.sectionTitle}>Problemas locais</Text>
          <Text style={styles.sectionSubtitle}>
            Acompanhe problemas em sua proximidade
          </Text>

          {localProblems.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhum problema registrado nas proximidades.
            </Text>
          ) : (
            localProblems.map((item, i) => (
              <LocalCard
                key={i}
                item={item}
                onPress={() =>
                  navigation.navigate('ReportDetails', {
                    draft: {
                      title: item.title,
                      description: '',
                      category: item.category,
                      photo: null,
                    },
                  })
                }
              />
            ))
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.mySection}>
          <Text style={styles.sectionTitle}>Minhas denúncias</Text>
          <Text style={styles.sectionSubtitle}>
            Acompanhe o status das suas denúncias
          </Text>

          <View style={styles.tabs}>
            {['Registrado', 'Em análise', 'Em atendimento', 'Resolvida'].map((label) => (
              <Pressable
                key={label}
                style={[styles.tab, tab === label && styles.tabActive]}
                onPress={() => setTab(label)}
              >
                <Text style={[styles.tabText, tab === label && styles.tabTextActive]}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {visible.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma denúncia nesta categoria.
            </Text>
          ) : (
            visible.map((item) => (
              <ComplaintCard key={item.id} item={item} navigation={navigation} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 92,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E7EAF0',
  },
  headerButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: { width: 137, height: 56 },
  scrollContent: { paddingBottom: 36 },
  hero: { width: '100%', height: 252, backgroundColor: '#DDE4EC' },
  reportSection: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 20,
    paddingVertical: 27,
  },
  reportBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 35,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  reportTitle: {
    color: '#101010',
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 34,
  },
  newReportButton: {
    height: 63,
    borderRadius: 13,
    backgroundColor: '#337FE1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  newReportText: { color: '#fff', fontSize: 26, fontWeight: '400' },
  localSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 19,
  },
  sectionTitle: { color: '#0C4278', fontSize: 28, lineHeight: 34, fontWeight: '500' },
  sectionSubtitle: { color: '#626262', fontSize: 15, lineHeight: 19, marginBottom: 26 },
  localCard: {
    backgroundColor: '#F0F1F4',
    borderWidth: 1,
    borderColor: '#D3D6DC',
    borderRadius: 16,
    paddingHorizontal: 17,
    paddingVertical: 12,
    marginBottom: 18,
    minHeight: 95,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  localTitle: { flex: 1, color: '#202020', fontSize: 17, fontWeight: '800', marginRight: 8 },
  complaintTitle: { flex: 1, color: '#202020', fontSize: 16, fontWeight: '800', marginRight: 8 },
  meta: { color: '#777C83', fontSize: 14, marginTop: 3 },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  distance: { color: '#8B9097', fontSize: 13, marginLeft: 6 },
  priority: { borderRadius: 13, paddingHorizontal: 10, paddingVertical: 5 },
  priorityText: { fontSize: 12, fontWeight: '800' },
  p_high: { backgroundColor: '#FFF0F0' },
  pt_high: { color: '#D1535B' },
  p_medium: { backgroundColor: '#FFF9DE' },
  pt_medium: { color: '#D2A62D' },
  p_low: { backgroundColor: '#EAF8EE' },
  pt_low: { color: '#47A96A' },
  separator: { height: 40, backgroundColor: '#F0F2F5' },
  mySection: { backgroundColor: '#fff', paddingHorizontal: 22, paddingTop: 30, paddingBottom: 34 },
  tabs: {
    minHeight: 51,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D4D7DD',
    backgroundColor: '#F0F1F4',
    flexDirection: 'row',
    padding: 2,
    marginBottom: 25,
    overflow: 'hidden',
  },
  tab: { flex: 1, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  tabActive: { backgroundColor: '#064582' },
  tabText: { color: '#61636A', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  tabTextActive: { color: '#fff' },
  complaintCard: {
    backgroundColor: '#F0F1F4',
    borderWidth: 1,
    borderColor: '#D3D6DC',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 11,
    marginBottom: 18,
    minHeight: 102,
  },
  complaintBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
  },
  detailsButton: {
    backgroundColor: '#10A63A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 111,
    alignItems: 'center',
  },
  detailsText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  emptyText: { color: '#777', fontSize: 14, paddingVertical: 18, textAlign: 'center' },
});
