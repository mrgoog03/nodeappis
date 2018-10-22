const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const suck = JSON.parse(fs.readFileSync('./suck.json', 'utf8'));
const prefix = "!";

client.on("message", message => {
    fs.writeFile('./suck.json', JSON.stringify(suck));
});

client.on('ready', () => {
    setInterval(function(){
        client.guilds.forEach(g => {
            if (suck[g.id]) {
                if (suck[g.id].role) {
                    var role = g.roles.get(suck[g.id].role);
                    if (role) {
                        role.edit({color : "RANDOM"});
                    };
                };
            };
        });
    }, 4000);
})

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type !== "text") return message.reply("This Command Is Only Allowed In Servers");
    var args = message.content.split(" ");
    var command = args[0].slice(prefix.length);
    switch(command) {
        case "set" :
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINSTRATOR`' );
        message.guild.createRole({name : "RainbowBot .", color : "RANDOM"}).then(r => {
            r.edit({color : "RANDOM"});
            suck[message.guild.id] = {role : r.id};
        });
    };
});


client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : L4EX`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : L4EX ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`- inst:L4EX -| !p + !s`,"http://instagram.com/l4ex")
client.user.setStatus("dnd")
});



client.login(process.env.BOT_TOKEN);

