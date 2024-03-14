export interface Email {
    to: string[];
    subject: string;
    body: string;
    bodyType?: EmailBodyType;
    cc?: string[];
    bcc?: string[];
}

export type EmailBodyType = "Text" | "HTML";

export interface TemplateEmail extends Email {
    templateKey: string;
    mergeInfo: { [key: string]: any };
}

export enum MessageTopics
{
    Email = "send-email"
}