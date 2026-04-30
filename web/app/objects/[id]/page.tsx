'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export default function ObjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [object, setObject] = useState<ObjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const res = await axios.get(`${API}/objects/${id}`);
        setObject(res.data);
      } catch (error) {
        console.error('Erreur fetch object:', error);
        toast.error("Objet introuvable");
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchObject();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/objects/${id}`);
      toast.success('Objet supprimé !');
      router.push('/');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Chargement...</p>
    </div>
  );

  if (!object) return null;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white tracking-tight">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Détail de l'objet</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <Link href="/">
          <Button variant="outline" className="mb-6 border-blue-200 text-blue-600 hover:bg-blue-50">
            ← Retour à la liste
          </Button>
        </Link>

        <Card className="border border-blue-100 shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={object.imageUrl}
              alt={object.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {new Date(object.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700 text-2xl">{object.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-600 text-base leading-relaxed">{object.description}</p>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleDelete}
            >
              Supprimer cet objet
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}