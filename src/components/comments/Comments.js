import { useCallback, useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const Comments = ({ quoteId }) => {
  const { sendRequest: invoke, status, data, error } = useHttp(getAllComments);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  let comments;
  if (status === 'pending') {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === 'completed' && (!data || data.length === 0)) {
    comments = <p className="centered">No comments added yet!</p>;
  }
  if (status === 'completed' && data && data.length > 0) {
    comments = <CommentsList comments={data} />;
  }
  const onAddingCommentHandler = useCallback(() => {
    invoke(quoteId);
  }, [invoke, quoteId]);

  useEffect(() => {
    invoke(quoteId);
  }, [invoke, quoteId]);
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddingComment={onAddingCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
