const Command = require('../../struct/Command');
const Util = require('../../struct/Util');

module.exports = class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: 'info',
            desription: 'Connects to the API directly from the Bot and checks its Response Time',
        });
    }

    async exec(message) {
        const pingMessage = await message.channel.send(Util.embed().setDescription('Pinging...'));
        return pingMessage.edit(Util.embed().setDescription(`The message took ${(pingMessage.editedTimestamp || pingMessage.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms to send. API Response time is ${this.client.ws.ping ? `${Math.round(this.client.ws.ping)}ms` : 'unknown'}`));
    }
};