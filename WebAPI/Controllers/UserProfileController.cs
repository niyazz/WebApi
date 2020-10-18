using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using WebAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace WebAPI.Controllers
{
    /// <summary>
    /// Контроллер для работы с личным кабинетом пользователя
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<User> _userManager;
        public UserProfileController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Метод получения информации о текущем пользователе
        /// </summary>
        [HttpGet]
        [Authorize]
        public async Task<Object> GetUserProfile()
        {
            string UserId = User.Claims.First(c => c.Type == "UserId").Value;
            User user = await _userManager.FindByIdAsync(UserId);
            return new
            {
                user.FirstName,
                user.Position,
                user.PhoneNumber,
                user.LastName,
                user.Email,
                user.UserName
            };
        }
    }
}