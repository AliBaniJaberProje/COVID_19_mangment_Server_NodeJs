exports.filterImageStorInUplodFile=(req,file,cb)=>
{
    //reject a file by cb(null,false)
    //accebt by cb(null,true)
    if(file.mimetype === 'image/jpeg')
    {
        cb(null,true);
    }
    else
    {
        cb(new Error(' error in type of image just accept jpeg  '),false);
    }
}
// exports.validationInfoOfUser=(req,res,file,next)=>
// {
//     if(file.UserImage.mimetype==='image/jpeg')
//     {
//         next();
//     }
//     else
//     {
//         res.status(502).json({
//             status:502,
//             massage:' image invalid '
//         })
//     }
// }
