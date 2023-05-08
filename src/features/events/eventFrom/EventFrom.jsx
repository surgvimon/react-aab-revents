import React from 'react'
import { Header, Segment, Form, Input, Button } from 'semantic-ui-react'

export default function EventFrom({setFormOpen}) {
  return (
    <Segment clearing>
        <Header content="Create new event"/>
        <Form>
            <Form.Field>
                <Input type="text" placeholder="Event title"/>
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Category"/>
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Description"/>
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="City"/>
            </Form.Field>
            <Form.Field>
                <Input type="text" placeholder="Venue"/>
            </Form.Field>
            <Form.Field>
                <Input type="date" placeholder="Date"/>
            </Form.Field>
            <Button type="submit" floated="right" positive content="Submit"/>
            <Button onClick={()=> setFormOpen(false)} type="submit" floated="right"  content="Cancel"/>
        </Form>
    </Segment>
  )
}
