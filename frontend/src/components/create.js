import React from 'react'
// import { Button, Checkbox, Form } from 'semantic-ui-react'


const Create = () => (
    <Form className="create-form">
        <Form.Field>
            <label>Correo Electronico</label>
            <input placeholder='Correo Electronico' />
        </Form.Field>
        <Form.Field>
            <label>Nombre Completo</label>
            <input placeholder='Nombre Completo' />
        </Form.Field>
        <Form.Field>
            <label>Contraseña</label>
            <input placeholder='Contraseña' />
        </Form.Field>
        <Form.Field>
            <label>Nombre usuario</label>
            <input placeholder='Nombre usuario' />
        </Form.Field>
        <Form.Field>
            <label>Rut</label>
            <input placeholder='Rut' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
)

export default Create;