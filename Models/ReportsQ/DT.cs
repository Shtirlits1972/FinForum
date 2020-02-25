using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class DT
    {
        public int id_mes { get; set; }
        public DateTime DT101 { get; set; }

        public override string ToString()
        {
            return DT101.ToString("dd.MM.yyyy");
        }
    }
}
