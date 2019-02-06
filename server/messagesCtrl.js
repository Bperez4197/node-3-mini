var allMessages = [];

module.exports = {
    getAllMessages: (req,res) => {
        res.status(200).json(allMessages);
    },

    createMessages: (req,res) => {
        let newMessage ={
            username: req.body.username,
            message: req.body.message
        }
        allMessages.push(newMessage);

        if(req.session.history){
            req.session.history.push(newMessage);
        }else {
            req.session.history = [];
            req.session.history.push(newMessage);
        }
        res.status(200).json(allMessages);
    },

    history: (req,res) => {
        res.status(200).json(req.session.history);
    }
};