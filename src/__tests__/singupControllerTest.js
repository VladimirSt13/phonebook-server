/* eslint-disable no-undef */
const { signupController } = require("../controllers/users");
const { User } = require("../models/userModel");

describe("test signup controller", () => {
  
  test("should respond with the a 201 status code", async () => {
    // jest.spyOn(User, "prototype.save").mockImplementationOnse(jest.fn());
    User.prototype.save = jest.fn();

    const user = {
      email: "test@email.com",
      password: "1234567890",
    };

    const req = {
      body: {
        email: user.email,
        password: user.password,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };

    const result = await signupController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(result.user.email).toEqual(req.body.email);
    expect(result.user.subscription).toEqual("starter");
  });
});
