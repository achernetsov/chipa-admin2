export interface Bot {
    id: string | null // null for new (not saved bot)
    name: string;
    description: string;
    language: string;
    csvSaved: boolean;
    telegramToken: string
}