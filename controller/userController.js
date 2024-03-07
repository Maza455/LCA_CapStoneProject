import express from 'express';
import User from '../models/userModel.js';

class UserController {
    // CREATE 1 USER
    static create = async (req, res) => {
        if (!req.body) {
            res.status(400).send("Cannot add without info");
            return;
        }

        try {
            const user = new User({
                fname: req.body.fname,
                email: req.body.email,
                password: req.body.password,
            });

            await user.save();
            res.send(user);
        } catch (err) {
            res.status(500).send("Could not create new user");
            console.log(`Some err occured: ${err.message}`);
        }
    };

    // GET A USER
    static getOne = (req, res) => {
        const id = req.params.id;

        User.findById(id, {
                useFindAndModify: false
            })
            .then((data) => {
                res.send(data);
                console.log(data);
            })
            .catch((error) => {
                res.status(500).send("Could not find user", error);
                console.log("Could not find user", error);
            });
    };

    // GET ALL USERS 
    static getAll = (req, res) => {
        User.find()
            .then((data) => {
                res.send(data);
                console.log(data);
            })
            .catch((error) => {
                res.status(500).send("Could not find user", error);
                console.log("Could not find user", error);
            });
    };

    // UPDATE A USER
    static update = (req, res) => {
        if (!req.body) {
            res.status(400).send("Cannot update user");
            return;
        }
        const id = req.params.id;

        User.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        msg: `Cannot update User with id=${id}. Maybe it was not found`,
                    });
                } else {
                    res.status(201).send({
                        msg: "User was updated successfully"
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    msg: `Error updating User with id=${id} ${err}`
                });
            });
    };

    // DELETE A USER
    static deleteOne = (req, res) => {
        const id = req.params.id;

        User.findByIdAndRemove(id, {
                useFindAndModify: false
            })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        msg: `Cannot delete User with id=${id}. Maybe it was not exit/existing`,
                    });
                } else {
                    res.status(201).send({
                        msg: "User was deleted successfully"
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    msg: `Error deleting User with id=${id}, Error:  ${err}`
                });
            });
    };

    // CLEAR ALL
    static deleteAll = (req, res) => {
        User.deleteMany()
            .then((data) => {
                res.send(data);
                console.log(data);
            })
            .catch((error) => {
                res.status(500).send("Could not delete all users", error);
                console.log("Could not delete all", error);
            });
    };
}

export {
    UserController
};
    
export default UserController;
