export enum SEASON {
    SUMMER = 'SUMMER',
    WINTER = 'WINTER'
}

export interface MessageToDelete {
    chat_id: number;
    message_id: number;
}
