using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Entities
{
    [Table("Todos")]
    public class Todo { 
        [Key]
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AuthorFullName { get; set; }
        public User Executer { get; set; }

        [ForeignKey("User")]
        public string ExecuterId { get; set; }
        public string Created { get; set; }
        public bool IsDone { get; set; }
        public bool IsDeleted { get; set; }
        public int Priority { get; set;  }

   
    }
}
