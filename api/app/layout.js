"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
require("./globals.css");
var sonner_1 = require("@/components/ui/sonner");
var geistSans = (0, google_1.Geist)({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
var geistMono = (0, google_1.Geist_Mono)({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
exports.metadata = {
    title: "Heyama",
    description: "Gestion d'objets",
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="fr" className={"".concat(geistSans.variable, " ").concat(geistMono.variable, " h-full antialiased")}>
      <body className="min-h-full flex flex-col">
        {children}
        <sonner_1.Toaster />
      </body>
    </html>);
}
