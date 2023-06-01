import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Label, Segment } from 'semantic-ui-react'

export default function EventDetailedSidebar({ attendees, hostUid, currentUser}) {
  return (
    <>
      <Segment
          textAlign="center"
          style={{border: 'none'}}
          attached="top"
          secondary
          inverted
          color="teal"
      >
          {attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going
      </Segment>
      <Segment attached>
          <Item.Group relaxed divided>
            {attendees.map(attendee => (
              <>
              {currentUser === attendee.id ? (
                <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{ position: 'relative' }}>
                  <Item.Image size="tiny" src={attendee.photoURL || '/assets/user.png'}/>
                  {hostUid === attendee.id && (
                    <Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Host' />
                  )}
                  <Item.Content verticalAlign="middle">
                      <Item.Header as="h3">
                          <span>{attendee.displayName}</span>
                      </Item.Header>
                  </Item.Content>
                </Item>
              ) : (
                <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id} style={{ position: 'relative' }}>
                  <Item.Image size="tiny" src={attendee.photoURL || '/assets/user.png'}/>
                  {hostUid === attendee.id && (
                    <Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Host' />
                  )}
                  <Item.Content verticalAlign="middle">
                      <Item.Header as="h3">
                          <span>{attendee.displayName}</span>
                      </Item.Header>
                  </Item.Content>
                </Item>
              )}
              
              </>
            ))}
          </Item.Group>
      </Segment>
    </>
  )
}
