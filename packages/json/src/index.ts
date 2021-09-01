import type { ZWaveLogInfo } from "@zwave-js/core";
import { PassThrough } from "stream";
import { LEVEL, MESSAGE } from "triple-beam";
import Transport from "winston-transport";

export class JSONTransport extends Transport {
	public constructor() {
		super({ level: "silly" });
		this._stream = new PassThrough({
			objectMode: true,
		});
	}

	public log(info: ZWaveLogInfo, next: () => void): any {
		const {
			// remove these properties from the result object
			multiline,
			secondaryTagPadding,
			[LEVEL as any]: _,
			// keep the formatted message if it exists
			[MESSAGE as any]: formattedMessage,
			// And keep the rest
			...logObject
		} = info;
		if (!!formattedMessage) {
			logObject.message = formattedMessage;
		}

		this._stream.write(logObject);
		next();
	}

	private _stream: PassThrough;
	public get stream(): PassThrough {
		return this._stream;
	}

	public close(): void {
		this._stream?.end();
	}
}
