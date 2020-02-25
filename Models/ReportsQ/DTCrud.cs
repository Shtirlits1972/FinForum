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
    public class DTCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Klassificators> GetAll()
        {
            List<Klassificators> list = new List<Klassificators>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Klassificators>("select id_mes, DT101 from DT;").ToList();
            }

            return list;
        }


        public static int GetIdByDate(DateTime date)
        {
            int id = 0;

            using (IDbConnection db = new SqlConnection(strConn))
            {
                id = db.Query<int>("select top 1 id_mes from DT WHERE DT101 = @date;", date ).FirstOrDefault();
            }

            return id;
        }

    }
}
