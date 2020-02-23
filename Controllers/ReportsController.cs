using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FinForum.Models.ReportsQ;

namespace FinForum.Controllers
{
    public class ReportsController : Controller
    {
        public IActionResult Index()
        {
            List<string[]> list = Q6Crud.GetAll();
            return View(list);
        }
    }
}