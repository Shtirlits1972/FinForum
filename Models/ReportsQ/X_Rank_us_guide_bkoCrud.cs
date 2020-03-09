using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using FinForum.Models.Root;
using System.Collections;
using System;

namespace FinForum.Models.ReportsQ
{
    public class X_Rank_us_guide_bkoCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<X_Rank_us_guide_bko> GetAll()
        {
            List<X_Rank_us_guide_bko> list = new List<X_Rank_us_guide_bko>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<X_Rank_us_guide_bko>("SELECT [cod],[NamePok] FROM [X_Rank_us_guide_bko] where id_bko=0 order by [NamePok];").ToList();
            }

            return list;
        }
    }
}
