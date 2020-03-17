using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FinForum.Models.Root;
using Microsoft.AspNetCore.Authorization;

namespace FinForum.Controllers
{
    [Authorize]
    [Authorize(Roles = "Админ")]
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetData()
        {
            List<Users> list = UsersCrud.GetAll();
            return Json(list);
        }

        [HttpPost]
        public JsonResult Add(Users model)
        {
            model = UsersCrud.Insert(model);
            return Json(model);
        }

        [HttpPost]
        public void Edit(Users model)
        {
            UsersCrud.Update(model);
        }

        [HttpPost]
        public void Del(int Id)
        {
            UsersCrud.Del(Id);
        }
    }
}