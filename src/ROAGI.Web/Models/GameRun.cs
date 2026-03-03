using ROAGI.Web.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class GameRun
{
    [Key]
    public int run_id { get; set; }

    public int user_id { get; set; } 

    [ForeignKey("user_id")]
    public User? User { get; set; } 

    public int health { get; set; }
    public int gold { get; set; }
    public int current_floor { get; set; }
    public bool is_alive { get; set; }
    public DateTime started_at { get; set; }
}