using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class TimeRecordModel
    {
        public long Id { get; set; }
        public long TodoId { get; set; }
        public string TodoTitle { get; set; }
        public string TodoDescription { get; set; }
        public int WeekNumber { get; set; }
        public int DayNumber { get; set; }
        public string Date { get; set; }
        public int Time { get; set; }
        public int LunchTime { get; set; }
        public bool TodoIsDone { get; set; }
        public string ExecuterNickName { get; set; }
    }
}
