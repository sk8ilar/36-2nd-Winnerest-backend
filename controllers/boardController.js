const boardService = require('../services/boardService');

const createBoard = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id;
    await boardService.createBoard(userId, title);
    res.status(201).json({message : 'CREATED_BOARD'});
} 

const getBoardTitle = async (req, res) => {
    const userId = req.user.id;
    const boardTitle = await boardService.getBoardTitle(userId);
    res.status(200).json(boardTitle);
}

const getUserBoard = async (req, res) => {
    const { userId } = req.params;
    const userBoardInfo = await boardService.getUserBoard(userId);
    res.status(200).json(userBoardInfo);
}


const getBoardInfo = async (req, res) => {
    const { boardId } = req.params;
    const boardInfo = await boardService.getBoardInfo(boardId);
    res.status(200).json(boardInfo);
}

const updateBoard = async (req, res) => {
    const userId = req.user.id;
    const { title } = req.body;
    const { boardId } = req.params;
    await boardService.updateBoard(userId, title, boardId);
    res.status(201).json({message : 'UPDATE_BOARD'});
}

const deleteBoard = async (req, res) => {
    const userId = req.user.id;
    const { boardId } = req.params;
    await boardService.deleteBoard(userId, boardId);
    res.status(200).json({message : 'DELETE_BOARD_SUCCESS'});
}


module.exports = {
    createBoard,
    getBoardTitle,
    updateBoard,
    deleteBoard,
    getUserBoard,
    getBoardInfo,
}