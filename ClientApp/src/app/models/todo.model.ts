export class TodoItem {
    public id:number;
    public title:string;
    public description:string;
    public authorFullName: string;
    public executerFullName: string;
    public executerNickName: string;
    public created: string; 
    public isDone:boolean; 
    public priority:number;

    constructor(
        _title:string, 
        _description:string,
        _author:string, 
        _exName:string, 
        _exNick:string, 
        _date:string, 
        _priority:number, 
        _isDone:boolean)
        {
            this.title = _title;
            this.description = _description;
            this.authorFullName = _author;
            this.executerFullName = _exName;
            this.executerNickName = _exNick;
            this.created = _date;
            this.priority = _priority;
            this.isDone = _isDone;
        }
}