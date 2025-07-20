import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly dynamoDb;
    constructor(jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    addUser(user: any): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
