import React from 'react'
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Form, Message, Segment } from 'semantic-ui-react'

class AuthView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          email: '',
          password: '',
          error: null
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
    }

    handleSignUp(){
        this.signUp().then(() => this.signIn())
    }

    signIn(){
        const {email, password} = this.state

        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
            .then(resp => resp.json())
            .then(resp => {
                if(resp.id) {
                    localStorage.setItem('token', resp.id)
                    this.props.history.push('/')
                    return resp
                }
                throw resp.error
            })
            .catch(error => {
              this.setState({error})
              throw error.message
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
              if(resp.id) {
                return resp
              }
              throw resp.error
            })
            .catch(error => {
              this.setState({error})
              throw error.message
            })
    }

    render() {
        const errorMessage = this.state.error ? <Message
          error
          header={'Ошибка авторизации'}
          content={this.state.error.message}
        /> : ''

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>Авторизация</Header>
                    <Form size='large' error>
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

                            {errorMessage}

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

export default withRouter(AuthView)
