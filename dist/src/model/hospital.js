"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Hospital = class Hospital extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Hospital.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], Hospital.prototype, "uuid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hospital.prototype, "hospitalCode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hospital.prototype, "hospitalName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hospital.prototype, "county", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hospital.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Hospital.prototype, "level", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], Hospital.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
        default: +new Date()
    }),
    __metadata("design:type", Number)
], Hospital.prototype, "createTime", void 0);
__decorate([
    typeorm_1.Column({
        type: 'double',
        default: +new Date()
    }),
    __metadata("design:type", Number)
], Hospital.prototype, "updateTime", void 0);
Hospital = __decorate([
    typeorm_1.Entity()
], Hospital);
exports.Hospital = Hospital;
//# sourceMappingURL=hospital.js.map