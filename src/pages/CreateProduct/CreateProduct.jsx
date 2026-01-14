import React, { useState } from 'react'
import { Form, Button, Panel } from 'rsuite'
import { useProductStore } from '../../store/useProductStore'
import { useNavigate } from 'react-router-dom'

function CreateProduct() {
  const addProduct = useProductStore(state => state.addProduct)
  const navigate = useNavigate()

  // Oddiy state ma'lumotlar uchun
  const [formValue, setFormValue] = useState({
    title: '',
    description: '',
    price: '',
  })

  const handleSubmit = () => {
    // Agar maydonlar bo'sh bo'lsa, davom etmaymiz
    if (!formValue.title || !formValue.price) {
      alert('Iltimos, nom va narxni kiriting!')
      return
    }

    const newProduct = {
      id: Date.now(),
      title: formValue.title,
      description: formValue.description,
      price: formValue.price,
    }

    addProduct(newProduct)
    navigate('/products') // Ro'yxat sahifasiga o'tish
  }

  return (
    <div style={{ padding: '20px' }}>
      <Panel
        header={<h3>Yangi mahsulot</h3>}
        bordered
        style={{ maxWidth: 400, margin: 'auto', background: '#fff' }}
      >
        <Form fluid onChange={setFormValue} formValue={formValue}>
          <Form.Group>
            <Form.ControlLabel>Nomi</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Tavsif</Form.ControlLabel>
            <Form.Control name="description" rows={3} accepter="textarea" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Narxi</Form.ControlLabel>
            <Form.Control name="price" type="number" />
          </Form.Group>

          <Button appearance="primary" block onClick={handleSubmit}>
            Saqlash
          </Button>
        </Form>
      </Panel>
    </div>
  )
}

export default CreateProduct
