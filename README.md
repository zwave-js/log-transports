# Z-Wave JS: Log transports

[`node-zwave-js`](https://github.com/zwave-js/node-zwave-js) offers its users the ability to replace the default [winston log transports](https://github.com/winstonjs/winston) with custom implementations. This repository is the home for userland log transports.

## Available transports:

-   [logfmt](packages/logfmt/README.md)

## Implementing new transports

1. Copy the contents of `package-template` into a new folder under `packages`. That folder should have the same name as the transport, e.g. `mysupercoolservice`.
2. Edit `package.json` of your new transport:
   ```diff
   -   "name": "@zwave-js/log-transport-template",
   +   "name": "@zwave-js/log-transport-mysupercoolservice",
   -   "private": true,
       "version": "1.0.0-alpha.0",
   -   "description": "Template log transport for Z-Wave JS",
   +   "description": "My super cool log transport for Z-Wave JS",
   ```
3. Register the new transport in `jest.config.js`:
   ```diff
      moduleNameMapper: {
        "^@zwave-js/log-transport-logfmt(.*)": "<rootDir>/packages/logfmt/src$1",
   +    "^@zwave-js/log-transport-mysupercoolservice(.*)": "<rootDir>/packages/mysupercoolservice/src$1",
      },
   ```
4. (optional) Add dependencies for your new transport module **locally**:
   ```bash
   lerna add your-dependency --scope=@zwave-js/log-transport-mysupercoolservice
   ```
5. (optional) Add type declarations for your new transport module **in the root**:
   ```bash
   yarn add --dev -W @types/your-dependency
   ```

## Quick Links

-   [License](LICENSE)
-   [Changelog](CHANGELOG.md)
