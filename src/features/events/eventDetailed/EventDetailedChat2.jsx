import React from 'react'
import { Link } from 'react-router-dom';
import { Comment, Header, Segment } from 'semantic-ui-react'
import EventDetailedChatForm from './EventDetailedChatForm'
import { useDispatch, useSelector } from 'react-redux'
import { firebaseObjectToArray, getEventChatRef } from '../../../app/firestore/firebaseService';
import { onValue } from 'firebase/database';
import { listenToEventChat } from '../eventActions';
import { formatDistance } from 'date-fns';

export default function EventDetailedChat2({eventId}) {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.event);

    useEffect(() => {
        onValue(getEventChatRef(eventId), (snapshot) => {
          if (!snapshot.exists()) return;
          //console.log(firebaseObjectToArray(snapshot.val()))
          dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()))
        });
        return () => {
          
        };
    }, [eventId, dispatch]);
  return (
    <>
      <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{border: 'none'}}
      >
          <Header>Comments about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm eventId={eventId} />
        <Comment.Group>
            {comments.map((comment) => (
            <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'}/>
                <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                    <Comment.Metadata>
                        <div>{formatDistance(comment.date, new Date())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
            ))}
            {/* 
            <Comment>
                <Comment.Avatar src="/assets/user.png"/>
                <Comment.Content>
                    <Comment.Author as="a">Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                        <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                            This has been very useful for my research. Thanks as well!
                        </p>
                    </Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src="/assets/user.png"/>
                        <Comment.Content>
                            <Comment.Author as="a">Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                                <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>Elliot you are always so right </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Comment.Group>
            </Comment>

            <Comment>
                <Comment.Avatar src="/assets/user.png"/>
                <Comment.Content>
                    <Comment.Author as="a">Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                        <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment> 
            */}
        </Comment.Group>
          
      </Segment>

    </>
  )
}
