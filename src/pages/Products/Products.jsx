import { Table, Button } from 'rsuite'
import { useProductStore } from '../../store/useProductStore'

const { Column, HeaderCell, Cell } = Table

const Products = () => {
  const products = useProductStore(state => state.products)
  const removeProduct = useProductStore(state => state.removeProduct)

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h3 style={{ marginBottom: '20px' }}>Barcha mahsulotlar</h3>

      {/* Jadval to'liq kenglikda (autoHeight) va scroll-siz */}
      <Table
        autoHeight
        data={products}
        bordered
        cellBordered
        headerHeight={50}
        rowHeight={60}
        style={{ width: '100%' }} // Jadvalni to'liq yoyish
      >
        {/* ID ustuni - kichik va aniq o'lchamda */}
        <Column width={80} align="center">
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        {/* Nomi ustuni - flexGrow orqali kengayadi */}
        <Column flexGrow={1} minWidth={150}>
          <HeaderCell>Mahsulot nomi</HeaderCell>
          <Cell dataKey="title" style={{ fontWeight: 'bold' }} />
        </Column>

        {/* Tavsif ustuni - eng ko'p joyni egallaydi */}
        <Column flexGrow={2} minWidth={200}>
          <HeaderCell>Tavsif</HeaderCell>
          <Cell dataKey="description" />
        </Column>

        {/* Narx ustuni */}
        <Column width={100} align="right">
          <HeaderCell>Narxi</HeaderCell>
          <Cell>{rowData => <span>{rowData.price} $</span>}</Cell>
        </Column>

        {/* Amallar ustuni */}
        <Column width={100} align="center">
          <HeaderCell>Amallar</HeaderCell>
          <Cell>
            {rowData => (
              <Button
                appearance="link"
                color="red"
                onClick={() => removeProduct(rowData.id)}
              >
                O'chirish
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      {products.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>
          Mahsulotlar mavjud emas.
        </div>
      )}
    </div>
  )
}

export default Products
