import { Card, Heading, Text, Form, Button, useToaster, Message } from 'rsuite'
import { useState } from 'react'
import useProduct from '../../store/useStore'

const CreateProduct = () => {
  const addProduct = useProduct(state => state.addProduct)
  const toaster = useToaster()

  const [formValue, setFormValue] = useState({
    title: '',
    description: '',
    price: '',
  })

  const [errors, setErrors] = useState({})

  const showMessage = (type, text) => {
    toaster.push(
      <Message showIcon type={type} closable>
        {text}
      </Message>,
      { placement: 'topEnd' }
    )
  }

  const handleSubmit = () => {
    const newErrors = {}

    if (!formValue.title) newErrors.title = 'Title majburiy'
    if (!formValue.description) newErrors.description = 'Description majburiy'
    if (!formValue.price) newErrors.price = 'Price majburiy'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      showMessage('error', 'Iltimos, barcha maydonlarni to‘ldiring!')
      return
    }

    const newProduct = {
      id: Date.now(),
      title: formValue.title,
      description: formValue.description,
      price: Number(formValue.price),
    }

    addProduct(newProduct)

    const oldProducts = JSON.parse(localStorage.getItem('products')) || []
    const updatedProducts = [...oldProducts, newProduct]
    localStorage.setItem('products', JSON.stringify(updatedProducts))


    showMessage('success', 'Mahsulot muvaffaqiyatli qo‘shildi!')

    setErrors({})
    setFormValue({
      title: '',
      description: '',
      price: '',
    })
  }

  return (
    <div style={wrapperStyle}>
      <Card width={400} shaded size="lg">
        <Card.Header>
          <Heading level={4}>Create product</Heading>
          <Text muted>Yangi product qoshing</Text>
        </Card.Header>

        <Card.Body>
          <Form
            fluid
            formValue={formValue}
            onChange={val => {
              setFormValue(val)
              setErrors({})
            }}
            onSubmit={handleSubmit}
            id="product-form"
          >
            <Form.Group>
              <Form.ControlLabel>Title</Form.ControlLabel>
              <Form.Control name="title" errorMessage={errors.title} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                name="description"
                errorMessage={errors.description}
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Price</Form.ControlLabel>
              <Form.Control
                name="price"
                type="number"
                errorMessage={errors.price}
              />
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Button appearance="primary" type="submit" form="product-form">
            Create
          </Button>
          <Button appearance="subtle">Cancel</Button>
        </Card.Footer>
      </Card>
    </div>
  )
}

const wrapperStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default CreateProduct
