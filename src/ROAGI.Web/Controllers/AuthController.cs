using Microsoft.AspNetCore.Mvc;
using ROAGI.Web.DTOs;

namespace ROAGI.Web.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly Services.UserService _userService;
        
        public AuthController(Services.UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto data)
        {
            if (data == null)
                return BadRequest(new { message = "Invalid input" });

            var result = await _userService.RegisterUser(data.Username, data.Password);

            if (result.Success)
                return Ok(new { message = result.Message });

            return BadRequest(new { message = result.Message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto data)
        {
            if (data == null || !ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid Input Format" });
            }

            var username = data.Username.Trim();
            var password = data.Password.Trim();

            var token = await _userService.AuthenticateUser(data.Username, data.Password);
            if (token == true)
            {
                return Ok(new { token });
            }
            return Unauthorized(new { message = "Invalid username or password" });
        }
    }
}
