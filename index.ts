import { Kafka } from "kafkajs";
import fs from "fs";

function readConfig(fileName) {
	const data = fs.readFileSync(fileName, "utf8").toString().split("\n");
	return data.reduce((config, line) => {
		const [key, value] = line.split("=");
		if (key && value) {
			config[key.trim()] = value.trim();
		}
		return config;
	}, {});
}

async function main() {
	const config = readConfig("client.properties");
	console.log(config);
	const brokers = [config["bootstrap.servers"]]; // Assuming 'bootstrap.servers=your_broker_list' is in your config
	const topic = "my_topic";
	const key = "Hell";
	const value = "oOOO";

	// Initialize Kafka client and producer
	const kafka = new Kafka({
		clientId: "my-app", // or use config['client.id'] if defined
		brokers: brokers, // KafkaJS accepts an array of brokers
		ssl: true, // Adjust according to your security config
		sasl: {
			mechanism: config["sasl.mechanisms"],
			username: config["sasl.username"],
			password: config["sasl.password"],
		},
		// Additional security configuration might be required depending on your Kafka setup
	});

	const producer = kafka.producer();

	await producer.connect();
	await producer.send({
		topic: topic,
		messages: [{ key: key, value: value }],
	});

	console.log(
		`Produced message to topic ${topic}: key = ${key}, value = ${value}`
	);

	// It's important to gracefully disconnect the producer when done
	await producer.disconnect();
}

main().catch(console.error);
