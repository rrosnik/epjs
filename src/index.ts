import Parser from './Parser';
import MyRegex from './MyRegex';
import Report from './Report';
import Table from './Table';
class EP{
    public logg: () => void = () => {
        console.log("this is from package");
    }
};

export default {
    EP,
    Parser,
    MyRegex,
    Report,
    Table
}


