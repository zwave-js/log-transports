import type { ZWaveLogInfo } from "@zwave-js/core";
import { padStart } from "alcalzone-shared/strings";
import * as logfmt from "logfmt";
import Transport from "winston-transport";

export class LogfmtTransport extends Transport {
	public constructor() {
		super({
			level: "silly",
		});
	}

	private logOnce(info: ZWaveLogInfo & { message: string; part?: string }) {
		const msg: Record<string, string> = {
			ts: info.timestamp!,
			lbl: info.label!,
			lvl: info.level!,
			dir:
				info.direction === "  "
					? ""
					: info.direction === "« "
					? "dir=RX"
					: "dir=TX",
		};
		if (info.primaryTags) {
			msg.tags = info.primaryTags;
		}
		if (info.message) {
			msg.msg = info.message;
		}
		if (info.secondaryTags) {
			msg.info = info.secondaryTags;
		}
		if (info.part) {
			msg.part = info.part;
		}
		logfmt.log(msg);
	}

	public log(info: ZWaveLogInfo, next: () => void): any {
		if (typeof info.message === "string" && info.message.includes("\n")) {
			info.message = info.message.split("\n");
		}

		if (typeof info.message === "string") {
			this.logOnce(info as any);
		} else {
			let part = 0;
			const partLength = 1 + Math.floor(Math.log10(info.message.length));
			for (const msg of info.message) {
				part++;
				this.logOnce({
					...info,
					message: msg,
					part: `${padStart(
						part.toString(),
						partLength,
						"0",
					)}/${padStart(
						info.message.length.toString(),
						partLength,
						"0",
					)}`,
				});
			}
		}
		next();
	}
}
