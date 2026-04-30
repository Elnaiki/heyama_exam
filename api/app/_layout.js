"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
var expo_router_1 = require("expo-router");
function Layout() {
    return (<expo_router_1.Stack>
      <expo_router_1.Stack.Screen name="index" options={{ title: 'Heyama' }}/>
      <expo_router_1.Stack.Screen name="object/[id]" options={{ title: 'Détail' }}/>
    </expo_router_1.Stack>);
}
