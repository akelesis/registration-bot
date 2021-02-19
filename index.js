require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

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
    if(msg.member.roles.cache.find(role => role.name === 'aluno' || role.name === 'professor')) 
      return msg.channel.send('Você não pode mudar de cargo, favor entrar em contato com a administração!').catch(err => console.log(err));
    const futureRole = msg.content.split('--cargo ')[1]
    const role = msg.guild.roles.cache.find(role => role.name === futureRole)
    user.cargo = role.name
    msg.member.roles.add(role)
    msg.channel.send(`nome: ${msg.member.nickname} cargo: ${user.cargo}`).catch(err => console.log(err))
    msg.channel.send('Cadastro realizado com sucesso!').catch(err => console.log(err))
  }
  else if(msg.content === '--status') {
    msg.channel.send(`@${msg.member.nickname}, pode dizer?!`).catch(err => console.log(err))
  }
});