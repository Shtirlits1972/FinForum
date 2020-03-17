using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using System.IO;
using Microsoft.AspNetCore;
using System.Net;

namespace FinForum
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHostBuilder build = CreateWebHostBuilder(args);

            CreateHostBuilder(args).Build().Run();
        }

    //public static IWebHost BuildWebHost(string[] args) =>
    //WebHost.CreateDefaultBuilder(args)
    //    .UseStartup<Startup>()
    //    .UseIISIntegration()
    //    .Build();
    //}

    // WebHostBuilderKestrelExtencions
    //public static void Main(string[] args)
    //{
    //    var host = new WebHostBuilder()
    //        .UseKestrel()
    //        .UseContentRoot(Directory.GetCurrentDirectory())
    //        .UseIISIntegration()
    //        //.UseStartup()
    //        .Build();

    //    host.Run();
    //}

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel(options =>
                {
                    options.Limits.MaxConcurrentConnections = 100;
                    options.Limits.MaxRequestBodySize = 10 * 1024;
                    options.Limits.MinRequestBodyDataRate =
                        new MinDataRate(bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
                    options.Limits.MinResponseDataRate =
                        new MinDataRate(bytesPerSecond: 100, gracePeriod: TimeSpan.FromSeconds(10));
                    options.Listen(IPAddress.Loopback, 5000);
                });
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
