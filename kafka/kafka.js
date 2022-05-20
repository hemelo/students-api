import Kafka from 'kafkajs'

const clientId = process.env.APP_NAME
const brokers = process.env.MESSAGE_BROKERS.split(', ')

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

export default async function (topic, messages = []) {
  if (!messages.length) return

  await producer.send({
    topic,
    messages: messages.map(value => {
      return { value }
    })
  })
}
