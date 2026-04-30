import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/objects/${id}`)
      .then(res => setObject(res.data))
      .catch(() => Alert.alert('Erreur', 'Objet introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2563eb" />;
  if (!object) return <Text style={styles.error}>Objet introuvable</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: object.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{object.title}</Text>
        <Text style={styles.description}>{object.description}</Text>
        <Text style={styles.date}>{new Date(object.createdAt).toLocaleDateString('fr-FR')}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Retour</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 10 },
  description: { fontSize: 16, color: '#64748b', marginBottom: 10 },
  date: { fontSize: 13, color: '#2563eb', marginBottom: 20 },
  backButton: { backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' },
  backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { textAlign: 'center', marginTop: 50, color: 'red' },
});