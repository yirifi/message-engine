
# message-engine

## Overview

At its core, message-engine is a Node.js worker designed to consume messages from Kafka, process them, and then dispatch them to the appropriate services according to their topic. Currently, it includes functionality to send emails via the ZeptoMail service, responding to messages categorized under `send-email` topic.

## Prerequisites

Before you start, ensure you have the following:

- Apache Kafka setup and accessible
- Node.js (Version 14 or newer recommended)
- Yarn for package management
- Access to environment variables for Kafka configuration and ZeptoMail API
- It's crucial to **create the required Kafka topics beforehand**. 
    The topics should include those expected by the application for consuming messages.
    Topics are defined within the **`MessageTopics`** enum, located in `src/types/messageTypes.ts`.

## Installation

1. **Clone the Repository**

   Start by cloning the repository to your local machine or download the source code from its hosted location.

2. **Install Dependencies**

   Navigate to the project's root directory and run:
   
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the project's root directory and populate it with your Kafka and ZeptoMail configuration details:
   ```
   BOOTSTRAP_SERVERS=<your_kafka_brokers>
   SASL_USERNAME=<your_sasl_username>
   SASL_PASSWORD=<your_sasl_password>
   SASL_MECHANISMS=<your_sasl_mechanism>
   ZEPTOMAIL_TOKEN=<your_zeptomail_api_token>
   ```

## Running the Application

To start the Kafka consumer, navigate to the project's root directory and execute:

```bash
yarn start
```

This command initiates the Kafka consumer, which will listen for messages on configured topics and process them accordingly.

## Project Structure

- **`src/`**: Contains the source code of the application.
  - **`config/`**: Configuration files for general settings and ZeptoMail API.
  - **`services/`**: Service implementations, including the email service.
  - **`types/`**: TypeScript type definitions for messages and services.
  - **`index.ts`**: The entry point of the application, setting up and running the Kafka consumer.
- **`Dockerfile` & `docker-compose.yml`**: For containerization and easy deployment.
- **`package.json` & `yarn.lock`**: Project metadata and dependencies.

## Services

Currently, the application supports sending emails via the ZeptoMail API. To dispatch emails through ZeptoMail, produce a Kafka message targeting the `send-email` topic. This message should be a JSON string adhering to the structure defined by either the **`Email`** or **`TemplateEmail`** interface, as specified in `src/types/messageTypes.ts`.

We can extend the application with more services:

1. Create a new service file in `src/services/`.
2. Implement your service logic.
3. Include kafka topic for the service within the **`MessageTopics`** enum, located in `src/types/messageTypes.ts`.
4. Import and use your service in `src/index.ts` based on specific kafka topic.

## Deployment

The application can be deployed using Docker. Ensure Docker and Docker Compose are installed, then run:

```bash
docker-compose up
```

This command builds and starts the Kafka Message Engine in a Docker container.

## Troubleshooting

- **Kafka Connection Issues**: Ensure your Kafka cluster is accessible and your environment variables are correctly configured.
- **Service Errors**: Check the logs for any service-specific errors and ensure all API credentials are valid.
