using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FinForum.Models;
using Microsoft.AspNetCore.Authorization;
using FinForum.Models.TopicF;

namespace FinForum.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetMessagesByTopicId(int TopicId)
        {
            List<Messagess> list = MessagessCrud.GetByTopicId(TopicId);
            return Json(list);
        }

        [Authorize]
        [HttpPost]
        public IActionResult AddMessagess(int TopicId, int MessagesId, string TextMess)
        {
            try
            {
                int intUserId = int.Parse(User.Claims.ToList()[0].Value);
                string userFio = User.Claims.ToList()[1].Value;

                DateTime date = DateTime.Now;

                Messagess model = new Messagess {  ParentMessageId = MessagesId, TopicId = TopicId, Text = TextMess, DataMess = date, AuthorId = intUserId, userFio = userFio };

                model = MessagessCrud.Insert(model);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        public IActionResult AddTopic(string Title, string Text)
        {
            try
            {
                int intUserId = int.Parse(User.Claims.ToList()[0].Value);
                string userFio = User.Claims.ToList()[1].Value;

                DateTime date = DateTime.Now;

                Topic topic = new Topic { Title = Title, Text = Text, DataCreate = date, AuthorId = intUserId, userFio = userFio };

                topic = TopicCrud.Insert(topic);
                return Ok(topic);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        public int getTopicQty(string strLike="")
        {
            List<Topic> list = TopicCrud.GetAll("");
            return list.Count;
        }

        public JsonResult GetData(int page = 1, int take = 5, string strLike = "")
        {
            if(strLike == null)
            {
                strLike = "";
            }

            int intSkip = (page - 1) * take;

            int intLength = TopicCrud.GetAll(strLike).Count;

            List<Topic> list = TopicCrud.GetAll(strLike).OrderByDescending(x => x.DataCreate).Skip(intSkip).Take(take).ToList();

            for(int i=0; i< list.Count; i++)
            {
                list[i].listMessages = MessagessCrud.GetByTopicId(list[i].Id);
            }

            var dataComplex = new {
                intLength = intLength,
                list = list
            };

            return Json(dataComplex);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
