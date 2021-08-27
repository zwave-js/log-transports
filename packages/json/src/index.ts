import type { ZWaveLogInfo } from "@zwave-js/core";
import Transport from "winston-transport";

export type callback = (info: object) => void;
export interface transportOptions {
	level?: string;
	logCallback: callback;
};

export class JSONTransport extends Transport {
	logCallback: callback;
	public constructor(options:transportOptions) {
		super({
			level: options.level || "silly",
		});
		this.logCallback = options.logCallback;
	}

	public log(info: ZWaveLogInfo, next: () => void): any {
		const logObject = JSON.parse(JSON.stringify(info));
		this.logCallback(logObject);
		next();
	}
}
