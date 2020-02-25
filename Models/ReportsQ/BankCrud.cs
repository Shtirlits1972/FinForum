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
    public class BankCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<Bank> GetAll()
        {
            List<Bank> list = new List<Bank>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Bank>("Select IntCode, RegNumber, OrgName FROM dbo.List_of_Banks() ORDER BY OrgName;").ToList();
            }

            return list;
        }



    }
}
