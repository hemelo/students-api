import { WebClient } from '@slack/web-api'

const web = new WebClient(process.env.SLACK_TOKEN)

export default async function (channel, text) {
  if (!process.env.SLACK_TOKEN) return
  await web.chat.postMessage({ channel, text })
}
