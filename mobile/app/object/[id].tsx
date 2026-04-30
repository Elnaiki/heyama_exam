import { useState, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet,
  ActivityIndicator, SafeAreaView, TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const API = 'http://172.30.24.79:3000';

interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ObjectDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [object, setObject] = useState<ObjectItem | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`${API}/objects/${id}`).then((res) => setObject(res.data));
    }
  }, [id]);

  if (!object) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail</Text>
      </View>

      <Image source={{ uri: object.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{object.title}</Text>
        <Text style={styles.description}>{object.description}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>
            Créé le : {new Date(object.createdAt).toLocaleDateString('fr-FR')}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backText: { color: '#fff', fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  image: { width: '100%', height: 260 },
  content: { padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  description: { fontSize: 16, color: '#64748b', lineHeight: 24 },
  dateBadge: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  dateText: { color: '#2563eb', fontSize: 13, fontWeight: '600' },
});