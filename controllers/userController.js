import User from "../model/User.js";
import { HTTP } from "../util/const.js";

const userController = {
  async getAllUsers(req, res) {
    console.debug("[GET] /users - userController.getAllUsers", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const users = await User.find();
      res.status(HTTP.OK).json(users);
    } catch (error) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    console.debug("[GET] /users/:id - userController.getUserById", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
      }
      res.status(HTTP.OK).json(user);
    } catch (error) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  },

  async createUser(req, res) {
    console.debug("[POST] /users - userController.createUser", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    const { oauthId, email, name, profilePicture } = req.body;
    const newUser = new User({
      oauthId,
      email,
      name,
      profilePicture
    });

    try {
      const savedUser = await newUser.save();
      res.status(HTTP.CREATED).json(savedUser);
    } catch (error) {
      res.status(HTTP.BAD_REQUEST).json({ message: error.message });
    }
  },
  updateUser: async (req, res) => {
    console.debug("[PUT] /users/:id - userController.updateUser", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
      }
      res.status(HTTP.OK).json(updatedUser);
    } catch (error) {
      res.status(HTTP.BAD_REQUEST).json({ message: error.message });
    }
  },
  deleteUser: async (req, res) => {
    console.debug("[DELETE] /users/:id - userController.deleteUser", { method: req.method, url: req.originalUrl, query: req.query, params: req.params, body: req.body });
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(HTTP.NOT_FOUND).json({ message: "User not found" });
      }
      res.status(HTTP.OK).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
};

export default userController;
