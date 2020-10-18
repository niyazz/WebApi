using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class User : IdentityUser
    {
        
        public DateTime Created { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Division { get; set; }
        public string Position { get; set; }
        public bool IsDeleted { get; set; }
        public int AllTime { get; set; }
    }
}
