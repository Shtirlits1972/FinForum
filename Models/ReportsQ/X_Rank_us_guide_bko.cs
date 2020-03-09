using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class X_Rank_us_guide_bko
    {
        //  [cod],[NamePok]    
        public int cod { get; set; }
        public string NamePok { get; set; }

        public override string ToString()
        {
            return NamePok;
        }
    }
}
