import { WebClient } from '@slack/web-api'

/**
 * @ignore
 */
const web = new WebClient(process.env.SLACK_TOKEN)

/**
* @desc Send message to a Slack channel with this function
* @param {string} channel - Slack channel
* @param {string} text - Message to send to slack
*/
export default async function (channel, text) {
  if (!process.env.SLACK_TOKEN) return
  await web.chat.postMessage({ channel, text })
}
