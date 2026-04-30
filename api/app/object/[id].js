"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectDetail;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_router_1 = require("expo-router");
var axios_1 = require("axios");
var API = 'http://172.30.24.79:3000';
function ObjectDetail() {
    var id = (0, expo_router_1.useLocalSearchParams)().id;
    var router = (0, expo_router_1.useRouter)();
    var _a = (0, react_1.useState)(null), object = _a[0], setObject = _a[1];
    (0, react_1.useEffect)(function () {
        if (id) {
            axios_1.default.get("".concat(API, "/objects/").concat(id)).then(function (res) { return setObject(res.data); });
        }
    }, [id]);
    if (!object)
        return (<react_native_1.View style={styles.center}>
      <react_native_1.ActivityIndicator size="large" color="#2563eb"/>
    </react_native_1.View>);
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backButton}>
          <react_native_1.Text style={styles.backText}>Retour</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={styles.headerTitle}>Détail</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.Image source={{ uri: object.imageUrl }} style={styles.image}/>

      <react_native_1.View style={styles.content}>
        <react_native_1.Text style={styles.title}>{object.title}</react_native_1.Text>
        <react_native_1.Text style={styles.description}>{object.description}</react_native_1.Text>
        <react_native_1.View style={styles.dateBadge}>
          <react_native_1.Text style={styles.dateText}>
            Créé le : {new Date(object.createdAt).toLocaleDateString('fr-FR')}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.SafeAreaView>);
}
var styles = react_native_1.StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        backgroundColor: '#1d4ed8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    backText: { color: '#fff', fontWeight: '600' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    image: { width: '100%', height: 260 },
    content: { padding: 20, gap: 12 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    description: { fontSize: 16, color: '#64748b', lineHeight: 24 },
    dateBadge: {
        backgroundColor: '#eff6ff',
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
    },
    dateText: { color: '#2563eb', fontSize: 13, fontWeight: '600' },
});
