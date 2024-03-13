"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_rdkafka_1 = __importDefault(require("node-rdkafka"));
function readConfig(fileName) {
    const data = fs_1.default.readFileSync(fileName, "utf8").toString().split("\n");
    return data.reduce((config, line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            config[key] = value;
        }
        return config;
    }, {});
}
function main() {
    const config = readConfig("client.properties");
    const topic = "mytrigger";
    const key = "key";
    const value = "value";
    // creates a new producer instance
    const producer = new node_rdkafka_1.default.Producer(config);
    producer.connect();
    producer.on("ready", () => {
        // produces a sample message
        producer.produce(topic, -1, Buffer.from(value), Buffer.from(key));
        console.log(`Produced message to topic ${topic}: key = ${key} value = ${value}`);
    });
}
main();
//# sourceMappingURL=index%20copy.js.map