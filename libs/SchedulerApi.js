// Copyright 2023 JobiansTechie. All right reserved
// Last updated 21/4/2023
// Use this code to connect Bots.Business BJS with MetaApis
// Doc: https://api.jobians.top/runafter.php


let libPrefix = "SchedulerApi";
let API_URL = "https://api.jobians.top/runafter.php";

function sendNoLibMessage(libName) {
    Bot.sendMessage("Please install " + libName +
        " from the Store. It is required by SchedulerApi Lib");
}

function create(options) {
    if (!Libs.Webhooks) {
        return sendNoLibMessage("Webhook Lib");
    }
    if (!options) {
        throw "SchedulerApi Lib: need options"
    }
    if (!options.minutes) {
        throw "SchedulerApi Lib: need options.minutes"
    }
    if (!options.command) {
        throw "SchedulerApi Lib: need options.command"
    }
    var bot_token = bot.token
    var headers = {
        "Content-type": "application/json"
    }
    var webhook = Libs.Webhooks.getUrlFor({
        command: options.command,
        user_id: user.id
    })
    var data = {
        bot_token: bot_token,
        webhook: webhook,
        minutes: options.minutes,
        parameters: options.parameters,
        label: options.label
    }
    HTTP.post({
        url: API_URL,
        success: libPrefix + 'ongetResult',
        body: data,
        headers: headers
    })
}

function ongetResult() {
    let info = JSON.parse(content)
    let status = info.status;
    if (status == "error") {
        throw "SchedulerApi Lib: " + info.message;
    } else {
        return info;
    }
}

on(libPrefix + 'ongetResult', ongetResult);
publish({
    create: create
})
