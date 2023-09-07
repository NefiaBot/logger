const chalk = require('chalk')
const moment = require('moment');


/**
 * @author: Jozo_85
 * @description: This package is using in NefiaBot for logger
 * @version: 1.0.2
 * @lastUpdate: 0.7.09.2023 19:58 
 */


// This is all type yes we using only 5 types of log in CMD 
// How to use and how is working you can see on github or npm 


const types = {
    SYSLOG: chalk.gray('[SYSTEMLOG]'),
    SYSERR: chalk.red('[SYSTEMERROR]'),
    SUCCESS: chalk.green('[SUCCESS]'),
    INFO: chalk.blue('[INFO]'),
    DEBUG: chalk.magenta('[DEBUG]')
};

const longestTypeLength = Math.max(...Object.values(types).map(t => t.length));
const getType = (type) => `${types[type]}${' '.repeat(longestTypeLength - types[type].length)}:`;
const timestamp = () => `${chalk.cyan.bold(`[${moment.utc().format('HH:mm:ss')}]`)}`;

module.exports = {
    syslog: (str) => console.info(`${timestamp()} ${getType('SYSLOG')} ${str}`),
    syserr: (str) => console.error(`${timestamp()} ${getType('SYSERR')} ${str}`),
    success: (str) => console.log(`${timestamp()} ${getType('SUCCESS')} ${str}`),
    info: (str) => console.info(`${timestamp()} ${getType('INFO')} ${str}`),
    debug: (str) => console.log(`${timestamp()} ${getType('DEBUG')} ${str}`),

    timestamp,

    getExecutionTime: (hrtime) => {
        const timeSinceHrMs = (
          process.hrtime(hrtime)[0] * 1000
          + hrtime[1] / 1000000
        ).toFixed(2);
        return `${chalk.yellowBright(
          (timeSinceHrMs / 1000).toFixed(2))
        } seconds (${chalk.yellowBright(timeSinceHrMs)} ms)`;
      },
    
      printErr: (err) => {
        if (!(err instanceof Error)) {
          console.error(err)
          return;
        }
    
        console.error(
          !err.stack
            ? chalk.red(err)
            : err.stack
              .split('\n')
              .map((msg, index) => {
                if (index === 0) {
                  return chalk.red(msg);
                }
    
                const isFailedFunctionCall = index === 1;
                const traceStartIndex = msg.indexOf('(');
                const traceEndIndex = msg.lastIndexOf(')');
                const hasTrace = traceStartIndex !== -1;
                const functionCall = msg.slice(
                  msg.indexOf('at') + 3,
                  hasTrace ? traceStartIndex - 1 : msg.length
                );
                const trace = msg.slice(traceStartIndex, traceEndIndex + 1);
    
                return `    ${chalk.grey('at')} ${
                  isFailedFunctionCall
                    ? `${chalk.redBright(functionCall)} ${chalk.red.underline(trace)}`
                    : `${chalk.greenBright(functionCall)} ${chalk.grey(trace)}`
                }`;
              })
              .join('\n')
        )
      }
}