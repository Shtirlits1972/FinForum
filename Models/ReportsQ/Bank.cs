using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class Bank
    {
        public int IntCode { get; set; }
        public int RegNumber { get; set; }
        public string OrgName { get; set; }

        public override string ToString()
        {
            return OrgName;
        }
    }
}
