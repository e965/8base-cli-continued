import yargs from 'yargs';
import _ from 'lodash';

import { Context } from '../../../common/context';
import { translations } from '../../../common/translations';
import { DeployModeType } from '../../../interfaces/Extensions';
import { executeDeploy } from '../../../common/execute';

type DeployParams = { plugins?: string[]; mode: DeployModeType; force?: boolean };

export default {
  command: 'deploy',
  handler: async (params: DeployParams, context: Context) => {
    context.initializeProject();

    const { needToChangeVersion, confirmChangeVersion, nodeVersion } = await context.confirmFunctionsVersionChange(
      params.force,
    );

    if (needToChangeVersion && !confirmChangeVersion) {
      throw new Error(context.i18n.t('deploy_cancelled'));
    }

    let deployOptions = { mode: params.mode, nodeVersion };

    if (Array.isArray(params.plugins) && params.plugins.length > 0) {
      deployOptions = _.set(deployOptions, 'pluginNames', params.plugins);
    }

    await executeDeploy(context, deployOptions);
  },

  describe: translations.i18n.t('deploy_describe'),

  builder: (args: yargs.Argv): yargs.Argv =>
    args
      .usage(translations.i18n.t('deploy_usage'))
      .option('plugins', {
        alias: 'p',
        describe: translations.i18n.t('deploy_plugins_describe'),
        type: 'array',
      })
      .option('mode', {
        alias: 'm',
        describe: translations.i18n.t('deploy_mode_describe'),
        default: DeployModeType.project,
        type: 'string',
        choices: Object.values(DeployModeType),
        requiresArg: true,
      })
      .option('force', {
        alias: 'f',
        describe: translations.i18n.t('deploy_force_describe'),
        type: 'boolean',
        requiresArg: false,
      }),
};
