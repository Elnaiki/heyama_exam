'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/** URL de base de l'API NestJS */
const API = 'http://localhost:3000';

/** Structure d'un objet retourné par l'API */
interface ObjectItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

/**
 * Page de détail d'un objet.
 * Récupère et affiche les informations complètes d'un objet
 * en utilisant l'identifiant présent dans l'URL.
 */
export default function ObjectDetail() {
  const { id } = useParams();
  const [object, setObject] = useState<ObjectItem | null>(null);

  useEffect(() => {
    // Récupération de l'objet dès que l'id est disponible
    if (id) {
      axios.get(`${API}/objects/${id}`).then((res) => setObject(res.data));
    }
  }, [id]);

  // Affichage d'un message de chargement pendant la récupération
  if (!object) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-400 text-lg">Chargement...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* En-tête */}
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Détail de l'objet</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        {/* Bouton retour vers la liste */}
        <Link href="/">
          <Button variant="outline" className="mb-6 border-blue-200 text-blue-600 hover:bg-blue-50">
            Retour
          </Button>
        </Link>

        {/* Carte de détail de l'objet */}
        <Card className="border border-blue-100 shadow-md overflow-hidden">
          <img src={object.imageUrl} alt={object.title} className="w-full h-72 object-cover" />
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{object.title}</h2>
            <p className="text-gray-500">{object.description}</p>
            <div className="pt-2 border-t border-blue-100">
              <p className="text-sm text-blue-600">
                Créé le : {new Date(object.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}