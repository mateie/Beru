const Command = require('../../struct/Command');

module.exports = class LoopCommand extends Command {
    constructor() {
        super('loop', {
            category: 'music',
            aliases: ['repeat'],
            description: 'Loop current song',
        });
    }

    exec(message) {
        try {
            const { music } = message.guild;

            if (!music.player) {
                return message.channel.send('**Currently not playing anything**');
            }

            if (!message.member.voice.channel) {
                return message.channel.send('**You must be in a voice channel**');
            }

            if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel)) {
                return message.channel.send(`You must be on **${message.guild.me.voice.channel}** to use Music commands`);
            }

            music.toggleLoop();

            message.channel.send(`Loop **${music.loop ? 'enabled' : 'disabled'}**`);
        } catch(err) {
            this.client.log(new Error(err.message));
        }
    }
};