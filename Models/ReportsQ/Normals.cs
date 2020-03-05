using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinForum.Models.ReportsQ
{
    public class Normals
    {
        public string Coeff { get; set; }
        public string NameofN { get; set; }

        public override string ToString()
        {
            return NameofN;
        }

    }
}
