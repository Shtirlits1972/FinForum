using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FinForum.Models.ReportsQ;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FinForum.Controllers
{
    public class ReportsController : Controller
    {
        List<Bank> listBanks = BankCrud.GetAll();
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult FillTT_ot_web(int RegNumberOfKO, int id_pr, int id_mes1, int id_mes2)
        {
            DateTime D1 = DTCrud.GetDateFromIdMes(id_mes1);
            DateTime D2 = DTCrud.GetDateFromIdMes(id_mes2);

            List<string[]> list = Q6Crud.FillTT_ot_web(RegNumberOfKO, id_pr, D1, D2);
            return Json(list);
        }

        public JsonResult GetData(int id_mes1, int id_mes2, int RegNumberOfKO=1000, int id_priz=1, int i=1)
        {
            List<string[]> list = Q6Crud.GetAll(1, RegNumberOfKO, id_priz, id_mes1, id_mes2, i);
            return Json(list);
        }

        public JsonResult GetDataQ7(int id_mes1, int id_mes2)
        {
            List<string[]> list = Q6Crud.ReportQ7(id_mes1, id_mes2);
            return Json(list);
        }
        public IActionResult IndexQ7()
        {
            return View();
        }

        public JsonResult GetBanks()
        {
            List<Bank> list = BankCrud.GetAll();
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
    }
}