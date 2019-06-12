const Enmap = require("enmap");
module.exports = {
    // Generates an embed based on the parameters provided
    eMaker: function embedMaker(title, desc, author, authorAvatar, color, footer, thumbnail, url){
            const Discord = require('discord.js');
            const embed = new Discord.RichEmbed();
        
            if(title !== null) embed.setTitle(title);
            if(desc !== null) embed.setDescription(desc);
            if(author !== null && authorAvatar !== null) embed.setAuthor(author, authorAvatar);
            if(color !== null) embed.setColor(color);
            if(footer !== null) embed.setFooter("", footer);
            if(thumbnail !== null) embed.setThumbnail(thumbnail);
            if(url !== null) embed.setURL(url);
            embed.setTimestamp();
        
            return embed;
        },

    // Helper for the next one.
    shuffle: function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    },

    // Shuffles an array, saving the first and last value on the same positions.
    kShuffle: function shuffle2(array, aux){
        var i;
        var keeper = [];
        for(i=0;i<aux.length;i++){
            keeper[i]=array[aux[i]];
        }
        for(i=aux.length-1;i>=0;i--){
            array.splice(aux[i],1);
        }
        this.shuffle(array);
        for(i=0;i<aux.length;i++){
            array.splice(aux[i],0,keeper[i]);
        }
        return array;
    },

    // Creates a submap out of a map, for the help command. (Splits commands map into groups based on the type(STRING) provided)
    subMapper: function makeEnmap(type, map){
        subMap = new Enmap();
        map.forEach(function (value, key, map){
            if(value.help.type === type){
                subMap.ensure(`${value.help.name}-${value.help.desc}`,{
                        name: value.help.name,
                        desc: value.help.desc
                    });
                }
        });
        return subMap;
    },

    handleTime: function handleTime(time){
        var numstr = time.replace(/\D/g, '');
        var num = parseInt(numstr) * 60;
        for(i = 0; i < time.length; i++){
            if(isNaN(time.charAt(i))){
                let char = time.charAt(i);
                switch(char){
                    case 'h':
                        num = num * 60;
                        break;
                    case 'd':
                        num = num * 60 * 24;
                        break;
                    case 'w':
                        num = num * 60 * 24 * 7;
                        break;
                    case 'm':
                        num = num * 60 * 24 * 7 * 4;
                        break;
                    case 'y':
                        num = num * 60 * 24 * 7 * 4 * 12;
                        break;
                    default:
                        break;
                }
                continue;
            }
        }
        return num;
    }
};