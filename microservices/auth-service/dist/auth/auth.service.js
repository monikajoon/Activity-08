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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
let AuthService = class AuthService {
    jwtService;
    dynamoDb;
    constructor(jwtService) {
        this.jwtService = jwtService;
        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: 'AKIA437JTQEMRNHWPRXC',
            secretAccessKey: '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',
        });
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }
    async validateUser(username, pass) {
        const params = {
            TableName: 'user-table',
            Key: {
                username: username,
            },
        };
        try {
            const result = await this.dynamoDb.get(params).promise();
            const user = result.Item;
            if (user) {
                const isPasswordMatching = await bcrypt.compare(pass, user.password);
                if (isPasswordMatching) {
                    const { password, ...result } = user;
                    return result;
                }
            }
            return null;
        }
        catch (error) {
            console.error('Error fetching user from DynamoDB:', error);
            return null;
        }
    }
    async addUser(user) {
        console.log('hi', user);
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const params = {
            TableName: 'user-table',
            Item: {
                username: user.username,
                password: hashedPassword,
                isActive: user.isActive,
                isAdmin: user.isAdmin,
            },
        };
        try {
            await this.dynamoDb.put(params).promise();
            return { message: 'User added successfully' };
        }
        catch (error) {
            console.error('Error adding user to DynamoDB:', error);
            throw new Error('Could not add user');
        }
    }
    async login(user) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map