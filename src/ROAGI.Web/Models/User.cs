using System.ComponentModel.DataAnnotations;

namespace ROAGI.Web.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }

        public required string username { get; set; }

        public required string password_hash { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

        public bool is_active { get; set; }
    }
}
