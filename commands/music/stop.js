const Command = require('../../struct/Command');

module.exports = class StopCommand extends Command {
    constructor() {
        super('stop', {
            category: 'music',
            description: 'Stop the Music Player',
        });
    }

    async exec(message) {
        try {
            const { music } = message.guild;

            if (!music.player) {
                return message.channel.send('**Currently not playing anything**');
            }

            if (!message.member.voice.channel) {
                return message.channel.send('**You must be in a voice channel**');
            }

            if (message.guild.me.voice.channel && !message.guild.me.voice.channel.equals(message.member.voice.channel)) {
                return message.channel.send(`You must be in **${message.guild.me.voice.channel}** to use Music commands`);
            }

            await music.stop();
        } catch (err) {
            this.client.log(new Error(err.message));
        }
    }
};