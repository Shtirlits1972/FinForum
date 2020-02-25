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
    public class KlassificatorsCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Klassificators> GetAll()
        {
            List<Klassificators> list = new List<Klassificators>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Klassificators>("select code, name1 from Klassificators ORDER BY code;").ToList();
            }

            return list;
        }
    }
}
