using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FinForum.Models.Root;
using Microsoft.IdentityModel.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;

namespace FinForum.Controllers
{
    public class AccountController : Controller
    {
        private List<Users> people = UsersCrud.GetAll();

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async System.Threading.Tasks.Task<IActionResult> Login(LoginModel model)
        {

            if (ModelState.IsValid)
            {
                Users user = UsersCrud.Login(model.Email, model.Password);

                if (user != null)
                {
                    await GetIdentity(user); // аутентификация
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return View(model);
        }

        private async Task GetIdentity(Users users)
        {
            if (users != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("Id", users.Id.ToString(), ClaimValueTypes.Integer32),
                    new Claim("UserFio", users.userFio),
                    new Claim("isBanned", users.isBanned.ToString(), ClaimValueTypes.Boolean),

                    new Claim(ClaimsIdentity.DefaultNameClaimType, users.email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, users.role)
                };

                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

                var identity = new ClaimsIdentity(claims, "Cookies");
                var principal = new ClaimsPrincipal(identity);
                await HttpContext.SignInAsync("Cookies", new ClaimsPrincipal(identity));

            }
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                Users user = new Users {  email = model.Email, pass = model.Password, userFio = model.userFio, isBanned = false, role = "Юзер" };
                // добавляем пользователя
                user = UsersCrud.Insert(user);

                if (user != null && user.Id > 0)
                {
                    // установка куки
                    await GetIdentity(user);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                   ModelState.AddModelError(string.Empty, "Ошибка!");
                }
            }
            return View(model);
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("Cookies");
            return RedirectToAction("Login", "Account");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogOff()
        {
            await HttpContext.SignOutAsync("Cookies");
            return RedirectToAction("Index", "Home");
        }
    }
}