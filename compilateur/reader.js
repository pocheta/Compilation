const fs = require("fs");

exports.reader = function () {
    // Récupération des arguments de lancement
    const inputFilePath = process.argv[2];

    let outputFilePath = inputFilePath.split("/")[3];
    outputFilePath =
        "./output/" +
        outputFilePath.substring(0, outputFilePath.length - 4) +
        "c";

    const json = require(inputFilePath);
    const logger = fs.createWriteStream(outputFilePath);

    const body = JSON.parse(JSON.stringify(json)).program.body;

    return [logger, body];
};
