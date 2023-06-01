import React from 'react'
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react'

export default function MessagesChatHeader({profile, isCurrentUser}) {
  return (
    <Segment>
    <Grid>
        <Grid.Column width={16}>
            <Item.Group>
                <Item>
                    <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
                    <Item.Content verticalAlign='middle'>
                        <Header as='h1' style={{display: 'block', marginBottom: 10}} content={profile.displayName} />
                        {!isCurrentUser &&
                <>
                    <Divider/>
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{width: '100%'}}>
                            <Button fluid color='teal' content='Following'/>
                        </Reveal.Content>
                        <Reveal.Content hidden style={{width: '100%'}}>
                            <Button basic fluid color='red' content='Unfollow'/>
                        </Reveal.Content>
                    </Reveal>
                </>
            }
                    </Item.Content>
                </Item>
            </Item.Group>
            

            <Item.Group class="ui centered grid" >
            <Statistic.Group >
                <Statistic label="Followers" value={10}/>
                <Statistic label="Following" value={5}/>
            </Statistic.Group>

            </Item.Group>
        </Grid.Column>
    </Grid>
</Segment>

  )
}
