using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class top_deposit_rates
    {
        public  string decade { get; set; }
        public decimal RAte { get; set; }
        public DateTime dataRes { get; set; }

        public override string ToString()
        {
            return $"{decade} {RAte}";
        }
    }
}

