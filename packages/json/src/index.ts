import type { ZWaveLogInfo } from "@zwave-js/core";
import Transport from "winston-transport";
import * as NodeStream from "stream";

export interface transportOptions {
	level?: string;
}

export class JSONTransport extends Transport {

	passThroughStream: NodeStream.PassThrough
	public constructor(options: transportOptions) {
		super({
			level: options.level || "silly",
		});
		this.passThroughStream = new NodeStream.PassThrough();
	}
	public log(info: ZWaveLogInfo, next: () => void): any {
		const logObject = JSON.stringify(info);
		this.passThroughStream.write(logObject);
		next();
	}

	// Obtains the JSON transport stream.
	public getStream(): NodeStream.PassThrough{
		return this.passThroughStream;
	}

	// Destroys the JSON stream and releases any resources used.
	public destroy(): void{
		this.passThroughStream.end();
		this.passThroughStream.destroy();
	}
}
