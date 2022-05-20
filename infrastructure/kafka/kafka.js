import Kafka from 'kafkajs'

const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: process.env.MESSAGE_BROKERS.split(',')
})

const producer = kafka.producer()

export default async function (topic, messages = []) {
  if (!messages.length) return

  await producer.connect()

  await producer.send({
    topic,
    messages: messages.map(msg => {
      return { value: msg }
    })
  })
}
