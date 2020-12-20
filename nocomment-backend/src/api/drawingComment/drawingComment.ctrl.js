import DrawingComment from "../../models/drawingComment";

export const insert = async (ctx) => {
    console.log('drawingComment insert method');
    const { filename } = ctx.request.file;
    const { postId } = ctx.request.body;
    console.log(filename);
    console.log(postId);
    const drawingComment = new DrawingComment({

    });
}
