using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class TodoModel
    { 
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AuthorFullName { get; set; }
        public string ExecuterFullName { get; set; }
        public string ExecuterNickName { get; set; }
        public string Created { get; set; }
        public bool IsDone { get; set; }
        public int Priority { get; set; }
    }
}
