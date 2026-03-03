using Microsoft.EntityFrameworkCore;
using ROAGI.Web.Models;

namespace ROAGI.Web.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<GameRun> GameRuns { get; set; }
    }
}