export interface TokenPayload {
    id: string;
    email: string;
}

export interface LoginUserRequestDto {
    email: string;
    password: string;
}

export interface RegisterUserRequestDto {
    name: string;
    email: string;
    roleId: string;
    password: string;
}
