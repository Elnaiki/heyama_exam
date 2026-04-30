"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSchema = exports.ObjectEntity = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var ObjectEntity = function () {
    var _classDecorators = [(0, mongoose_1.Schema)({ timestamps: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _imageUrl_decorators;
    var _imageUrl_initializers = [];
    var _imageUrl_extraInitializers = [];
    var _imageKey_decorators;
    var _imageKey_initializers = [];
    var _imageKey_extraInitializers = [];
    var ObjectEntity = _classThis = /** @class */ (function () {
        function ObjectEntity_1() {
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.imageUrl = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrl_initializers, void 0));
            this.imageKey = (__runInitializers(this, _imageUrl_extraInitializers), __runInitializers(this, _imageKey_initializers, void 0));
            __runInitializers(this, _imageKey_extraInitializers);
        }
        return ObjectEntity_1;
    }());
    __setFunctionName(_classThis, "ObjectEntity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _description_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _imageUrl_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _imageKey_decorators = [(0, mongoose_1.Prop)()];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _imageUrl_decorators, { kind: "field", name: "imageUrl", static: false, private: false, access: { has: function (obj) { return "imageUrl" in obj; }, get: function (obj) { return obj.imageUrl; }, set: function (obj, value) { obj.imageUrl = value; } }, metadata: _metadata }, _imageUrl_initializers, _imageUrl_extraInitializers);
        __esDecorate(null, null, _imageKey_decorators, { kind: "field", name: "imageKey", static: false, private: false, access: { has: function (obj) { return "imageKey" in obj; }, get: function (obj) { return obj.imageKey; }, set: function (obj, value) { obj.imageKey = value; } }, metadata: _metadata }, _imageKey_initializers, _imageKey_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ObjectEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ObjectEntity = _classThis;
}();
exports.ObjectEntity = ObjectEntity;
exports.ObjectSchema = mongoose_1.SchemaFactory.createForClass(ObjectEntity);
