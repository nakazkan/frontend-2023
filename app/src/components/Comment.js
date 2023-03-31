import { useEffect, useState } from "react";
import "./Comment.css";
export function Comment(props) {
    const { comment } = props;

    return <div className="comment">
        <div>{comment.author}</div>
        <div>{comment.text}</div>
    </div>
}