import { ConfigOption } from 'devphase';

const config : ConfigOption = {
    stack: {
        node: {
            binary: 'node_modules/devphase/phala-dev-stack/bin/node',
            port: 9955,
        },
        pruntime: {
            port: 8010
        }
    }
};

export default config;
