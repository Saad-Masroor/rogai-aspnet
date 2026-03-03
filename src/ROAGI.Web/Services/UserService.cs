using Microsoft.EntityFrameworkCore;
using ROAGI.Web.Data;
using ROAGI.Web.Models;
using Microsoft.AspNetCore.Identity;

namespace ROAGI.Web.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        public UserService(ApplicationDbContext context) 
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<(bool Success, string Message)> RegisterUser(string username, string password)
        {
            username = username.Trim().ToLower();

            if (username.Length < 3 || username.Length > 50)
                return (false, "Username must be between 3 and 50 characters");

            if (password.Length < 6 || password.Length > 100)
                return (false, "Password must be between 6 and 100 characters");

            var exists = await _context.Users
                .AnyAsync(u => u.username.ToLower() == username);

            if (exists)
                return (false, "Username already exists");

            var newUser = new User
            {
                username = username,
                created_at = DateTime.UtcNow,
                is_active = true,
                password_hash = ""
            };

            newUser.password_hash = _passwordHasher.HashPassword(newUser, password);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return (true, "User registered successfully");
        }

        public async Task<bool> AuthenticateUser(string username, string password)
        {
            username = username.Trim().ToLower();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.username == username);

            if (user == null || !user.is_active)
                return false;

            var result = _passwordHasher.VerifyHashedPassword(
                user, user.password_hash, password);

            return result != PasswordVerificationResult.Failed;
        }

    }
}
