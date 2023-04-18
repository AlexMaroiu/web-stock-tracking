using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly ISecurityService _securityService;

        public AuthController(IConfiguration configuration, IUserService userService, ISecurityService securityService)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _securityService= securityService ?? throw new ArgumentNullException(nameof(securityService));
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserDTO model)
        {
            _securityService.CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = new()
            {
                Id = Guid.NewGuid(),
                UserName = model.UserName,
                Email = model.Email,
                Role = "client",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            if (await _userService.Create(user))
                return Ok(user);
            else
                return BadRequest("Email or username already in use!");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserDTO model)
        {
            var user = await _userService.Get(model.UserName);
            if (user.UserName != model.UserName)
            {
                return BadRequest("User not found!");
            }

            if (!_securityService.VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Password wrong!");
            }

            var token = _securityService.CreateToken(user);
            return Ok(token);
        }
    }
}
