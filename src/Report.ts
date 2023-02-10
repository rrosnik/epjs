import IParsable from './Interfaces/IParsable';
import MyRegex from './MyRegex';
import Table from './Table';

export default class Report implements IParsable{
    private reportTaxt: string;
    // private regexForTable: RegExp = /^\w.*\n\n(?:,.*(\n|$)){1,}/gm;
    private regexForTable: RegExp = /^\w.*(?:\r\n\r\n|\n\n)(?:,.*(\r\n|\n|$)){1,}/gm;
    private regexForTitle = /(?<=REPORT:,).*/gm;

    public tables: Table[] = [];
    public title: string;

    constructor(text: string) {
        this.reportTaxt = text;
        this.getTitle();
        this.parse();
    }

    getTitle: () => void = () => {
        const title = MyRegex.getFirstMatch(this.regexForTitle, this.reportTaxt);
        this.title = title;
    }

    parse = (): void => {
        MyRegex.getArray(this.regexForTable, `${this.reportTaxt}`).forEach(t => {
            this.tables.push(new Table(t));
        });
    }

    toJson = () => {
        return {
            title: this.title,
            tables: this.tables.map((t:Table) => t.toJson()),
        }
    }

}