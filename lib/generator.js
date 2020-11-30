const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const readdirAsync = promisify(fs.readdir);

function camelCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

const createLookUp = root => {
    async function lookup(dir, obj) {
        const files = await readdirAsync(path.resolve(root, dir), {
            withFileTypes: 'utf8',
            withFileTypes: true
        });

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const name = file.name;
            obj[name] = {};

            if (file.isDirectory()) {
                obj[name].paths = {};
                await lookup(`${dir}/${name}`, obj[name].paths);
            }
        }
    }

    return lookup;
};

const createLink = withTypes => (path) => {
    const name = [];
    let template = '`';
    let withParams = false;
    const params = [];

    for (let i = 0; i < path.length; i++) {
        const part = path[i];
        const isParam = part.startsWith('_');

        if (isParam) {
            withParams = true;
            params.push(part);
            template += `/\$\{${part}\}`;
        } else {
            name.push(
                name.length === 0
                    ? part
                    : camelCase(part)
            );
            template += `/${part}`;
        }
    }

    if (withParams) {
        template += '`';
    } else {
        template = `"${template.slice(1)}"`;
    }

    return `function ${
        name.join('') +
        (
            withParams
                ? `By${params.map(p => camelCase(p.slice(1))).join('And')}`
                : 'Page'
        )
    }(${
        withTypes
            ? `${params.join(': any, ')}${params.length > 0 ? ': any' : ''}`
            : params.join(', ')
    }) { return ${template} }`;
};

function generateLink(links, path, obj, createLink) {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const name = key.includes('.') ? key.slice(0, key.indexOf('.')) : key;
        const o = obj[key];

        if ('paths' in o) {
            const path_ = path.slice();
            path_.push(name);
            generateLink(links, path_, o.paths, createLink);
        } else {
            // index.{js|ts|tsx|vue}
            if (key.startsWith('index.')) {
                links.push(createLink(path));
            } else {
                const path_ = path.slice();
                path_.push(name);
                links.push(createLink(path_));
            }
        }
    }
}

module.exports = async function run(dir, withTypes) {
    const paths = {};
    await createLookUp(dir)('pages', paths);
    const links = [];
    const link = createLink(withTypes || true);

    generateLink(links, [], paths, link);

    return links;
};
