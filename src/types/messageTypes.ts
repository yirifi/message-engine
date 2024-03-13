export interface EmailMessage {
    to: string[];
    subject: string;
    body: string;
    bodyType?: EmailBodyType;
    cc?: string[];
    bcc?: string[];
}

export type EmailBodyType = "Text" | "HTML";