"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeptomail_1 = require("zeptomail");
const zeptoMailConfig_1 = require("../config/zeptoMailConfig");
let client = new zeptomail_1.SendMailClient({ API_URL: zeptoMailConfig_1.API_URL, process, : .env.ZEPTOMAIL_TOKEN });
client.sendMail({
    "from": {
        "address": "noreply@yirifi.ai",
        "name": "noreply"
    },
    "to": [
        {
            "email_address": {
                "address": "yunik.maharjan@yirifi.xyz",
                "name": "yunik"
            }
        }
    ],
    "subject": "Test Email",
    "htmlbody": "<div><b> Test email sent successfully.</b></div>",
}).then((resp) => console.log("success")).catch((error) => console.log("error"));
//# sourceMappingURL=zeptoMailService.js.map