tweet-bot
=================

Tweet Bot

[![Tweet Bot](https://img.shields.io/badge/tweet--bot-brightgreen.svg)](https://dipakparmar.github.io/tweet-bot/)
[![Version](https://img.shields.io/npm/v/tweet-bot.svg)](https://npmjs.org/package/tweet-bot)
[![Downloads/week](https://img.shields.io/npm/dw/tweet-bot.svg)](https://npmjs.org/package/tweet-bot)
[![License](https://img.shields.io/npm/l/tweet-bot.svg)](https://github.com/dipakparmar/tweet-bot/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g tweet-bot
$ tweet-bot COMMAND
running command...
$ tweet-bot (--version)
tweet-bot/0.1.0 darwin-x64 node-v16.14.0
$ tweet-bot --help [COMMAND]
USAGE
  $ tweet-bot COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tweet-bot help [COMMAND]`](#tweet-bot-help-command)
* [`tweet-bot setup`](#tweet-bot-setup)
* [`tweet-bot start`](#tweet-bot-start)

## `tweet-bot help [COMMAND]`

Display help for tweet-bot.

```
USAGE
  $ tweet-bot help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for tweet-bot.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `tweet-bot setup`

Configure the tweet-bot server.

```
USAGE
  $ tweet-bot setup [-k <value>] [-s <value>] [-t <value>] [-S <value>] [-h <value>] [-f]

FLAGS
  -S, --accessTokenSecret=<value>  Twitter App Access Token Secret
  -f, --force                      Overwrite existing config file
  -h, --searchHashtag=<value>      Hashtag to search
  -k, --consumerKey=<value>        Twitter App Consumer key
  -s, --consumerSecret=<value>     Twitter App Consumer Secret
  -t, --accessToken=<value>        Twitter App Access Token

DESCRIPTION
  Configure the tweet-bot server.

EXAMPLES
  $ tweet-bot setup
```

_See code: [dist/commands/setup.ts](https://github.com/dipakparmar/tweet-bot/blob/v0.1.0/dist/commands/setup.ts)_

## `tweet-bot start`

Start the tweet-bot server.

```
USAGE
  $ tweet-bot start

DESCRIPTION
  Start the tweet-bot server.

EXAMPLES
  $ tweet-bot start
```

_See code: [dist/commands/start.ts](https://github.com/dipakparmar/tweet-bot/blob/v0.1.0/dist/commands/start.ts)_
<!-- commandsstop -->
