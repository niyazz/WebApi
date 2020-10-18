using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Entities
{
    [Table("TimeRecords")]
    public class TimeRecord
    {       
        [Key]
        public long Id { get; set; }
        public Todo Todo { get; set; }

        [ForeignKey("Todo")]
        public long TodoId { get; set; }
        public int WeekNumber { get; set; }
        public int DayNumber { get; set; }
        public string Date { get; set; }
        public int Time { get; set; }
        public int LunchTime { get; set; }
        public bool IsDeleted { get; set; }
        public User Executer { get; set; }

        [ForeignKey("User")]
        public string ExecuterId { get; set; }

    }
}
