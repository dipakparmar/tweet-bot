#! /usr/bin/env node
import { program } from 'commander';
import start from './commands/start.js';
import configure from './commands/configure.js'
// require('dotenv').config()

program
    .command('start')
    .description('start the tweetbot server')
    .action(start)

program
    .command('configure')
    .description('configure the tweetbot server')
    .action(configure)

program.parse()
