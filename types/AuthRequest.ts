import {Request} from 'express'

interface User {
    id: string;
    displayName: string;
    username: string;
    provider: string;
    given_name: string;
    family_name: string;
    email: string;
}
interface AuthRequest extends Request{
    user?: User;
}

export default AuthRequest;