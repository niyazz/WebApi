using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Контроллер для получения статистики пользователей
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController : ControllerBase
    {
        private readonly AuthContext context;
        public StatisticController(AuthContext _context)
        {
            context = _context;
        }

        /// <summary>
        /// Метод получения количества выполненных заданий пользователем за весь период
        /// </summary>
        [HttpGet]
        [Route("getTodoDoneAmount/{UserName}")]
        public async Task<string> GetTodoDoneAmount(string UserName)
        {
            try
            {
                string UserId = await context.Useres
                                .Where(x => x.UserName == UserName)
                                .Select(x => x.Id)
                                .FirstOrDefaultAsync();
                int Amount =  context.Todos.
                                Where(x => x.ExecuterId == UserId && x.IsDone)
                                .Count();

                return Amount.ToString();
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Метод получения количества часов пользователя, затраченных на решение задач
        /// </summary>
        [HttpGet]
        [Route("getAllTodoTime/{UserName}")]
        public async Task<string> GetAllTodoTime(string UserName)
        {
            try
            {
                string UserId = await context.Useres
                                .Where(x => x.UserName == UserName)
                                .Select(x => x.Id)
                                .FirstOrDefaultAsync();

                TimeRecord[] Records = await context.TimeRecords
                                       .Where(x => x.ExecuterId == UserId && !x.IsDeleted)
                                       .ToArrayAsync();

                double Hours = Math.Round((double)Records
                               .Sum(x => x.Time)/ 60, 2);
                return Hours.ToString();
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Метод получения количества часов пользователя, затраченных на перерыв
        /// </summary>
        [HttpGet]
        [Route("getAllLunchTime/{UserName}")]
        public async Task<string> GetAllLunchTime(string UserName)
        {
            try
            {
                string UserId = await context.Useres
                                .Where(x => x.UserName == UserName)
                                .Select(x => x.Id)
                                .FirstOrDefaultAsync();
                TimeRecord[] Records = await context.TimeRecords
                                .Where(x => x.ExecuterId == UserId && !x.IsDeleted)
                                .ToArrayAsync();

                double Hours = Math.Round((double)Records
                              .Sum(x => x.LunchTime) / 60, 2);
                return Hours.ToString();
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Метод получения показателя продуктивности пользователя
        /// </summary>
        [HttpGet]
        [Route("getPercents/{UserName}")]
        public async Task<string> GetPercents(string UserName)
        {
            try
            {
                double Todos = Convert.ToDouble(await GetAllTodoTime(UserName));
                double Time = Convert.ToDouble(await GetTodoDoneAmount(UserName));
                double Result = Math.Round((Time / Todos), 2);

                return (Result * 100).ToString();
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}