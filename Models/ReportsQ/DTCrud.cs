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
        public static List<DT> GetAll()
        {
            List<DT> list = new List<DT>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<DT>("select id_mes, FORMAT( DT101, 'dd.MM.yyyy', 'ru-RU' ) as DT101 from DT ORDER BY id_mes DESC;").ToList();
            }

            return list;
        }

        public static DateTime GetDateFromIdMes(int id_mes)
        {
            DateTime date = new DateTime();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                try
                {
                    date = db.Query<DateTime>($"select DT101 from DT WHERE id_mes = {id_mes}; ").FirstOrDefault();
                }
                catch(Exception ex)
                {
                    string Error = ex.Message;
                }
            }

            return date;
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
