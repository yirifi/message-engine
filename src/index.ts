import { Kafka } from "kafkajs";

async function main() {
	const brokers = [process.env.BOOTSTRAP_SERVERS]; // Assuming 'bootstrap.servers=your_broker_list' is in your config
	const topic = "my_topic";
	const key = "Hell";
	const value = "oOOO";

	// Initialize Kafka client and producer
	const kafka = new Kafka({
		clientId: "my-app", // or use config['client.id'] if defined
		brokers: brokers, // KafkaJS accepts an array of brokers
		ssl: true, // Adjust according to your security config
		sasl: {
			mechanism: process.env.SASL_MECHANISMS as any,
			username: process.env.SASL_USERNAME,
			password: process.env.SASL_PASSWORD,
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
