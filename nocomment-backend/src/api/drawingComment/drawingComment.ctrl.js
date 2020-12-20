import DrawingComment from "../../models/drawingComment";

export const insert = async (ctx) => {
    console.log("drawingComment insert");
    const { filename } = ctx.request.file;
    const { postId } = ctx.request.body;
    const drawingComment = new DrawingComment({
        post : {
            _id : postId   
        },
        fileName : filename,
        noCommenter : ctx.state.noCommenter,
    });
    try{
        await drawingComment.save();
    }catch(e){
        ctx.throw(500, e);
    }
}
