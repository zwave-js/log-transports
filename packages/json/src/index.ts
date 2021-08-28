import type { ZWaveLogInfo } from "@zwave-js/core";
import * as NodeStream from "stream";
import Transport from "winston-transport";

const formattedMessageSymbol = Symbol.for("message");

export class JSONTransport extends Transport {
	_passThroughStream: NodeStream.PassThrough;

	public constructor() {
		super({
			level: "silly",
		});
		this._passThroughStream = new NodeStream.PassThrough();
	}
	public log(info: ZWaveLogInfo, next: () => void): any {
		const logObject = JSON.stringify({
			...info,
			formattedMessage: info[formattedMessageSymbol as any],
		});

		this._passThroughStream.write(logObject);
		next();
	}

	// Obtains the JSON transport stream.
	public getStream(): NodeStream.PassThrough {
		return this._passThroughStream;
	}

	// Closes the stream associated with this instance.
	public close(cb?: () => void): void {
		if (!this._passThroughStream) {
			return;
		}
		this._passThroughStream.end();
		if (cb) {
			cb();
		}
	}
}
