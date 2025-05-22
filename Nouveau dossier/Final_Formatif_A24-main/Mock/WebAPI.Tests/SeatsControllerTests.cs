using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Moq;
using WebAPI.Controllers;
using WebAPI.Exceptions;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Tests;

[TestClass]
public class SeatsControllerTests
{
    Mock<SeatsService> serviceMock;
    Mock<SeatsController> controllerMock;

    public SeatsControllerTests()
    {
        serviceMock = new Mock<SeatsService>();
        controllerMock = new Mock<SeatsController>();

        controllerMock.Setup(c => c.UserId).Returns("11111");
    }

    [TestMethod]
    public void ReserveSeat()
    {
        Seat seat = new Seat();
        seat.Id = 1;
        seat.Number = 1;

        serviceMock.Setup(s => s.ReserveSeat(It.IsAny<string>(), It.IsAny<int>())).Returns(seat);

        var response = controllerMock.Object.ReserveSeat(seat.Number);

        var result = response.Result as OkObjectResult;
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public void ReserveSeatAlreadyReserved()
    {
        serviceMock.Setup(s => s.ReserveSeat(It.IsAny<string>(), It.IsAny<int>())).Throws(new SeatAlreadyTakenException());

        var actionresult = controllerMock.Object.ReserveSeat(1);

        var result = actionresult.Result as UnauthorizedResult;
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public void ReserveSeatNonExistant()
    {
        serviceMock.Setup(s => s.ReserveSeat(It.IsAny<string>(), It.IsAny<int>())).Throws(new SeatOutOfBoundsException());

        var actionresult = controllerMock.Object.ReserveSeat(1);

        var result = actionresult.Result as NotFoundObjectResult;
        Assert.IsNotNull(result);
    }

    [TestMethod]
    public void ReserveTwoSeatsByOneUser()
    {
        serviceMock.Setup(s => s.ReserveSeat(It.IsAny<string>(), It.IsAny<int>())).Throws(new UserAlreadySeatedException());

        var actionresult = controllerMock.Object.ReserveSeat(1);

        var result = actionresult.Result as BadRequestObjectResult;
        Assert.IsNotNull(result);
    }
}
