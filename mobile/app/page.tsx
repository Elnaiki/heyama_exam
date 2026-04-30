import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

/** 
 * IMPORTANT : Remplace 'localhost' par l'adresse IP de ton PC 
 * pour que ton téléphone puisse voir l'API.
 */
const API = 'http://172.30.24.79:3000';

interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function Home() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    try {
      const res = await axios.get(`${API}/objects`);
      setObjects(res.data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les objets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Heyama Objects</Text>
        <Text style={styles.headerSubtitle}>Gérez votre collection</Text>
      </View>

      <FlatList
        data={objects}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>
              
              <Link href={`/objects/${item._id}`} asChild>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Voir les détails</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun objet pour le moment</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2563eb', padding: 20, paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#dbeafe' },
  list: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  cardImage: { width: '100%', height: 180 },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  cardDescription: { fontSize: 14, color: '#64748b', marginVertical: 8 },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#94a3b8' }
});