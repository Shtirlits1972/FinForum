using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using FinForum.Models.Root;

namespace FinForum.Models.ReportsQ
{
    public class top_deposit_ratesCrud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<top_deposit_rates> GetAll()
        {
            List<top_deposit_rates> list = new List<top_deposit_rates>();
            using (IDbConnection db = new SqlConnection(strConn))
            {
                list = db.Query<top_deposit_rates>("select decade, RAte, dataRes from top_deposit_ratesView order by dataRes;").ToList();
            }
            return list;
        }
    }
}
