import { BOT_COMMAND_DESCRIPTION, BOT_COMMAND_NAME } from '../models/commands.model';
import { BotCommand } from 'typegram';

export function getDefinedBotCommands(): BotCommand[] {
  return Object.values(BOT_COMMAND_NAME).map((command: BOT_COMMAND_NAME) => ({
    command,
    description: BOT_COMMAND_DESCRIPTION[command],
  }));
}

export function isBotCommand(command: string): boolean {
  const commandWithoutSlash: string = command.startsWith('/') ? command.slice(1) : command;
  return Object.values(BOT_COMMAND_NAME).includes(commandWithoutSlash as BOT_COMMAND_NAME);
}
