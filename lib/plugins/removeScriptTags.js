module.exports = {
	pageLoaded: (req, res, next) => {
		let isRequestedFromBot;
		let userAgent = req.headers["user-agent"];
		if(crawlerUserAgents.some(function(crawlerUserAgent){ return userAgent.toLowerCase().indexOf(crawlerUserAgent.toLowerCase()) !== -1;})) isRequestedFromBot = true;
		//console.log(userAgent, isRequestedFromBot, "inside remove script - headers")
		if (!req.prerender.content || req.prerender.renderType != 'html') {
			return next();
		}

		if(isRequestedFromBot){
			var matches = req.prerender.content.toString().match(/<script(?:.*?)>(?:[\S\s]*?)<\/script>/gi);
			for (let i = 0; matches && i < matches.length; i++) {
				if (matches[i].indexOf('application/ld+json') === -1) {
					req.prerender.content = req.prerender.content.toString().replace(matches[i], '');
				}
			}

			//<link rel="import" src=""> tags can contain script tags. Since they are already rendered, let's remove them
			matches = req.prerender.content.toString().match(/<link[^>]+?rel="import"[^>]*?>/i);
			for (let i = 0; matches && i < matches.length; i++) {
				req.prerender.content = req.prerender.content.toString().replace(matches[i], '');
			}
		}

		next();
	}
};

const crawlerUserAgents = [
	'googlebot',
	'Google-InspectionTool',
	'Yahoo! Slurp',
	'bingbot',
	'yandex',
	'baiduspider',
	'facebookexternalhit',
	'twitterbot',
	'rogerbot',
	'linkedinbot',
	'embedly',
	'quora link preview',
	'showyoubot',
	'outbrain',
	'pinterest/0.',
	'developers.google.com/+/web/snippet',
	'slackbot',
	'vkShare',
	'W3C_Validator',
	'redditbot',
	'Applebot',
	'WhatsApp',
	'flipboard',
	'tumblr',
	'bitlybot',
	'SkypeUriPreview',
	'nuzzel',
	'Discordbot',
	'Google Page Speed',
	'Qwantify',
	'pinterestbot',
	'Bitrix link preview',
	'XING-contenttabreceiver',
	'Chrome-Lighthouse',
	'TelegramBot',
	'SeznamBot',
	'screaming frog SEO spider',
	'AhrefsBot',
	'AhrefsSiteAudit',
	'Iframely'
];
