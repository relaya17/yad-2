import { View, Text, StyleSheet } from 'react-native';
import type { Listing } from '@tishal-et-dudu/shared';

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.meta}>
            {listing.category} · {listing.city}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.price}>₪{Number(listing.price).toLocaleString()}</Text>
          <Text style={[styles.badge, listing.specialDeal ? styles.badgeHot : styles.badgeNormal]}>
            {listing.specialDeal ? '🎗️ דיל מיוחד' : 'מודעה רגילה'}
          </Text>
        </View>
      </View>
      <Text style={styles.desc}>{listing.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  row: { flexDirection: 'row', gap: 12 },
  title: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  meta: { marginTop: 2, color: '#475569' },
  price: { fontSize: 16, fontWeight: '900', color: '#0F172A' },
  badge: { marginTop: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999, overflow: 'hidden' },
  badgeHot: { backgroundColor: '#FFE4E6', color: '#BE123C' },
  badgeNormal: { backgroundColor: '#F1F5F9', color: '#334155' },
  desc: { marginTop: 10, color: '#475569' },
});


