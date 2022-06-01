const endOfLine = require("os").EOL;

const reader = require("./reader");

const basicStatement = require("./statement/basicStatement");

global.registerCounter = 0;
global.globalsCounter = 0;
global.ifCounter = 1;
global.whileCounter = 1;
global.forCounter = 1;
global.breakCounter = 1;
global.globalVar = new Map();
global.localVar = new Map();
global.localsCounter = -1;
global.scopeVar = new Map(); //params de la function
global.scopesCounter = 3;

function main() {
  /**
   * Reading file
   * Setting logger and body
   */
  const [logger, body] = reader.reader();

  let content = "";

  initFile(logger);

  for (let index = 0; index < body.length; index++) {
    const contentBody = body[index];

    content = basicStatement.processing(contentBody);
    logger.write(content);
    logger.write(endOfLine);
    tabulation = "";
  }

  closeFile(logger);
}

function initFile(logger) {
  logger.write(
    '#include "base.h"' +
      "\n\n" +
      "int main() {" +
      "\n" +
      "init(8192, 0, 8192);" +
      "\n\n"
  );
}

function closeFile(logger) {
  logger.write("\n" + "return 0;" + "\n}");
}

main();
