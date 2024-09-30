import React, { useState } from 'react';
import styled from 'styled-components';
import Button from "@/components/Button";
import Rating from '@/components/Rating';

const InputWrapper = styled.div`
    margin-top: 20px;
`;

const Input = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;  
    border-radius: 4px;
    resize: none;
`;

const CommentWrapper = styled.div`
    margin: 20px 0;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
`;

const ShowCommentsButton = styled(Button)`
    margin-top: 10px;
    background-color: #0D3D29; /* Arka plan rengi */
    color: white; /* Metin rengi */
`;

const CommentsSection = ({ productId, comments }) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [showAllComments, setShowAllComments] = useState(false);

    const handleCommentSubmit = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, userName: 'New User', text: newComment, rating })
        });
        const comment = await response.json();
        setNewComment('');
        setRating(0);
    };

    const toggleShowComments = () => {
        setShowAllComments(!showAllComments);
    };

    return (
        <div>
            <h2>Comments</h2>
            {comments.length > 0 && (
                <>
                    {showAllComments ? (
                        comments.map((comment, index) => (
                            <CommentWrapper key={index}>
                                <strong>{comment.userName}</strong>
                                <p>{comment.text}</p>
                                <Rating rating={comment.rating} />
                            </CommentWrapper>
                        ))
                    ) : (
                        <CommentWrapper>
                            <strong>{comments[0].userName}</strong>
                            <p>{comments[0].text}</p>
                            <Rating rating={comments[0].rating} />
                        </CommentWrapper>
                    )}
                    <Button primary outine onClick={toggleShowComments}>
                        {showAllComments ? 'Hide Comments' : 'Show Comments'}
                    </Button>
                </>
            )}
            <InputWrapper>
                <Input
                    rows={4}
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Rating onRate={setRating} rating={rating} />
                <Button primary outline onClick={handleCommentSubmit}>Submit Comment</Button>
            </InputWrapper>
        </div>
    );
};

export default CommentsSection;
