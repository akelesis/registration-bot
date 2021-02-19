require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const capitalize = (arg) => {
  return arg[0].toUpperCase() + arg.slice(1).toLowerCase()
}


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

const user = {}

bot.on('message', msg => {
  if (msg.content === '--register') {
    msg.channel.send('Digite --nome seguido do seu nome');
  }
  else if (msg.content.startsWith('--nome')) {
    if (!msg.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Não tenho permissão para mudar o seu apelido!').catch(err => console.log(err));

    user.name = msg.content.split('--nome')[1]
    msg.member.setNickname(user.name)
    msg.channel.send(`Ok ${user.name}, Agora digite --cargo seguido do seu cargo (estudante ou professor)`).catch(err => console.log(err))
  }
  else if (msg.content.startsWith('--cargo')) {
    if(msg.content.split("--cargo ")[1] === 'tester'){
      user.cargo = 'tester'
      msg.member.addRole('812155404217090129').catch(err => console.log(err, user.cargo))
    }
    msg.channel.send(`nome: ${user.name} cargo: ${user.cargo}`).catch(err => console.log(err))
    msg.channel.send('Cadastro realizado com sucesso!').catch(err => console.log(err))
  }
  else if(msg.content === '--status') {
    msg.channel.send(`@${msg.author.username}, pode dizer?!`).catch(err => console.log(err))
  }
});