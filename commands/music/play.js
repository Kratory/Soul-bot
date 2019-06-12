// play command
const config = require('../../config/config.json');
const tools = require('../../functions.js');
const Util = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const queue = new Map();

exports.run = (client, message, music_args) => {
    const youtube = new Youtube(config.GOOGLE_API_KEY);
    const args = music_args;
    const url = args[1];
    const voiceChannel = message.member.voiceChannel;

    if(!voiceChannel) return message.channel.send(tools.eMaker(null, "Gotta be on voce channel for that mate!", message.author.username, message.author.avatarURL, 11208320, null, null, null));
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.send(tools.eMaker(null, "Its gonna be a no no, can\'t reach you.", null, null, 11208320, null, null, null));
    if(!permissions.has('SPEAK')) return message.channel.send(tools.eMaker(null, "Seems like I have no rights to talk anymore.", null, null, 11208320, null, null, null));

    
    youtubeValidate(url);

    async function youtubeValidate(url){
        const args = message.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const voiceChannel = message.member.voiceChannel;

        if(!searchString) return message.channel.send(tools.eMaker(null, "What do you want me to play? You might want to check out **>help play**", null, null, 11208320, null, null, null));

        if (url != undefined || url != '') {        
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                if(url.search('&list=') != -1){ // Is it a valid YT playlist?
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                
                    for(const video of Object.values(videos)){
                        const video2 = await youtube.getVideoByID(video.id);
                        await handleVideo(video2, message, voiceChannel, true);
                    }
                    message.delete({timeout: 1000});
                    return message.channel.send(tools.eMaker("**__PLAYLIST ADDED__**", playlist.title, message.author.usaername, message.author.avatarURL, 11208320, message.author.avatarURL, playlist.thumbnail, playlist.url));
                }else{
                    var video = await youtube.getVideo(url);
                    return handleVideo(video, message, voiceChannel);
                }
            } else {
                try{
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch(err){
                    console.error(err);
                    return message.channel.send(tools.eMaker(null, "Couldn\'t find anything useful!", null, null, 11208320, null, null, null));
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    }

    async function handleVideo(video, message, voiceChannel, playlist = false){
        const serverQueue = queue.get(message.guild.id);
        const song = {
            id: video.id,
            title: video.title,
            thumbnail: `http://img.youtube.com/vi/${video.id}/0.jpg`,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        
        if(!serverQueue){
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try{
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
                message.delete({timeout: 1000});
                return message.channel.send(tools.eMaker("**__ADDED TO THE QUEUE__**", song.title, message.author.username, message.author.avatarURL, 11208320, message.author.avatarURL, song.thumbnail, song.url));
            } catch(error){
                console.error(`Cant reach you: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(tools.eMaker(null, "Can\'t reach where you're at!", null, null, 11208320, null, null, null));
            }
        } else {
            serverQueue.songs.push(song);
            if(playlist) return undefined;
            else{
                message.delete({timeout: 1000});
                return message.channel.send(tools.eMaker("**__ADDED TO THE QUEUE__**", song.title, message.author.username, message.author.avatarURL, 11208320, message.author.avatarURL, song.thumbnail, song.url));
            } 
        }
    }

    function play(guild, song){
        const serverQueue = queue.get(guild.id);
        module.exports.serverQueue = serverQueue;
        if(!song){
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                if(reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                console.log('Song ended');
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume /5);
    }
};

module.exports.help = {
    type: "music",
    name: "play",
    desc: "Searchs and plays a youtube video by URL or name. It can also do playlists!",
    usage: "play URL/name of the song/"
};