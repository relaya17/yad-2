import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import type { Language, Listing } from '@tishal-et-dudu/shared';
import { initI18n } from './i18n';
import { api } from './api';
import { ListingCard } from './components/ListingCard';

const defaultLang: Language = 'he';
initI18n(defaultLang);

export default function App() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState<Language>(defaultLang);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  async function load() {
    setLoading(true);
    try {
      const data = await api.listings.get({ specialOnly: true, sort: 'newest' });
      setListings(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.appName}>{t('app_name')}</Text>
        <View style={styles.langRow}>
          {(['he', 'ar', 'ru'] as Language[]).map((l) => (
            <Pressable
              key={l}
              onPress={() => setLang(l)}
              style={[styles.langBtn, lang === l && styles.langBtnActive]}
            >
              <Text style={[styles.langText, lang === l && styles.langTextActive]}>{l.toUpperCase()}</Text>
            </Pressable>
          ))}
          <Pressable onPress={load} style={styles.refreshBtn}>
            <Text style={styles.refreshText}>{loading ? '…' : '↻'}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitle}>
          {t('results')} ({listings.length})
        </Text>
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListingCard listing={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={!loading ? <Text style={styles.empty}>{t('no_results')}</Text> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFC' },
  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10 },
  appName: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  langBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999, backgroundColor: '#F1F5F9' },
  langBtnActive: { backgroundColor: '#DBEAFE' },
  langText: { color: '#334155', fontWeight: '700' },
  langTextActive: { color: '#1D4ED8' },
  refreshBtn: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9999, backgroundColor: '#E2E8F0' },
  refreshText: { fontWeight: '900', color: '#0F172A' },
  body: { flex: 1, paddingHorizontal: 16 },
  sectionTitle: { fontWeight: '900', marginBottom: 12, color: '#0F172A' },
  empty: { color: '#475569' },
});


