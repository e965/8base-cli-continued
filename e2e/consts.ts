// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

export const CLI_BIN = require.resolve(`${process.cwd()}/${pkg.bin['8base']}`);
