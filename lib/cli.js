const fs = require("fs");
const path = require("path");
const { generateESModule } = require("./util");
const generator = require("./links-generator");

module.exports = async function cli() {
    const args = process.argv.slice(2);
    const dir = args[1] || process.cwd();
    const file = args[0];

    if (!file) {
        console.error("target file should be provided")
        process.exitCode = 1;
        return;
    }

    const links = await generator(dir, file.endsWith(".ts") || file.endsWith(".tsx"));
    fs.writeFileSync(
        path.resolve(dir, file),
        generateESModule(links)
    );
};
