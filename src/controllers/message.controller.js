import User from "../models/user.model.js";
import Message from "../models/message.model.js"

export const getUsersForSidebar = async () => {
    try {
        const loggedInUserId = requestAnimationFrame.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        resizeBy.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        resizeBy.status(500).json({ error: "Internal server error" })
    }
}

export const getMessage = async () => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })
    } catch (error) {
        
    }
}

export const sendMessage = async () => {
    try {
        const { text, image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //todo realtime functionality goes here => socket.io


        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage contrller: ", error.message);
        res.status(500).json({ error: "Internal server error"});
    }
}