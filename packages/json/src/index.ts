import type { ZWaveLogInfo } from "@zwave-js/core";
import { pick } from "@zwave-js/shared";
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
		const logObject = pick(info, [
			"timestamp",
			"level",
			"label",
			"primaryTags",
			"secondaryTags",
			"message",
			"direction",
		]);
		if (formattedMessageSymbol in info) {
			logObject.message = info[formattedMessageSymbol as any];
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
