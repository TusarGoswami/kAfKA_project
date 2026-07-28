const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "email-service",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({
    groupId: "email-group"
});

async function run() {
    await consumer.connect()

    await consumer.subscribe({
        topic: "order-topic",
        fromBeginning: true
    });
    console.log("Email Service Started");

    await consumer.run({
        eachMessage: async ({ message }) => {

            const order = JSON.parse(message.value.toString());
            console.log("_EMAIL_")

            console.log(
                `Sending EMAIL to ${order.customer}`
            )
            console.log("Email Sent Successfully");
            console.log("=======")
        }
    })
}