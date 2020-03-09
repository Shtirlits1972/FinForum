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
    public class Q6Crud
    {
        private static readonly string strConn = Ut.GetConnetString();
        public static List<string[]> GetAll(int id_kl, int RegNumberOfKO, int id_priz, int id_mes1, int id_mes2, int i)
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var procedure = "[FillTT_web]";
                var values = new { id_kl = id_kl, RegNumberOfKO = RegNumberOfKO, id_priz = id_priz, id_mes1 = id_mes1, id_mes2 = id_mes2, i = i };
                var results = db.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();


                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                        foreach (string str in row.Keys)
                        {
                            if (string.IsNullOrEmpty(str.Trim()))
                            {
                                valueTable[count] = "";
                            }
                            else
                            {
                                valueTable[count] = str;
                            }
                            count++;
                        }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString();
                        }
                           
                       count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        public static List<string[]> FillTT_ot_web(int RegNumberOfKO, int id_pr, DateTime D1, DateTime D2)
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var procedure = "[FillTT_ot_web]";
                var values = new { RegNumberOfKO = RegNumberOfKO, id_pr = id_pr, D1 = D1, D2 = D2 };
                var results = db.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString().Replace(",", ".");
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        public static List<string[]> ReportQ7( int id_mes1, int id_mes2)
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var procedure = "[FillTT_web]";
                var values = new { id_kl = 1, RegNumberOfKO = 0, id_priz = 1, id_mes1 = id_mes1, id_mes2 = id_mes2, i = 2 };
                var results = db.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString();
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }
            return list;
        }
        public static List<string[]> Ranking_on_DT(int id_pr, DateTime Dtt, string kod )
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var procedure = "[Ranking_on_DT]";
                var values = new { id_pr = id_pr, Dtt = Dtt.ToString("yyyy-MM-dd"), kod = kod };
                var results = db.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            if(count == 1)
                            {
                                valueTable[count] = valuesStr.ToString().Substring(0, 10);
                            }
                            else
                            {
                                valueTable[count] = valuesStr.ToString();
                            }
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        public static List<string[]> ReportQ8(int id_M, int id_regn)
        {
            List<string[]> list = new List<string[]>();
            using (IDbConnection db = new SqlConnection(strConn))
            {
                string strCommand = "SELECT kod,[lev], [name1], Val_St, Cl_Act, Val_Cl_Act,[Share], X_RankingUSER, [ShareWithOUTfil_perc] FROM dbo.[StructureBalansGraph](@id_M, @id_regn, 1, 1, 8);";
                var results = db.Query(strCommand, new { id_M = id_M, id_regn = id_regn }).ToList();

                //  шапка
                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                //  тело таблицы
                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString();
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        public static List<string[]> ReportQ3_2(DateTime Dtt, string CURR)
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var results = db.Query("Select * FROM dbo.U3194_all_for_one_curr(@Dtt, @CURR)", new { Dtt = Dtt, CURR = CURR }).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString();
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        public static List<string[]> ReportQ_33(int regn, string CURR)
        {
            List<string[]> list = new List<string[]>();

            using (IDbConnection db = new SqlConnection(strConn))
            {
                var results = db.Query("select * FROM U3194_for_one_regn(@regn, @CURR) order by Дата;", new { regn = regn, CURR = CURR }).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            if(count == 0)
                            {
                                valueTable[count] = valuesStr.ToString().Substring(0, 10);
                            }
                            else
                            {
                                valueTable[count] = valuesStr.ToString();
                            }
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }

            return list;
        }
        //  Bubble_Chart
        public static List<string[]> Bubble_Chart(int id_pr, DateTime Dtt, string kod)
        {
            List<string[]> list = new List<string[]>();
            using (IDbConnection db = new SqlConnection(strConn))
            {
                var procedure = "[Bubble_Chart]";
                var values = new { id_pr = id_pr,  Dtt = Dtt,  kod = kod };
                var results = db.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;
                    foreach (string str in row.Keys)
                    {
                        if (string.IsNullOrEmpty(str.Trim()))
                        {
                            valueTable[count] = "";
                        }
                        else
                        {
                            valueTable[count] = str;
                        }
                        count++;
                    }

                    list.Add(valueTable);
                    break;
                }

                foreach (IDictionary<string, object> row in results)
                {
                    string[] valueTable = new string[row.Keys.Count];
                    int count = 0;

                    foreach (object valuesStr in row.Values)
                    {
                        if (valuesStr == null)
                        {
                            valueTable[count] = "0";
                        }
                        else
                        {
                            valueTable[count] = valuesStr.ToString();
                        }

                        count++;
                    }

                    list.Add(valueTable);
                }
            }
            return list;
        }
    }
}
