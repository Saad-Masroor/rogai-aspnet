using System.ComponentModel.DataAnnotations;

namespace ROAGI.Web.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
