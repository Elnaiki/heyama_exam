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
    } catch (error) {
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
      await axios.post(`${API}/objects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 secondes
      });

      setTitle('');
      setDescription('');
      setImage(null);
      setPreview(null);
      toast.success('Objet créé avec succès !');
      
      // On ne refetch pas manuellement car Socket.IO devrait le faire
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
      {/* ... le reste de ton JSX reste identique ... */}
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white tracking-tight">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Gérez votre collection d'objets</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire et liste restent les mêmes */}
        {/* ... ton code JSX ici ... */}
      </div>
    </main>
  );
}