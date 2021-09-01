import type { ZWaveLogInfo } from "@zwave-js/core";
import { PassThrough } from "stream";
import Transport from "winston-transport";

const formattedMessageSymbol = Symbol.for("message");

export class JSONTransport extends Transport {
	public constructor() {
		super({ level: "silly" });
		this._stream = new PassThrough({
			objectMode: true,
		});
	}

	public log(info: ZWaveLogInfo, next: () => void): any {
		console.warn(
			`formatted message exists: ${formattedMessageSymbol in info}`,
		);
		const logObject = {
			...info,
			formattedMessage: info[formattedMessageSymbol as any],
		};

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
