const chatsController = {};

chatsController.renderChats = async (req, res) => {
  const data = req.query;
  res.render("chat");
};

export default chatsController;
