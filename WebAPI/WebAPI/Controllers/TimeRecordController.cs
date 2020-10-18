using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using WebAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Контроллер для учета рабочего времени
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TimeRecordController : ControllerBase
    {
        private readonly AuthContext context;
        public TimeRecordController(AuthContext _context)
        {
            context = _context;
        }

        /// <summary>
        /// Метод получения всех записей о работе на выбранной недели
        /// </summary>
        [HttpGet]
        [Route("getAllRecords/{week}")]
        public async Task<ActionResult<IEnumerable<TimeRecordModel>>> GetAllRecords(int week)
        {
            List<TimeRecordModel> recordList = new List<TimeRecordModel>();
            try
            {
                List<TimeRecord> records = await context.Set<TimeRecord>()
                    .Include(x => x.Todo)
                    .Where(x => !x.IsDeleted)
                    .Where(x => x.WeekNumber == week)
                    .ToListAsync();

                foreach (var record in records)
                {
                    recordList.Add(new TimeRecordModel
                    {
                        Id = record.Id,
                        TodoId = record.Todo.Id,
                        TodoTitle = record.Todo.Title,
                        TodoDescription = record.Todo.Description,
                        WeekNumber = record.WeekNumber,
                        DayNumber = record.DayNumber,
                        Date = record.Date,
                        Time = record.Time,
                        LunchTime = record.LunchTime,
                        TodoIsDone = record.Todo.IsDone
                    });
                }
                return recordList;
            }
            catch
            {
                return BadRequest(new { message = "Не удалось получить данные о списании времени" });
            }
        }

        /// <summary>
        /// Метод создания записи о списании времени
        /// </summary>
        [HttpPost]
        [Route("createRecord")]
        public async Task<bool> CreateRecordAsync([FromBody, Required] TimeRecordModel model)
        {
            try
            {
                string UserId = await context.Useres
                                .Where(x => x.UserName == model.ExecuterNickName)
                                .Select(x => x.Id)
                                .FirstOrDefaultAsync();
                TimeRecord newRecord = new TimeRecord
                {
                    ExecuterId = UserId,
                    TodoId = model.TodoId,
                    WeekNumber = model.WeekNumber,
                    DayNumber = model.DayNumber,
                    Date = model.Date,
                    Time = model.Time,
                    LunchTime = model.LunchTime,
                    IsDeleted = false
                };

                Todo todo = await context.Todos
                            .Where(x => x.Id == model.TodoId)
                            .FirstOrDefaultAsync();

                todo.IsDone = model.TodoIsDone;
                await context.TimeRecords.AddAsync(newRecord);         
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Метод удаления записи о списании времени
        /// </summary>
        [HttpGet]
        [Route("deleteRecord/{id}")]
        public async Task<bool> DeleteTodoAsync(long id)
        {
            try
            {
                TimeRecord record = await context.Set<TimeRecord>()
                            .Where(x => x.Id == id)
                            .FirstOrDefaultAsync();
                record.IsDeleted = true;
                context.Update(record);
                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Метод получения количества отработонного времени за день
        /// </summary>
        [HttpGet]
        [Route("sumTime/{weekNumber}/{dayNumber}")]
        public async Task<string> SumRecordsTime(int weekNumber, int dayNumber)
        {
            try
            {
                TimeRecord[] records = await context.Set<TimeRecord>()
                            .Where(x => x.WeekNumber == weekNumber && x.DayNumber == dayNumber && !x.IsDeleted)
                            .ToArrayAsync();
                int SumTime = records.Sum(x => x.Time);
                return SumTime.ToString();
            
            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Метод получения количества отработонного времени за неделю
        /// </summary>
        [HttpGet]
        [Route("sumWeekTime/{weekNumber}")]
        public async Task<string> SumRecordsWeekTime(int weekNumber)
        {
            try
            {
                TimeRecord[] records = await context.Set<TimeRecord>()
                            .Where(x => x.WeekNumber == weekNumber && !x.IsDeleted)
                            .ToArrayAsync();

                double SumTime = records.Sum(x => x.Time);
                return Math.Round((SumTime / 60), 1).ToString();

            }
            catch
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Метод получения даты текущего дня
        /// </summary>
        [HttpGet]
        [Route("dateByDay/{DayNumber}")]
        public async Task<string> GetDateByDay(int DayNumber)
        {
            try
            {
                DateTime Now = DateTime.Now;
                int WeekDayNum = (int)Now.Date.DayOfWeek;
                int Month = Now.Date.Month;
                int Day = Now.Date.Day;

                if (WeekDayNum == 0)
                    WeekDayNum = 7;

                DateTime date = new DateTime(Now.Date.Year, Month, Day - WeekDayNum + DayNumber);          
                return $"{date.ToString("dd/MM/yyyy")}";
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}