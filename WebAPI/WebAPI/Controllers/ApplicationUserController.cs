using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using Microsoft.Extensions.Options;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Контроллер для регистрации и авторизации пользователей
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<User> _userManager;
        private readonly ApplicationSettings _applicationSettings;
        private AuthContext _context;

        public ApplicationUserController(UserManager<User> userManager, IOptions<ApplicationSettings> appSettings, AuthContext context)
        {
            _userManager = userManager;
            _applicationSettings = appSettings.Value;
            _context = context;
        }

        /// <summary>
        /// Метод регистрации нового пользователя
        /// </summary>
        [HttpPost]
        [Route("Register")]
        public async Task<Object> PostApplicationUser(RegisterUserModel model)
        {
            User registerUser = new User()
            {             
                FirstName = model.FirstName,
                UserName = model.UserName,
                LastName = model.LastName,
                Email = model.Email,
            };

            try
            {
                IdentityResult result = await _userManager.CreateAsync(registerUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(new { message = "Произошла ошибка при регистрации" });
            }
        }

        /// <summary>
        /// Метод для авторизации пользователя
        /// </summary>
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(LoginUserModel model)
        {
            User user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user,model.Password))
            {
                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                        new Claim[] { 
                            new Claim("UserId", user.Id.ToString())
                        }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)

                };
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
                string token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Имя пользователя или пароль введены неверно" });
            }
            
        }

        /// <summary>
        /// Метод получения списка всех сотрудников
        /// </summary>
        [HttpGet]
        [Route("getAllWorkers")]
        public async  Task<ActionResult<IEnumerable<WorkerUser>>> GetAllWorkers()
        {
            List<WorkerUser> workers = new List<WorkerUser>();
            foreach (var user in (await _context.Useres.ToListAsync()))
            {
                workers.Add(new WorkerUser { WorkerFullName = $"{user.LastName} {user.FirstName[0]}.", WorkerNickname = user.UserName });
            }
            return workers;
        }
    }
}