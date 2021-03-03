import type { ZWaveLogInfo } from "@zwave-js/core";
import { padStart } from "alcalzone-shared/strings";
import Transport from "winston-transport";

export class LogfmtTransport extends Transport {
	public constructor() {
		super({
			level: "silly",
		});
	}

	private logOnce(info: ZWaveLogInfo & { message: string; part?: string }) {
		const dir =
			info.direction === "  "
				? ""
				: info.direction === "« "
				? "dir=RX"
				: "dir=TX";
		const tags = info.primaryTags ? `tags="${info.primaryTags}"` : "";
		const tags2 = info.secondaryTags ? `info="${info.secondaryTags}"` : "";
		const part = info.part ? `part=${info.part}` : "";
		const msg = [
			`ts=${info.timestamp}`,
			`lbl=${info.label}`,
			`lvl=${info.level}`,
			dir,
			tags,
			!!info.message ? `msg="${info.message.replace(/"/g, "'")}"` : "",
			tags2,
			part,
		]
			.filter((blob) => !!blob)
			.join(" ");
		console.log(msg);
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
