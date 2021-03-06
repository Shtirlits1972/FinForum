﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FinForum.Models.ReportsQ;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text.Json;

namespace FinForum.Controllers
{
    public class ReportsController : Controller
    {
        List<Bank> listBanks = BankCrud.GetAll();
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Bubble()
        {
            return View();
        }

        [DisableRequestSizeLimit]
        public JsonResult Bubble_Chart(int id_mes, string kod, string strBankIds="")
        {
            string[] bankIds;

            if (!String.IsNullOrEmpty(strBankIds))
            {
                bankIds = strBankIds.Trim().Split(',');
            }
             else
            {
                bankIds = new string [] { "" };
            }

            DateTime dateTime = DTCrud.GetDateFromIdMes(id_mes);
            List<string[]> list = Q6Crud.Bubble_Chart(12, dateTime, kod);

            List<string[]> listRes = new List<string[]>();
            listRes.Add(list[0]);

            if (bankIds.Length > 0 )
            {
                for(int i=1; i< list.Count; i++)
                {
                    if (bankIds.Contains(list[i][1].Trim()))
                    {
                        listRes.Add(list[i]);
                    }
                }
            }

            return Json(listRes.OrderBy(x => x[2]));
        }
        public JsonResult FillTT_ot_web(int RegNumberOfKO, int id_pr, int id_mes1, int id_mes2)
        {
            DateTime D1 = DTCrud.GetDateFromIdMes(id_mes1);
            DateTime D2 = DTCrud.GetDateFromIdMes(id_mes2);

            List<string[]> list = Q6Crud.FillTT_ot_web(RegNumberOfKO, id_pr, D1, D2);
            return Json(list);
        }
        public JsonResult GetData(int id_mes1, int id_mes2, int RegNumberOfKO, int id_priz, int i=1)
        {
            List<string[]> list = Q6Crud.GetAll(1, RegNumberOfKO, id_priz, id_mes1, id_mes2, i);
            return Json(list);
        }
        public JsonResult Ranking_on_DT(int id_pr, int id_mes, string kod)
        {
            DateTime Dtt = DTCrud.GetDateFromIdMes(id_mes);

            List<string[]> list = Q6Crud.Ranking_on_DT(id_pr, Dtt, kod);
            return Json(list);
        }
        public IActionResult IndexQ31()
        {
            return View();
        }
        public JsonResult GetDataQ31()
        {
            List<top_deposit_rates> list = top_deposit_ratesCrud.GetAll();
            return Json(list);
        }
        public JsonResult GetDataQ7(int id_mes1, int id_mes2, int sysT)
        {
            List<string[]> list = new List<string[]>();

            if (sysT == 1)
            {
                list = Q6Crud.ReportQ7(id_mes1, id_mes2);
            }
            else
            {
                DateTime D1 = DTCrud.GetDateFromIdMes(id_mes1);
                DateTime D2 = DTCrud.GetDateFromIdMes(id_mes2);

                list = Q6Crud.FillTT_ot_web(0, sysT, D1, D2);
            }
            
            return Json(list);
        }
        public IActionResult IndexQ7()
        {
            return View();
        }
        public IActionResult IndexQ8()
        {
            return View();
        }
        public IActionResult IndexQ3()
        {
            return View();
        }
        public JsonResult DataQ32(int id_mes, string Curr)
        {
            DateTime date = DTCrud.GetDateFromIdMes(id_mes);

            List<string[]> list = Q6Crud.ReportQ3_2(date, Curr);
            return Json(list);
        }
        public JsonResult DataQ33(int regn)
        {
            List<string[]> listUSD = Q6Crud.ReportQ_33(regn, "USD");
            listUSD.RemoveAt(0);

            List<string[]> listEUR = Q6Crud.ReportQ_33(regn, "EUR");
            listEUR.RemoveAt(0);

            List<string[]> listRUB = Q6Crud.ReportQ_33(regn, "RUB");
            listRUB.RemoveAt(0);

            var model = new {

                listUSD = listUSD,
                listEUR = listEUR,
                listRUB = listRUB
                
            };

            return Json(model);
        }
        public JsonResult GetDataQ8(int id_M=188, int id_regn= 1481)
        {
            List<string[]> list = Q6Crud.ReportQ8(id_M, id_regn);
            return Json(list);
        }
        public JsonResult GetBanks(bool WithAll = false)
        {
            List<Bank> list = (BankCrud.GetAll() as IEnumerable<Bank>).Take<Bank>(1000).ToList();

            if(WithAll)
            {
                Bank AllBank = new Bank { IntCode = 0, RegNumber = 0, OrgName = "Все банки" };
                list.Insert(0, AllBank);
            }

            return Json(list);
        }
        public JsonResult GetDT()
        {
            List<DT> list = DTCrud.GetAll();
            return Json(list);
        }
        public JsonResult GetSysT()
        {
            List<sysT> list = sysTCrud.GetAll();
            return Json(list);
        }
        public JsonResult GetNormals()
        {
            List<Normals> list = NormalsCrud.GetAll();
            return Json(list);
        }
        public JsonResult GetX_Rank_us_guide_bko()
        {
            List<X_Rank_us_guide_bko> list = X_Rank_us_guide_bkoCrud.GetAll();
            return Json(list);
        }
    }
}