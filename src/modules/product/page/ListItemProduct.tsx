import Header from '../ListItem/Header';
import ContainerSelector from '../ListItem/ContainerSelector';
import Tables from '../ListItem/Table';

function ListItemProduct() {
  return (
    <div className="container mt-3">
      <Header />
      <ContainerSelector />
      <Tables />
    </div>
  );
}

export default ListItemProduct;
