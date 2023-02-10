import IParsable from './Interfaces/IParsable';
import MyRegex from './MyRegex';

export default class Table implements IParsable {
    private tableText: string;
    private regexForTitle = /^\w.*/gm;
    private regexForFields = /,.*/gs;
    public title: string;
    public fields: string[];
    public rows: string[][];

    constructor(text: string) {
        this.tableText = text;
        this.getTitle();
        this.parse();
    }
    getTitle: () => void = () => {
        const title = MyRegex.getFirstMatch(this.regexForTitle, this.tableText);
        this.title = title;
    }

    parse = (): void => {
        ({ "fields": this.fields, "rows": this.rows } = MyRegex.getTable(this.regexForFields, this.tableText));
    }

    toJson = () => {
        return {
            title: this.title,
            fields: this.fields,
            rows: this.rows.filter((r: string[]) => r.length)
        }
    }
}