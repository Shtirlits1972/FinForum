using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FinForum.Controllers
{
    public class BankrepController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}