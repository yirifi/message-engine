import { SendMailClient } from "zeptomail";
import { API_URL, FROM_EMAIL, FROM_NAME } from "../config/zeptoMailConfig";
import { EmailMessage } from "../types/messageTypes";

export async function SendEmail(params: EmailMessage) {
    let client = new SendMailClient({ API_URL, token: process.env.ZEPTOMAIL_TOKEN });

    params.bodyType ??= "HTML" //default email body type as HTML
    const body = params.bodyType === "HTML" ? { "htmlbody": params.body } : { "textbody": params.body };

    var payload = {
        "from":
        {
            "address": FROM_EMAIL,
            "name": FROM_NAME
        },
        "to": formatEmailAddressesToJson(params.to),
        "subject": params.subject,
        ...body,
        "cc": formatEmailAddressesToJson(params.cc),
        "bcc": formatEmailAddressesToJson(params.bcc),
    };
    
    return await client.sendMail(payload);
}

function formatEmailAddressesToJson(addresses?: string[]) {
    return addresses?.map((address, _) => ({
        email_address: {
            address: address,
            name: address.split("@")[0]
        }
    })) || [];
}