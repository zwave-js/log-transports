module.exports = {
	testEnvironment: "node",
	roots: [
		"<rootDir>/packages/logfmt/src",
	],
	testRegex: "(\\.|/)test\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^@zwave-js/log-transport-logfmt(.*)": "<rootDir>/packages/logfmt/src$1",
		"^@zwave-js/log-transport-json(.*)": "<rootDir>/packages/json/src$1",
	},
	// setupFilesAfterEnv: ["jest-extended"],
	setupFiles: ["./test/jest.setup.js"],
	collectCoverage: false,
	collectCoverageFrom: [
		"packages/**/src/**/*.ts",
		"!packages/**/src/**/*.test.ts",
	],
	coverageReporters: ["lcov", "html", "text-summary"],
	transform: {
		"^.+\\.tsx?$": "esbuild-jest",
	},
};
