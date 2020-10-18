using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class TodoFilter
    {
        public string ExecuterNickName { get; set; }
        public string Status { get; set; }
        public int Priority { get; set; }
    }
}
