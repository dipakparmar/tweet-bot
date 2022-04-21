import iconf from 'conf'
import chalk from 'chalk';
import consola from 'consola';
import readline from 'readline';
import { exit } from 'process';

export default function configure() {
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var conf = new iconf();
    consola.info(chalk.green.bold('Configuring TweetBot ...'));

    let config = conf.get('tweetbot-config')

    let configFromEnv = {
        twitter_api_key: process.env.TWITTER_API_KEY,
        twitter_api_secret: process.env.TWITTER_API_SECRET,
        twitter_access_token: process.env.TWITTER_ACCESS_TOKEN,
        twitter_access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        twitter_search_hashtag: process.env.TWITTER_SEARCH_HASHTAG
    };

    if (!config && (!configFromEnv.twitter_api_key && !configFromEnv.twitter_api_secret && !configFromEnv.twitter_access_token && !configFromEnv.twitter_access_token_secret && !configFromEnv.twitter_search_hashtag)) {
        consola.info(chalk.yellow.bold('No configuration found.'));

        if (!configFromEnv.twitter_api_key || !configFromEnv.twitter_api_secret || !configFromEnv.twitter_access_token || !configFromEnv.twitter_access_token_secret || !configFromEnv.twitter_search_hashtag) {
            consola.info(chalk.yellow.bold('No environment variables avialable: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET, TWITTER_SEARCH_HASHTAG'));
            consola.info(chalk.yellow.bold('Creating new configuration file ...'));

            let configFile = {
                twitter_api_key: '',
                twitter_api_secret: '',
                twitter_access_token: '',
                twitter_access_token_secret: '',
                twitter_search_hashtag: ''
            }

            // ask for input from console and save it to config file
            r1.question('Twitter API Key: ', (twitter_api_key) => {
                configFile.twitter_api_key = twitter_api_key;
                r1.question('Twitter API Secret: ', (twitter_api_secret) => {
                    configFile.twitter_api_secret = twitter_api_secret;
                    r1.question('Twitter Access Token: ', (twitter_access_token) => {
                        configFile.twitter_access_token = twitter_access_token;
                        r1.question('Twitter Access Token Secret: ', (twitter_access_token_secret) => {
                            configFile.twitter_access_token_secret = twitter_access_token_secret;
                            r1.question('Twitter Search Hashtag: ', (twitter_search_hashtag) => {
                                configFile.twitter_search_hashtag = twitter_search_hashtag;
                                conf.set('tweetbot-config', configFile);
                                consola.success('New configuration file created.');
                                r1.close();
                            });
                        });

                    });
                });

            });

        } else {
            conf.set('tweetbot-config', {
                consumer_key: process.env.TWITTER_API_KEY,
                consumer_secret: process.env.TWITTER_API_SECRET,
                access_token: process.env.TWITTER_ACCESS_TOKEN,
                access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
                search_hashtag: process.env.TWITTER_SEARCH_HASHTAG
            });
            consola.success(chalk.bgGreen.bold('Used environment variables.'));
        }
    } else {
        consola.info(chalk.bgBlue.bold('Found existing configuration.'));
        exit(0);
    }
}
