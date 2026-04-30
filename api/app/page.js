'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
var react_1 = require("react");
var axios_1 = require("axios");
var socket_1 = require("@/lib/socket");
var link_1 = require("next/link");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sonner_1 = require("sonner");
/** URL de base de l'API NestJS */
var API = 'http://localhost:3000';
/**
 * Page principale de l'application web.
 * Affiche le formulaire de création et la liste des objets.
 * Se connecte au serveur Socket.IO pour les mises à jour en temps réel.
 */
function Home() {
    var _this = this;
    var _a = (0, react_1.useState)([]), objects = _a[0], setObjects = _a[1];
    var _b = (0, react_1.useState)(''), title = _b[0], setTitle = _b[1];
    var _c = (0, react_1.useState)(''), description = _c[0], setDescription = _c[1];
    var _d = (0, react_1.useState)(null), image = _d[0], setImage = _d[1];
    var _e = (0, react_1.useState)(null), preview = _e[0], setPreview = _e[1];
    var _f = (0, react_1.useState)(false), loading = _f[0], setLoading = _f[1];
    (0, react_1.useEffect)(function () {
        // Chargement initial des objets
        fetchObjects();
        // Écoute des nouveaux objets en temps réel via Socket.IO
        socket_1.default.on('newObject', function (obj) {
            setObjects(function (prev) { return __spreadArray([obj], prev, true); });
            sonner_1.toast.success('Nouvel objet ajouté en temps réel !');
        });
        // Nettoyage de l'écouteur Socket.IO au démontage du composant
        return function () { socket_1.default.off('newObject'); };
    }, []);
    /** Récupère tous les objets depuis l'API */
    var fetchObjects = function () { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get("".concat(API, "/objects"))];
                case 1:
                    res = _a.sent();
                    setObjects(res.data);
                    return [2 /*return*/];
            }
        });
    }); };
    /** Gère la sélection d'une image et génère un aperçu */
    var handleImageChange = function (e) {
        var _a;
        var file = ((_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) || null;
        setImage(file);
        if (file)
            setPreview(URL.createObjectURL(file));
    };
    /** Envoie le formulaire pour créer un nouvel objet */
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!title || !description || !image) {
                        sonner_1.toast.error('Remplis tous les champs !');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    formData = new FormData();
                    formData.append('title', title);
                    formData.append('description', description);
                    formData.append('image', image);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("".concat(API, "/objects"), formData)];
                case 2:
                    _b.sent();
                    // Réinitialisation du formulaire après création
                    setTitle('');
                    setDescription('');
                    setImage(null);
                    setPreview(null);
                    sonner_1.toast.success('Objet créé avec succès !');
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    sonner_1.toast.error('Erreur lors de la création !');
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    /** Supprime un objet par son identifiant */
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.delete("".concat(API, "/objects/").concat(id))];
                case 1:
                    _a.sent();
                    setObjects(function (prev) { return prev.filter(function (o) { return o._id !== id; }); });
                    sonner_1.toast.success('Objet supprimé !');
                    return [2 /*return*/];
            }
        });
    }); };
    return (<main className="min-h-screen bg-white">
      {/* En-tête de l'application */}
      <div className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white tracking-tight">Heyama Objects</h1>
          <p className="text-blue-100 text-sm mt-1">Gérez votre collection d'objets</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire de création */}
        <div className="lg:col-span-1">
          <card_1.Card className="border border-blue-100 shadow-md sticky top-6">
            <card_1.CardHeader className="bg-blue-50 rounded-t-xl">
              <card_1.CardTitle className="text-blue-700 text-xl">Créer un objet</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent className="space-y-4 pt-4">
              <div className="space-y-1">
                <label_1.Label className="text-gray-600">Titre</label_1.Label>
                <input_1.Input value={title} onChange={function (e) { return setTitle(e.target.value); }} placeholder="Ex: Mon objet" className="border-blue-200 focus:border-blue-500"/>
              </div>
              <div className="space-y-1">
                <label_1.Label className="text-gray-600">Description</label_1.Label>
                <input_1.Input value={description} onChange={function (e) { return setDescription(e.target.value); }} placeholder="Décrivez l'objet..." className="border-blue-200 focus:border-blue-500"/>
              </div>
              <div className="space-y-1">
                <label_1.Label className="text-gray-600">Image</label_1.Label>
                <input_1.Input type="file" accept="image/*" onChange={handleImageChange} className="border-blue-200"/>
              </div>
              {/* Aperçu de l'image sélectionnée */}
              {preview && (<img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg border border-blue-100"/>)}
              <button_1.Button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                {loading ? 'Envoi en cours...' : 'Créer'}
              </button_1.Button>
            </card_1.CardContent>
          </card_1.Card>
        </div>

        {/* Liste des objets */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Objets <span className="text-blue-600">({objects.length})</span>
            </h2>
          </div>

          {/* Message si aucun objet */}
          {objects.length === 0 ? (<div className="text-center py-20 text-gray-400">
              <p className="text-xl">Aucun objet pour le moment</p>
              <p className="text-sm mt-2">Créez votre premier objet !</p>
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {objects.map(function (obj) { return (<card_1.Card key={obj._id} className="border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                  <div className="relative">
                    <img src={obj.imageUrl} alt={obj.title} className="w-full h-48 object-cover"/>
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {new Date(obj.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                  <card_1.CardContent className="p-4 space-y-3">
                    <h3 className="font-bold text-lg text-gray-800">{obj.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{obj.description}</p>
                    <div className="flex gap-2 pt-1">
                      <link_1.default href={"/objects/".concat(obj._id)} className="flex-1">
                        <button_1.Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 text-sm">
                          Voir
                        </button_1.Button>
                      </link_1.default>
                      <button_1.Button variant="destructive" className="flex-1 text-sm" onClick={function () { return handleDelete(obj._id); }}>
                        Supprimer
                      </button_1.Button>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>); })}
            </div>)}
        </div>
      </div>
    </main>);
}
