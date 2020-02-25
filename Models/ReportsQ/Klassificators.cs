using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class Klassificators
    {
        public int code { get; set; }
        public string name1 { get; set; }

        public override string ToString()
        {
            return name1;
        }
    }
}
