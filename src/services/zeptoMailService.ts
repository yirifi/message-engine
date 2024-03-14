import { SendMailClient } from "zeptomail";
import { API_URL, FROM_EMAIL, FROM_NAME, TEMPLATE_API_URL } from "../config/zeptoMailConfig";
import { Email, TemplateEmail } from "../types/messageTypes";

export async function SendEmail(params: Email | TemplateEmail) {
    const isTemplateEmail = "templateKey" in params && "mergeInfo" in params;
    
    let url = isTemplateEmail ? TEMPLATE_API_URL : API_URL
    let client = new SendMailClient({ url, token: process.env.ZEPTOMAIL_TOKEN });

    params.bodyType ??= "HTML"; //default email body type as HTML
    const body = params.bodyType === "HTML" ? { "htmlbody": params.body } : { "textbody": params.body };

    let templateInfo = {};
    if (isTemplateEmail) {
        templateInfo = {
            "mail_template_key": params.templateKey,
            "merge_info": params.mergeInfo
        }
    }

    var payload = {
        "from":
        {
            "address": FROM_EMAIL,
            "name": FROM_NAME
        },
        "to": formatEmailAddressesToJson(params.to),
        "subject": params.subject,
        ...body,
        ...templateInfo,
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