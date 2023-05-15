import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container } from 'semantic-ui-react'
import { decrement, increment } from './testReducer'

export default function Sandbox() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data)
  return (
    <>
    <Container className='main'>
        <h1>Testing 123</h1>
        <h3>The data is:{data}</h3>
        <Button onClick={() => dispatch(increment(10))} content='Increment' color='green' />
        <Button onClick={() => dispatch(decrement(10))} content='Decrement' color='red' />
    </Container>
    </>
  )
}
