import { Table, Button, useToaster, Message, IconButton, Stack } from 'rsuite';
import useProduct from '../../store/useStore';
import TrashIcon from '@rsuite/icons/Trash';

const { Column, HeaderCell, Cell } = Table;

const Products = () => {
  const products = useProduct(state => state.products);
  const removeProduct = useProduct(state => state.removeProduct);
  const toaster = useToaster();

  const handleDelete = id => {
    removeProduct(id);
    toaster.push(
      <Message showIcon type="info" closable>Mahsulot ochirildi</Message>,
      { placement: 'topEnd' }
    );
  };

  if (products.length === 0) {
    return (
      <div style={emptyCenterStyle}>
        <Stack direction="column" alignItems="center" spacing={20}>
          <Message type="info" showIcon style={{ fontSize: 18, padding: '20px 40px' }}>
            Hozircha mahsulotlar yo‘q.
          </Message>
        </Stack>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: 25, fontWeight: 'bold' }}>Mahsulotlar Ro'yxati</h2>
      
      <Table
        autoHeight
        data={products}
        bordered
        cellBordered
        headerHeight={50}
        rowHeight={60}
        hover
        style={{ width: '100%', borderRadius: 10 }}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell>{(rowData, rowIndex) => rowIndex + 1}</Cell>
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Mahsulot nomi</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column flexGrow={3}>
          <HeaderCell>Tavsif</HeaderCell>
          <Cell dataKey="description" />
        </Column>

        <Column width={150} align="right">
          <HeaderCell>Narxi</HeaderCell>
          <Cell>{rowData => <b style={{ color: '#2980b9' }}>{rowData.price} $</b>}</Cell>
        </Column>

        <Column width={100} align="center" fixed="right">
          <HeaderCell>Amallar</HeaderCell>
          <Cell>
            {rowData => (
              <IconButton
                size="sm"
                appearance="subtle"
                color="red"
                icon={<TrashIcon />}
                onClick={() => handleDelete(rowData.id)}
              />
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};


const emptyCenterStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',     
  height: '80vh',           
  width: '100%'
};

const containerStyle = {
  padding: '40px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  overflowX: 'hidden'
};

export default Products;