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
    public class sysTCrud
    {
        private static readonly string strConn = Ut.GetConnetString();

        public static List<sysT> GetAll()
        {
            List<sysT> list = new List<sysT>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<sysT>("select id, Web_Friendly from sysT WHERE Web_visible = 1;").ToList();
            }
            return list;
        }
    }
}
