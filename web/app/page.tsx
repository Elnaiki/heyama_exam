'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '@/lib/socket';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function Home() {
  const [objects, setObjects] = useState<ObjectItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchObjects();

    socket.on('newObject', (obj: ObjectItem) => {
      setObjects((prev) => [obj, ...prev]);
      toast.success('Nouvel objet ajouté en temps réel !');
    });

    socket.on('deletedObject', (id: string) => {
      setObjects((prev) => prev.filter((o) => o._id !== id));
      toast.success('Objet supprimé en temps réel !');
    });

    return () => {
      socket.off('newObject');
      socket.off('deletedObject');
    };
  }, []);

  const fetchObjects = async () => {
    try {
      const res = await axios.get(`${API}/objects`);
      setObjects(res.data);
    } catch (error: any) {
      console.error("Erreur fetch objects:", error);
      toast.error("Impossible de charger les objets");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      toast.error('Remplis tous les champs !');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await axios.post(`${API}/objects`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      setTitle('');
      setDescription('');
      setImage(null);
      setPreview(null);
      toast.success('Objet créé avec succès !');
    } catch (error: any) {
      console.error("Erreur création objet:", error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création !');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API}/objects/${id}`);
      toast.success('Objet supprimé !');
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white tracking-tight">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Gérez votre collection d'objets</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="border border-blue-100 shadow-md sticky top-6">
            <CardHeader className="bg-blue-50 rounded-t-xl">
              <CardTitle className="text-blue-700 text-xl">Créer un objet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-1">
                <Label className="text-gray-600">Titre</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Mon objet"
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-gray-600">Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez l'objet..."
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-gray-600">Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-blue-200"
                />
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-lg border border-blue-100"
                />
              )}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {loading ? 'Envoi en cours...' : 'Créer'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Objets <span className="text-blue-600">({objects.length})</span>
            </h2>
          </div>

          {objects.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl">Aucun objet pour le moment</p>
              <p className="text-sm mt-2">Créez votre premier objet !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objects.map((obj) => (
                <Card key={obj._id} className="border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                  <div className="relative">
                    <img
                      src={obj.imageUrl}
                      alt={obj.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {new Date(obj.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-800">{obj.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{obj.description}</p>
                    <div className="flex gap-2 pt-1">
                      <Link href={`/objects/${obj._id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 text-sm">
                          Voir
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="flex-1 text-sm"
                        onClick={() => handleDelete(obj._id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}