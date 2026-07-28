const { Kafka } = require("kafkajs");
const Kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9092"]
});

const producer = Kafka.producer();
async function sendOrder(order) {
    await producer.connect();
    await producer.send({
        topic: "order-topic",
        messages: [{
            value: JSON.stringify(order)
        }]
    });
    console.log("Order publiched to kafka");
    await producer.disconnect();
}

module.exports = sendOrder;