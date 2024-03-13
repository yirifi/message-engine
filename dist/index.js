"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const brokers = [process.env.BOOTSTRAP_SERVERS]; // Assuming 'bootstrap.servers=your_broker_list' is in your config
        const topic = "my_topic";
        const key = "Hell";
        const value = "oOOO";
        // Initialize Kafka client and producer
        const kafka = new kafkajs_1.Kafka({
            clientId: "my-app", // or use config['client.id'] if defined
            brokers: brokers, // KafkaJS accepts an array of brokers
            ssl: true, // Adjust according to your security config
            sasl: {
                mechanism: process.env.SASL_MECHANISMS,
                username: process.env.SASL_USERNAME,
                password: process.env.SASL_PASSWORD,
            },
            // Additional security configuration might be required depending on your Kafka setup
        });
        const producer = kafka.producer();
        yield producer.connect();
        yield producer.send({
            topic: topic,
            messages: [{ key: key, value: value }],
        });
        console.log(`Produced message to topic ${topic}: key = ${key}, value = ${value}`);
        // It's important to gracefully disconnect the producer when done
        yield producer.disconnect();
    });
}
main().catch(console.error);
//# sourceMappingURL=index.js.map