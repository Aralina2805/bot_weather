const TelegramBot = require('node-telegram-bot-api');
const request = require( 'request' );
// replace the value below with the Telegram token you receive from @BotFather
const token = '5498036534:AAHXTbLO7-D9Xc2bkZKxJGqxTf-NVkyhvCk';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
//bot.on("polling_error", (err) => console.log(err));

bot.onText(/\/sum (.+)/, (msg, match) => {
    const sum = match[1].split(' ').reduce((cur, acc)=> cur + +acc, 0)
    console.log(match)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, sum);
});
bot.onText(/\/mult (.*)/, (msg, match) => {
    const mult = match[1].split(' ').reduce((cur, acc)=> cur * acc)
    console.log(match)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, mult);
});

bot.onText(/\/subtract (.+)/, (msg, match) => {
    const subtract = match[1].split(' ').reduce((cur, acc)=> +cur + (-acc))
    console.log(match)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, subtract);
});

bot.onText(/\/divide (.*)/, (msg, match) => {
    const divide = match[1].split(' ').reduce((cur, acc)=> cur * (1/acc))
    console.log(match)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, divide);
});
bot.onText(/\/city (.*)/, (msg, match) => {
    const city = match[1];
    console.log(city);
    const chatId = msg.chat.id;
    const query ='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=1e27bba90d033c1c0d378e8d0f0b720d';
    //const query = 'http://api.openweathermap.org/data/2.5/weather?q='
    //    + city + '1e27bba90d033c1c0d378e8d0f0b720d';
    console.log(query);
    // Key obtained from openweathermap API
   request(query, function (error, response, body) {

        if (!error && response.statusCode ===200)
        {
            bot.sendMessage(chatId,
                '_Looking for details of_ ' + city
                + '...', { parse_mode: "Markdown" })
                .then(msg)
            {
                res = JSON.parse(body)
                var temp = Math.round((parseInt(
                    res.main.temp_min) - 273.15), 2)

                // Kelvin to celsius and then round
                // off and conversion to atm
                var pressure = Math.round(parseInt(
                    res.main.pressure) - 1013.15)

                var rise = new Date(parseInt(
                    res.sys.sunrise) * 1000);

                var set = new Date(parseInt(
                    res.sys.sunset) * 1000);
                // Unix time to IST time conversion

                bot.sendMessage(chatId, '**** '
                    + res.name + ' ****\nTemperature: '
                    + String(temp) + '°C\nHumidity: ' +
                    res.main.humidity + ' %\nWeather: '
                    + res.weather[0].description +
                    '\nPressure: ' + String(pressure)
                    + ' atm\nSunrise: ' +
                    rise.toLocaleTimeString() +
                    ' \nSunset: ' +
                    set.toLocaleTimeString() +
                    '\nCountry: ' + res.sys.country)
            }


        }
    })
})