const generate = require("./links-generator");
const { generateCommonJSModule, generateESModule } = require("./util");

module.exports = {
    generateLinks: generate,
    generateCommonJSModule,
    generateESModule
};
