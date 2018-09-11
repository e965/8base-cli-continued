#!/usr/bin/env node

import * as yargs from "yargs";
import { CommandController } from "./engine/controllers/commandController";

yargs.usage("Usage: 8base <command> [OPTIONS]");

CommandController.enumerate()
  .map(cmd => {
    yargs.command({
      command: cmd.name,
      builder: cmd.builder,
      describe: cmd.describe,
      handler: CommandController.wrapHandler(cmd.handler)
    })
    .option('d', {
      hidden: true
    });
  }
);

yargs
  .alias('h', 'help')
  .option('h', {
    global: false
  })
  .alias('v', 'version')
  .option('v', {
    global: false
  })
  .option('d', {
    alias: "debug",
    describe: "turn on debug logs",
    type: "boolean",
    // global: false
  })
  .recommendCommands()
  .strict()
  .fail((msg, err) => {
    // certain yargs validations throw strings :P
    const actual = err || new Error(msg);

    // ValidationErrors are already logged, as are package errors
    if (actual.name !== "ValidationError") {

      if (/Did you mean/.test(actual.message)) {
        console.error("Unknown command");
      }

      console.error(actual.message);
    }

    // exit non-zero so the CLI can be usefully chained
    // cli.exit(actual.code || 1, actual);
  })
  .argv;
