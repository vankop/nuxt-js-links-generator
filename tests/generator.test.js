const path = require("path");
const { generateESModule, generateCommonJSModule } = require("../lib/util");
const generator = require("../lib/generator");

const fixtures = path.resolve(__dirname, "fixtures");

function fixture(f) {
    return path.resolve(fixtures, f);
}

it("app1. no pages", async (done) => {
    const links = await generator(fixture("app1"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});

it("app2", async (done) => {
    const links = await generator(fixture("app2"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});

it("app3", async (done) => {
    const links = await generator(fixture("app3"), false);
    expect(links).toMatchSnapshot();
    expect(generateESModule(links)).toMatchSnapshot();
    expect(generateCommonJSModule(links)).toMatchSnapshot();
    done();
});
