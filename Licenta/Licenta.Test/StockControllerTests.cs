using FakeItEasy;
using Licenta.Controllers;
using Licenta.Models;
using Licenta.Services;
using Microsoft.AspNetCore.Mvc;

namespace Licenta.Test
{
    public class StockControllerTests
    {
        [Fact]
        public async void GetStock_Return_Ok()
        {
            // Arange
            var service = A.Fake<IStockService>();
            var stock = new StockModel()
            {
                Stock = new Stock()
                {
                    Symbol = "META",
                },
                Timestamp = DateTime.Now,
            };
            A.CallTo(() => service.Get("META")).Returns(Task.FromResult(stock));

            var controller = new StockController(service);

            // Act
            var actionResult = await controller.Get("META");

            var result = actionResult as OkObjectResult;
            var value = result?.Value as Stock;

            // Assert
            Assert.Equal(200, result?.StatusCode);
            Assert.NotNull(value);
            Assert.Equal("META", value.Symbol);
        }

        [Fact]
        public async void GetStock_Return_NotFound()
        {
            // Arange
            var service = A.Fake<IStockService>();
            StockModel? stock = null;
            A.CallTo(() => service.Get("META")).Returns(Task.FromResult(stock)!);

            var controller = new StockController(service);

            // Act
            var actionResult = await controller.Get("META");

            var result = actionResult as NotFoundObjectResult;
            var value = result?.Value as Stock;

            // Assert
            Assert.Equal(404, result?.StatusCode);
            Assert.Null(value);
        }
    }
}