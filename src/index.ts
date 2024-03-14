import { WHATS_MY_NAME_AGAIN } from "./config/general";
import { SendEmail } from "./services/zeptoMailService";
import { MessageTopics } from "./types/messageTypes";
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
	clientId: "message-engine",
	brokers: [process.env.BOOTSTRAP_SERVERS],
	ssl: true,
	sasl: {
		mechanism: process.env.SASL_MECHANISMS as any,
		username: process.env.SASL_USERNAME,
		password: process.env.SASL_PASSWORD,
	}
});

const consumer = kafka.consumer({ groupId: 'message-engine-group' });

const run = async () => {
	await consumer.connect();

	//define message related topics in MessageTopics enum
	for (const [_, value] of Object.entries(MessageTopics)) {
		await consumer.subscribe({ topic: value, fromBeginning: true });
	}

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			let messageObj = JSON.parse(message.value.toString());
			switch (topic) {
				case MessageTopics.Email:
					SendEmail(messageObj)
						.catch(err => {
							console.error(`[${WHATS_MY_NAME_AGAIN}] ${topic} failed. Error Info: ${JSON.stringify(err)}`);
						});
					break;
				default:
					break;
			}
		},
	});
};

run().catch(console.error);