import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const register = async (req, res)=>{
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({Message:"All Fields are Required"})
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ Message: "Passwords do not match" });
        }


        const user = await User.findOne({ userName })
        if (user) {
            return res.status(400).json({Message:"username already exists you can try different "})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;



        await User.create({
            userName,
            fullName,
            password:hashedPassword,
            profilePhoto: gender ===male? maleProfilePhoto : femaleProfilePhoto,
            gender
        })
    } catch (error) {
        console.log(error);
        
    }
}