import path from 'node:path';

const { CUSTOM_EXECUTION_DIR = '' } = process.env;

export class PredefineData {
  projectDir = path.join(__dirname, '../');
  executionDir = path.join(process.cwd(), CUSTOM_EXECUTION_DIR);
  projectTemplatePath = path.join(this.projectDir, '../templates/project');
  functionTemplatesPath = path.join(this.projectDir, '../templates/functions');
  pluginTemplatePath = path.join(this.projectDir, '../templates/plugin');
  mockTemplatePath = path.join(this.projectDir, '../templates/mock');
  commandsPath = path.join(this.projectDir, './engine/commands');
  authDomain = 'auth.8base.com';
  authClientId = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
  webClientAddress = 'https://app.8base.com';
  apiAddress = 'https://api.8base.com';
}
