const path = require("path");
const { generateESModule, generateCommonJSModule } = require("../lib/util");
const generate = require("../lib/links-generator");

const fixtures = path.resolve(__dirname, "fixtures");

function fixture(f) {
    return path.resolve(fixtures, f);
}

it("app1. no pages", async (done) => {
    const links = await generate(fixture("app1"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});

it("app2", async (done) => {
    const links = await generate(fixture("app2"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});

it("app3", async (done) => {
    const links = await generate(fixture("app3"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});
