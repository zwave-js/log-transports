import type { ZWaveLogInfo } from "@zwave-js/core";
import Transport from "winston-transport";

export class MyTransport extends Transport {

	public log(info: ZWaveLogInfo, next: () => void): any {
		// Do something with the log entry, for example:
		console.dir(info);
		next();
	}
}
