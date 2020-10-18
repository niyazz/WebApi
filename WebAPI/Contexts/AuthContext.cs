using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Entities;

namespace WebAPI.Models
{
    public class AuthContext : IdentityDbContext
    {
        public DbSet<User> Useres { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<TimeRecord> TimeRecords { get; set; }

        public AuthContext(DbContextOptions<AuthContext> options):base(options)
        {

        }   
    }
}
