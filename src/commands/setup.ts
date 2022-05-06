import {Command, CliUx, Flags} from '@oclif/core'
import Conf from 'conf'

type Flags = {
  consumerKey: string | any
  consumerSecret: string | any
  accessToken: string | any
  accessTokenSecret: string | any
  searchHashtag: string | any
  force: boolean | any
}

export default class Setup extends Command {
  static description = 'Configure the <%= config.bin %> server.'
  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    consumerKey: Flags.string({
      char: 'k',
      env: 'consumerKey',
      description: 'Twitter App Consumer key',
    }),
    consumerSecret: Flags.string({
      char: 's',
      env: 'consumerSecret',
      description: 'Twitter App Consumer Secret',
    }),
    accessToken: Flags.string({
      char: 't',
      env: 'accessToken',
      description: 'Twitter App Access Token',
    }),
    accessTokenSecret: Flags.string({
      char: 'S',
      env: 'accessTokenSecret',
      description: 'Twitter App Access Token Secret',
    }),
    searchHashtag: Flags.string({
      char: 'h',
      env: 'searchHashtag',
      description: 'Hashtag to search',
    }),
    // flag with no value (-f, --force)
    force: Flags.boolean({
      char: 'f',
      env: 'force',
      description: 'Overwrite existing config file',
    }),
  }

  public async setupConfig(flags: Flags, config: Conf): Promise<void> {
    let consumerKey
    let consumerSecret
    let accessToken
    let accessTokenSecret
    let searchHashtag
    // check if the flags have been set
    if (
      flags.consumerKey &&
      flags.consumerSecret &&
      flags.accessToken &&
      flags.accessTokenSecret &&
      flags.searchHashtag
    ) {
      // if flags have been set then set the config
      this.log('Flags found!')
      consumerKey = flags.consumerKey
      consumerSecret = flags.consumerSecret
      accessToken = flags.accessToken
      accessTokenSecret = flags.accessTokenSecret
      searchHashtag = flags.searchHashtag
    } else {
      // if flags have not been set then ask value for all the reqired flags
      consumerKey = await CliUx.ux.prompt('Enter your Twitter Consumer key')
      consumerSecret = await CliUx.ux.prompt(
        'Enter your Twitter Consumer Secret',
      )
      accessToken = await CliUx.ux.prompt('Enter your Twitter Access Token')
      accessTokenSecret = await CliUx.ux.prompt(
        'Enter your Twitter Access Token Secret',
      )
      searchHashtag = await CliUx.ux.prompt('Enter your Twitter Search Hashtag')

      config.clear()
      config.set('consumerKey', consumerKey)
      config.set('consumerSecret', consumerSecret)
      config.set('accessToken', accessToken)
      config.set('accessTokenSecret', accessTokenSecret)
      config.set('searchHashtag', searchHashtag)
    }
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(Setup)
    const config = new Conf()
    // <-- start : check existing config file -->
    CliUx.ux.action.start('Checking for existing config file')
    if (
      config.has('consumerKey') &&
      config.has('consumerSecret') &&
      config.has('accessToken') &&
      config.has('accessTokenSecret') &&
      config.has('searchHashtag') && !flags.force
    ) {
      CliUx.ux.action.stop('Configuration found!')
      // <-- end: check exiting config file (if found)-->
      this.log(
        'If you want to overwrite the existing config file, use the --force flag.',
      )
    } else if (flags.force) {
      // <-- start: force overwrite -->
      CliUx.ux.action.start('Overwriting the existing config file', 'overwriting')
      // config.clear()
      await this.setupConfig(flags, config)
      CliUx.ux.action.stop(`Configuration overwritten at ${config.path}`)
      // <-- end: force overwrite -->
    } else {
      CliUx.ux.action.stop('No existing config file found')
      // <-- end: check exiting config file (if not found)-->
      this.setupConfig(flags, config)
    }
  }
}
