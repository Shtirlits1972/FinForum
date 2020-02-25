﻿using System.Collections.Generic;
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

        public static List<string[]> GetAll(int id_kl = 1, int RegNumberOfKO = 1000, int id_priz = 1, int id_mes1 = 180, int id_mes2 = 187, int i = 1)
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
    }
}
