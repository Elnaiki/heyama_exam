"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
/**
 * Instance Socket.IO connectée au serveur NestJS.
 * Cette instance est partagée dans toute l'application web
 * pour recevoir les événements en temps réel.
 */
var socket = (0, socket_io_client_1.io)('http://localhost:3000');
exports.default = socket;
