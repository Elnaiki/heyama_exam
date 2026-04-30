'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectDetail;
var react_1 = require("react");
var axios_1 = require("axios");
var navigation_1 = require("next/navigation");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var link_1 = require("next/link");
/** URL de base de l'API NestJS */
var API = 'http://localhost:3000';
/**
 * Page de détail d'un objet.
 * Récupère et affiche les informations complètes d'un objet
 * en utilisant l'identifiant présent dans l'URL.
 */
function ObjectDetail() {
    var id = (0, navigation_1.useParams)().id;
    var _a = (0, react_1.useState)(null), object = _a[0], setObject = _a[1];
    (0, react_1.useEffect)(function () {
        // Récupération de l'objet dès que l'id est disponible
        if (id) {
            axios_1.default.get("".concat(API, "/objects/").concat(id)).then(function (res) { return setObject(res.data); });
        }
    }, [id]);
    // Affichage d'un message de chargement pendant la récupération
    if (!object)
        return (<div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-gray-400 text-lg">Chargement...</p>
    </div>);
    return (<main className="min-h-screen bg-white">
      {/* En-tête */}
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Détail de l'objet</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        {/* Bouton retour vers la liste */}
        <link_1.default href="/">
          <button_1.Button variant="outline" className="mb-6 border-blue-200 text-blue-600 hover:bg-blue-50">
            Retour
          </button_1.Button>
        </link_1.default>

        {/* Carte de détail de l'objet */}
        <card_1.Card className="border border-blue-100 shadow-md overflow-hidden">
          <img src={object.imageUrl} alt={object.title} className="w-full h-72 object-cover"/>
          <card_1.CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{object.title}</h2>
            <p className="text-gray-500">{object.description}</p>
            <div className="pt-2 border-t border-blue-100">
              <p className="text-sm text-blue-600">
                Créé le : {new Date(object.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>
    </main>);
}
