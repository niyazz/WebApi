using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Abp.Application.Services.Dto;
using System;
using System.Linq.Expressions;
using Abp.Linq.Extensions;
using Abp.Collections.Extensions;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Контроллер для работы с задачами
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AuthContext context;
        public TodoController(AuthContext _context)
        {
            context = _context;
        }

        /// <summary>
        /// Метод для создания задачи
        /// </summary>
        [HttpPost]
        [Route("createTodo")]
        public async Task<bool> CreateTodoAsync([FromBody, Required] TodoModel model)
        {
            try
            {
                string UserId = await context.Useres.Where(x => x.UserName == model.ExecuterNickName).Select(x => x.Id).FirstOrDefaultAsync();
                await context.Todos.AddAsync(new Entities.Todo {
                    Title = model.Title,
                    Description = model.Description,
                    AuthorFullName = model.AuthorFullName,
                    ExecuterId = UserId,
                    Created = model.Created,
                    IsDone = false,
                    IsDeleted = false,
                    Priority = model.Priority
                });
                await context.SaveChangesAsync();
                return true;
            }
            catch 
            {
                return false;
            }
        }

        /// <summary>
        /// Метод для удаления задачи
        /// </summary>
        [HttpGet]
        [Route("deleteTodo/{id}")]
        public async Task<bool> DeleteTodoAsync(long id)
        {
            try
            {
                Todo todo = await context.Set<Todo>()
                            .Where(x => x.Id == id)
                            .FirstOrDefaultAsync();
                todo.IsDeleted = true;
                context.Update(todo);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Метод для получения списка задач
        /// </summary>
        [HttpPost]
        [Route("getAllTodo")]
        public async Task<ActionResult<IEnumerable<TodoModel>>> GetAllTodo([FromBody] TodoFilter filter)
        {
            List<TodoModel> todoList = new List<TodoModel>();
            try
            {
                List<Todo> todos = await context.Set<Todo>()
                    .Include(x => x.Executer)
                    .WhereIf(filter != null && !string.IsNullOrEmpty(filter.ExecuterNickName), x => x.Executer.UserName == filter.ExecuterNickName)
                    .WhereIf(filter != null && filter.Status == "Выполнена", x => x.IsDone == true)
                    .WhereIf(filter != null && filter.Status == "В работе", x => x.IsDone == false)
                    .WhereIf(filter != null && filter.Priority != -1, x => x.Priority == filter.Priority)
                    .Where(x => !x.IsDeleted)
                    .ToListAsync();

                foreach (var todo in todos)
                {
                    todoList.Add(new TodoModel
                    {
                        Id = todo.Id,
                        Title = todo.Title,
                        Description = todo.Description,
                        AuthorFullName = todo.AuthorFullName,
                        ExecuterFullName = $"{todo.Executer.LastName} {todo.Executer.FirstName[0]}.",
                        ExecuterNickName = todo.Executer.UserName,
                        Created = todo.Created,
                        Priority = todo.Priority,
                        IsDone = todo.IsDone
                        
                    }) ;
                }
                return todoList;
            }
            catch
            {
                return BadRequest(new { message = "Не удалось получить список задач" });
            }
        }
    }
}