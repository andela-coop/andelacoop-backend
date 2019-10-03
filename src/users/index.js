import db from '../../models';

class UserController {
    static async getAllUser (req, res) {
        const user = await db.User.findAll({attributes: ['id', 'firstName', 'email']})
        return res.status(200).json({
            message: 'Data retrieved success',
            data: {
                user
            }
        })
    }
}

export default UserController