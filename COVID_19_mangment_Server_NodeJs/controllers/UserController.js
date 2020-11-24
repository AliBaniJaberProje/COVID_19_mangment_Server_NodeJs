const User=require('../database/model/User');
var session;

exports.isAdminUser=(req,res,next,userId)=>
{
    session=req.session;
    User.findById(userId,(err,result)=>{
        if(result.type_user==='admin_user')
        {
            session.typeuser='admin_user';
            next();
        }
        else
        {
            res.status(404).json({
                massage:'YOU cant add admin user when you are reqular user '
            })
        }
        return false;
    })
}


