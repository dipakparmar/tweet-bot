import iconf from 'conf'
import chalk from 'chalk';
import consola from 'consola';
import Twit from 'twit';
var conf = new iconf();
let config = conf.get('tweetbot-config')
export default function start() {

    consola.log(chalk.green('Starting TweetBot ...'))
    // checkRequiredENVVariables();

    let config = {
        twitter_api_key: process.env.TWITTER_API_KEY,
        twitter_api_secret: process.env.TWITTER_API_SECRET,
        twitter_access_token: process.env.TWITTER_ACCESS_TOKEN,
        twitter_access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        twitter_search_hashtag: process.env.TWITTER_SEARCH_HASHTAG
    };


    var TwitBot = new Twit({
        consumer_key: config.twitter_api_key,
        consumer_secret: config.twitter_api_secret,
        access_token: config.twitter_access_token,
        access_token_secret: config.twitter_access_token_secret,
    });

    var trackingPhrase = config.twitter_search_hashtag;
    var filterSteam = TwitBot.stream('statuses/filter', { track: trackingPhrase });
    consola.info('Watching tweets containing: ' + trackingPhrase);
    filterSteam.on('tweet', retweet);

}

function retweet(tweet) {
    var trackingPhrase = config.twitter_search_hashtag;
    //check if tweet is a retweet by checking if retweeted_status property is present and tweet.text does not contain RT
    if (tweet.retweeted == false && tweet.text.indexOf('RT') == -1) {
        var regexTrackingPhrase = new RegExp(trackingPhrase, 'i');
        if (regexTrackingPhrase.test(tweet.text)) {
            consola.log('[LOG] Orignal Tweet by [@' + tweet.user.screen_name + ']');
            consola.info('[VERBOSE] Attempting to retweet ' + tweet.id_str + ": " + tweet.text);
            T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

            function retweeted(err, data, response) {
                if (err) {
                    consola.warn(err);
                } else {
                    consola.success('Retweeted: ' + tweet.text);
                }
            }
        }
    } else {
        consola.warn('-----------Tweet already retweeted-----------');
        console.log('Already Retweeted by [@' + tweet.retweeted_status.user.screen_name + '] - ' + tweet.text + '\n');
    }
};

function checkRequiredENVVariables() {
    consola.info('Checking required environment variables ...')
    //Throw error if required environment variables are missing TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET
    if (!process.env.TWITTER_API_KEY || !process.env.TWITTER_API_SECRET || !process.env.TWITTER_ACCESS_TOKEN || !process.env.TWITTER_ACCESS_TOKEN_SECRET || !process.env.TWITTER_SEARCH_HASHTAG) { throw consola.error(new Error('Missing required environment variables')) }
    else {
        consola.success('Found required environment variables.')
    }
}



