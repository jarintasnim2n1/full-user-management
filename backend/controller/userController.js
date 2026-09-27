import User from "../models/Users.js";

export const getStatus = async (req, res, next) => {
    try {
        const total = await User.countDocuments();
        const active = await User.countDocuments({ status: "Active" });
        const inactive = await User.countDocuments({ status: "Inactive" });

        res.status(200).json({
            total,
            active,
            inactive
        });
    } catch (error) {
        next(error);
    }
};

export const getUserByquery = async (req, res, next) => {
    try {
        const query = req.params.query;
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 5);
        const skip = (page - 1) * limit;
        const searchQuery = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { phone: { $regex: query, $options: "i" } },
                { status: { $regex: query, $options: "i" } },
            ],
        };

        const users = await User.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await User.countDocuments(searchQuery);
        res.status(200).json({
            users,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
            totalUsers: total
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.max(1, parseInt(req.query.limit, 10) || 5);
        const skip = (page - 1) * limit;

        const users = await User.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await User.countDocuments();

        res.status(200).json({
            users,
            currentPage: page,
            totalPage: Math.ceil(total / limit),
            totalUsers: total
        });

    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { name, email, phone, status } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({
                message: "Name, email and phone are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ name, email, phone, status: status || "Active" });

        await user.save();
        res.status(201).json({
            data: user,
            message: "User created successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { name, email, phone, status } = req.body;

        if (email) {
            const exists = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (exists) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, status },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Successfully updated", user });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully", success: true });
    } catch (error) {
        next(error);
    }
};