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
    public class NormalsCrud
    {
        private static readonly string strConn = Ut.GetConnetString();

        public static List<Normals> GetAll()
        {
            List<Normals> list = new List<Normals>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<Normals>("SELECT [C1_3] as Coeff, [NameofN] FROM [Normals]").ToList();
            }
            return list;
        }
    }
}
