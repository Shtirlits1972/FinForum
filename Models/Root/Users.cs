using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.Root
{
    public class Users
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string pass { get; set; }
        public string role { get; set; } = "Юзер";
        public string userFio { get; set; } = "";
        public bool isBanned { get; set; } = false;

        public override string ToString()
        {
            return userFio;
        }
    }
}
