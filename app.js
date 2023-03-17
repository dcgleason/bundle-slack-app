require('dotenv').config();
const { App, LogLevel } = require('@slack/bolt');
const { SocketModeReceiver } = require('@slack/socket-mode');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: new SocketModeReceiver({ appToken: process.env.SLACK_APP_TOKEN }),
  logLevel: LogLevel.DEBUG,
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running in Socket Mode!');
})();

app.command('/create-gift-channel', async ({ command, ack, respond }) => {
    await ack();
    const channelId = await createGiftChannel(command);
    await inviteMembers(channelId, command.user_id);
    await respond(`Channel created successfully: <#${channelId}>. You can invite more team members and start collecting messages.`);
  });
  
  async function createGiftChannel(command) {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);
  
    const result = await app.client.conversations.create({
      token: process.env.SLACK_BOT_TOKEN,
      name: `gift-for-${command.text}-${today.toISOString().slice(0, 10)}-${oneWeekLater.toISOString().slice(0, 10)}`,
      is_private: true,
    });
  
    return result.channel.id;
  }
  
  async function inviteMembers(channelId, userId) {
    await app.client.conversations.invite({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId,
      users: userId,
    });
  }
  
  app.command('/reveal-gift', async ({ command, ack, respond }) => {
    await ack();
    const channelId = command.text.trim();
    const messages = await fetchMessages(channelId);
    const formattedMessages = formatMessages(messages);
    await sendMessages(command.user_id, formattedMessages);
    await respond('Messages have been sent to the recipient.');
  });
  
  async function fetchMessages(channelId) {
    const result = await app.client.conversations.history({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId,
    });
  
    return result.messages;
  }
  
  function formatMessages(messages) {
    return messages.map((message) => `*${message.user}*: ${message.text}`).join('\n');
  }
  
  async function sendMessages(userId, messages) {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: userId,
      text: 'You have received a gift! Here are the messages:\n' + messages,
    });
  }
  ``
  