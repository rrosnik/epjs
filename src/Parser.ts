import IParsable from './Interfaces/IParsable';
import MyRegex from './MyRegex';
import Report from './Report';

export default class Parser implements IParsable {
    private eplustbl: string;
    // private regexForGrouping: RegExp = /(-{10,}.*?)(?=-----+)/gs;
    private regexForGrouping: RegExp = /----+.*?(?=---|$)/gs;

    public reports: Report[] = [];

    constructor(eplustbl: string) {
        this.eplustbl = eplustbl;
        this.parse();
    }

    getTitle: () => void = () => {

    }

    parse = (): void => {
        MyRegex.getArray(this.regexForGrouping, this.eplustbl).forEach(r => {
            this.reports.push(new Report(r));
        });
    }

    toJson = () => {
        return {
            reports: this.reports.map((r: Report) => r.toJson())
        }
    }
}