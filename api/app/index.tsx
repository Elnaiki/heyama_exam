import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  Image, StyleSheet, Alert, ActivityIndicator, SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { io } from 'socket.io-client';

const API = 'http://172.30.24.79:3000';
const socket = io(API);

interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchObjects();
    socket.on('newObject', (obj: ObjectItem) => {
      setObjects((prev) => [obj, ...prev]);
    });
    return () => { socket.off('newObject'); };
  }, []);

  const fetchObjects = async () => {
    try {
      const res = await axios.get(`${API}/objects`);
      setObjects(res.data);
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de charger les objets');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      Alert.alert('Erreur', 'Remplis tous les champs !');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', {
      uri: image.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);
    try {
      await axios.post(`${API}/objects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setDescription('');
      setImage(null);
      Alert.alert('Succès', 'Objet créé !');
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer l objet');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API}/objects/${id}`);
    setObjects((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Heyama Objects</Text>
        <Text style={styles.headerSubtitle}>Gérez votre collection</Text>
      </View>

      <FlatList
        data={objects}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Créer un objet</Text>
            <TextInput
              style={styles.input}
              placeholder="Titre"
              placeholderTextColor="#94a3b8"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#94a3b8"
              value={description}
              onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Text style={styles.imageButtonText}>
                {image ? 'Image sélectionnée' : 'Choisir une image'}
              </Text>
            </TouchableOpacity>
            {image && (
              <Image source={{ uri: image.uri }} style={styles.preview} />
            )}
            <TouchableOpacity
              style={[styles.createButton, loading && styles.createButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Créer</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>
              Objets ({objects.length})
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/object/${item._id}`)}>
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.cardDate}>
                  {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: '#bfdbfe', marginTop: 2 },
  form: { padding: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#1e293b',
    fontSize: 15,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#eff6ff',
  },
  imageButtonText: { color: '#2563eb', fontWeight: '600' },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonDisabled: { backgroundColor: '#93c5fd' },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dbeafe',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: { width: '100%', height: 160 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  cardDescription: { fontSize: 13, color: '#64748b', marginBottom: 6 },
  cardDate: { fontSize: 11, color: '#2563eb', marginBottom: 8 },
  deleteButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  deleteButtonText: { color: '#dc2626', fontWeight: '600', fontSize: 13 },
});