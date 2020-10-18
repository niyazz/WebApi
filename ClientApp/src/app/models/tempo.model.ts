export class TimeRecord {
    public id:number;
    public todoId:number;
    public todoTitle:string;
    public todoDescription:string; 
    public todoIsDone:boolean; 
    public weekNumber:number;
    public dayNumber:number;
    public date:string;
    public time:number; 
    public lunchTime:number;
    public executerNickName: string;

    constructor(
        _todoId:number, 
        _todoIsDone:boolean,
        _weekNumber:number, 
        _dayNumber:number, 
        _date:string, 
        _time:number, 
        _lunchTime:number,
        _execNick: string)
        {
           this.todoId = _todoId;
           this.todoIsDone = _todoIsDone;
           this.weekNumber = _weekNumber;
           this.dayNumber = _dayNumber;
           this.date = _date;
           this.time = _time;
           this.lunchTime = _lunchTime;
           this.executerNickName = _execNick;
        }
}