import { Message } from "../models/User";

export interface Apiresponse{
    success: boolean;
    message: string;
    isAcceptinMessages?: boolean;
    messages?: Array<Message>
}

