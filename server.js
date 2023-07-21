#!/usr/bin/env node
var prerender = require('./lib');

//var server = prerender();
var server = prerender({
    chromeFlags: [
        // '--no-sandbox',
        '--headless',
        '--disable-gpu',
        // '--disable-software-rasterizer',
        // '--disable-dev-shm-usage',
        '--remote-debugging-port=9223',
        '--hide-scrollbars'
    ]
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
