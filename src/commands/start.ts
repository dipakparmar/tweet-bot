import {Command} from '@oclif/core'
import Conf from 'conf'
import * as Twit from 'twit'

type ConfigKeys = {
  consumerKey: string | any
  consumerSecret: string | any
  accessToken: string | any
  accessTokenSecret: string | any
  searchHashtag: string | any
}

export default class Start extends Command {
  static description = 'Start the <%= config.bin %> server.'

  static examples = ['<%= config.bin %> <%= command.id %>']
  static config = new Conf()

  static configKeys = {
    consumerKey: this.config.get('consumerKey'),
    consumerSecret: this.config.get('consumerSecret'),
    accessToken: this.config.get('accessToken'),
    accessTokenSecret: this.config.get('accessTokenSecret'),
    searchHashtag: this.config.get('searchHashtag'),
  }

  public watchAndReTweet(configKeys: ConfigKeys): void {
    /* eslint-disable camelcase */
    const T = new Twit({
      consumer_key: configKeys.consumerKey,
      consumer_secret: configKeys.consumerSecret,
      access_token: configKeys.accessToken,
      access_token_secret: configKeys.accessTokenSecret,
    })

    /* eslint-enable */
    const trackingPhrase = `#${configKeys.searchHashtag}`
    console.log(`Watching tweets...#${configKeys.searchHashtag}`)
    T.stream('statuses/filter', {track: trackingPhrase}).on(
      'tweet',
      tweet => {
        // check if tweet is a retweet by checking if retweeted_status property is present and tweet.text does not contain RT
        if (tweet?.retweeted === false && !tweet?.text?.includes('RT')) {
          const regexTrackingPhrase = new RegExp(trackingPhrase, 'i')
          if (regexTrackingPhrase.test(tweet.text)) {
            console.info(
              '[VERBOSE] Attempting to retweet ' +
                tweet.id_str +
                ': ' +
                tweet.text + ' by [@' + tweet.user.screen_name + ']',
            )
            T.post('statuses/retweet', {id: tweet.id_str}, err => {
              if (err) {
                console.warn(err)
              } else {
                console.info('Retweeted: ' + tweet.text)
              }
            })
          }
        } else {
          console.warn('\n-----------Start: Tweet already retweeted-----------')
          console.log(
            'Already Retweeted by [@' +
              tweet.retweeted_status.user.screen_name +
              '] - ' +
              tweet.text,
          )
          console.warn('-----------End: Tweet already retweeted-----------\n')
        }
      },
    )
  }

  public async run(): Promise<void> {
    this.watchAndReTweet(Start.configKeys)
  }
}
