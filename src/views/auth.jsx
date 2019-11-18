import React from 'react'
import { Button, Grid, Header, Image, Form, Message, Segment } from 'semantic-ui-react'

export default class AuthView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
    }

    handleInputChange(event) {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        });
    }

    handleSignIn(){
        this.signIn()
            .catch(e => {
                console.log(e.message)
            })
    }

    handleSignUp(){
        this.signUp()
            .then(this.signIn())
            .catch(e => {
                console.log(e.message)
            })
    }

    signIn(){
        const {email, password} = this.state

        return fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.id) {
                    return localStorage.setItem('token', resp.id)
                }
                throw new Error(resp.error.message)
            })
    }

    signUp(){
        const {email, password} = this.state

        return fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                return resp
            })
            .then(resp => resp.id || new Error(resp.error.message))
    }

    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>Авторизация</Header>
                    <Form size='large'>
                        <Segment raised>
                            <Form.Input fluid name='email' icon='user' value={this.state.email} onChange={this.handleInputChange} iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                fluid
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button.Group fluid size='large'>
                                <Button color='green' onClick={this.handleSignIn}>Войти</Button>
                                <Button onClick={this.handleSignUp}>Создать и войти</Button>
                            </Button.Group>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}