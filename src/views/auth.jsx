import React from 'react'
import { withRouter } from "react-router-dom";
import { Button, Grid, Header, Form, Message, Segment } from 'semantic-ui-react'
import AuthService from "../services/auth.service";

class AuthView extends React.Component{
    constructor(props){
        super(props)

        this.state = {
          email: '',
          password: '',
          error: null
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.signUp = this.signUp.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    handleInputChange(event) {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        });
    }

    signIn(){
        AuthService.login(this.state.email, this.state.password)
          .then(() => {
            this.props.history.push('/')
          })
          .catch(error => {
              this.setState({error})
          })
    }

    signUp(){
        AuthService.createUser(this.state.email, this.state.password)
          .then(this.signIn)
          .catch(error => {
              this.setState({error})
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
                                <Button color='green' onClick={this.signIn}>Войти</Button>
                                <Button onClick={this.signUp}>Создать и войти</Button>
                            </Button.Group>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withRouter(AuthView)
