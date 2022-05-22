import Kafka from 'kafkajs'

/**
 * @ignore
 */
const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: process.env.MESSAGE_BROKERS.split(',')
})

/**
* @desc Send message to Kafka listeners with this function
* @param {string} topic - Kafka topic
* @param {string[]} messages - Messages to send to kafka listeners
*/
export default async function (topic, messages = []) {
  if (!messages.length) return

  const producer = kafka.producer()
  await producer.connect()

  await producer.send({
    topic,
    messages: messages.map(msg => {
      return { value: msg }
    })
  })

  await producer.disconnect()
}
