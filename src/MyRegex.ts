import { type } from "os";

export default class MyRegex {
    public static getArray: (regex: RegExp, txt: string) => Array<string> =
        (regex: RegExp, txt: string) => {
            const result: string[] = [];

            let m: RegExpExecArray | null;
            while ((m = regex.exec(txt)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex)
                    regex.lastIndex++;
                result.push(m[0] as string);
            }
            return result;
        }

    public static getFirstMatch: (regex: RegExp, txt: string) => string =
        (regex: RegExp, txt: string) => {
            return regex.exec(txt)[0];
        }

    public static getTable: (regex: RegExp, txt: string) => { fields: string[], rows: string[][] } =
        (regex: RegExp, txt: string) => {
            let fields = regex.exec(txt)[0];
            let rows = fields.split(/\r\n/);
            const result: string[][] = rows.map((t: string) => {
                const r = t.split(',');
                r.shift();
                return r;
            });
            return {
                fields: result[0],
                rows: result.filter((v, index) => index > 0)
            };
        }
}