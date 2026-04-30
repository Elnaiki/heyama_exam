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
var react_native_1 = require("react-native");
var ImagePicker = require("expo-image-picker");
var axios_1 = require("axios");
var expo_router_1 = require("expo-router");
var socket_io_client_1 = require("socket.io-client");
var API = 'http://172.30.24.79:3000';
var socket = (0, socket_io_client_1.io)(API);
function Home() {
    var _this = this;
    var router = (0, expo_router_1.useRouter)();
    var _a = (0, react_1.useState)([]), objects = _a[0], setObjects = _a[1];
    var _b = (0, react_1.useState)(''), title = _b[0], setTitle = _b[1];
    var _c = (0, react_1.useState)(''), description = _c[0], setDescription = _c[1];
    var _d = (0, react_1.useState)(null), image = _d[0], setImage = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    (0, react_1.useEffect)(function () {
        fetchObjects();
        socket.on('newObject', function (obj) {
            setObjects(function (prev) { return __spreadArray([obj], prev, true); });
        });
        return function () { socket.off('newObject'); };
    }, []);
    var fetchObjects = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(API, "/objects"))];
                case 1:
                    res = _a.sent();
                    setObjects(res.data);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    react_native_1.Alert.alert('Erreur', 'Impossible de charger les objets');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var pickImage = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: false,
                        quality: 1,
                    })];
                case 1:
                    result = _a.sent();
                    if (!result.canceled) {
                        setImage(result.assets[0]);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var formData, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!title || !description || !image) {
                        react_native_1.Alert.alert('Erreur', 'Remplis tous les champs !');
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    formData = new FormData();
                    formData.append('title', title);
                    formData.append('description', description);
                    formData.append('image', {
                        uri: image.uri,
                        name: 'photo.jpg',
                        type: 'image/jpeg',
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("".concat(API, "/objects"), formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })];
                case 2:
                    _a.sent();
                    setTitle('');
                    setDescription('');
                    setImage(null);
                    react_native_1.Alert.alert('Succès', 'Objet créé !');
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    react_native_1.Alert.alert('Erreur', 'Impossible de créer l objet');
                    return [3 /*break*/, 4];
                case 4:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.delete("".concat(API, "/objects/").concat(id))];
                case 1:
                    _a.sent();
                    setObjects(function (prev) { return prev.filter(function (o) { return o._id !== id; }); });
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.headerTitle}>Heyama Objects</react_native_1.Text>
        <react_native_1.Text style={styles.headerSubtitle}>Gérez votre collection</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.FlatList data={objects} keyExtractor={function (item) { return item._id; }} ListHeaderComponent={<react_native_1.View style={styles.form}>
            <react_native_1.Text style={styles.sectionTitle}>Créer un objet</react_native_1.Text>
            <react_native_1.TextInput style={styles.input} placeholder="Titre" placeholderTextColor="#94a3b8" value={title} onChangeText={setTitle}/>
            <react_native_1.TextInput style={styles.input} placeholder="Description" placeholderTextColor="#94a3b8" value={description} onChangeText={setDescription}/>
            <react_native_1.TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <react_native_1.Text style={styles.imageButtonText}>
                {image ? 'Image sélectionnée' : 'Choisir une image'}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>
            {image && (<react_native_1.Image source={{ uri: image.uri }} style={styles.preview}/>)}
            <react_native_1.TouchableOpacity style={[styles.createButton, loading && styles.createButtonDisabled]} onPress={handleSubmit} disabled={loading}>
              {loading ? (<react_native_1.ActivityIndicator color="#fff"/>) : (<react_native_1.Text style={styles.createButtonText}>Créer</react_native_1.Text>)}
            </react_native_1.TouchableOpacity>
            <react_native_1.Text style={styles.sectionTitle}>
              Objets ({objects.length})
            </react_native_1.Text>
          </react_native_1.View>} renderItem={function (_a) {
            var item = _a.item;
            return (<react_native_1.TouchableOpacity onPress={function () { return router.push("/object/".concat(item._id)); }}>
            <react_native_1.View style={styles.card}>
              <react_native_1.Image source={{ uri: item.imageUrl }} style={styles.cardImage}/>
              <react_native_1.View style={styles.cardContent}>
                <react_native_1.Text style={styles.cardTitle}>{item.title}</react_native_1.Text>
                <react_native_1.Text style={styles.cardDescription} numberOfLines={2}>
                  {item.description}
                </react_native_1.Text>
                <react_native_1.Text style={styles.cardDate}>
                  {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                </react_native_1.Text>
                <react_native_1.TouchableOpacity style={styles.deleteButton} onPress={function () { return handleDelete(item._id); }}>
                  <react_native_1.Text style={styles.deleteButtonText}>Supprimer</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>);
        }} contentContainerStyle={styles.list}/>
    </react_native_1.SafeAreaView>);
}
var styles = react_native_1.StyleSheet.create({
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
