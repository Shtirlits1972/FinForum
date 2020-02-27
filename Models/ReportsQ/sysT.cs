using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class sysT
    {
        public int id { get; set; }
        public string Web_Friendly { get; set; }

        public override string ToString()
        {
            return Web_Friendly;
        }
    }
}
