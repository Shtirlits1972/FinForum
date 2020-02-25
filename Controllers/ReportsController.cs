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

        public JsonResult GetData(string strData1, string strData2, int id_kl=1, int RegNumberOfKO=1000, int id_priz=1, int i=1)
        {
            DateTime data1 = Convert.ToDateTime(strData1);
            DateTime data2 = Convert.ToDateTime(strData2);
            //  int id_mes1=180, int id_mes2=187,
            int id_mes1 = DTCrud.GetIdByDate(data1);
            int id_mes2 = DTCrud.GetIdByDate(data2);

            List<string[]> list = Q6Crud.GetAll(id_kl, RegNumberOfKO, id_priz, id_mes1, id_mes2, i);
            return Json(list);
        }

        public JsonResult GetBanks()
        {
            List<Bank> list = BankCrud.GetAll();
            return Json(list);
        }

        public JsonResult GetKlassificators()
        {
            List<Klassificators> list = KlassificatorsCrud.GetAll();
            return Json(list);
        }
    }
}