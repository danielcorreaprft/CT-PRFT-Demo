declare namespace Express {
    interface User {
        id: string;
        displayName: string;
        username: string;
        provider: string;
        given_name: string;
        family_name: string;
    }

    interface Request {
        user?: User;
    }
}
