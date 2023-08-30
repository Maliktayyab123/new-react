import React from 'react';

import '../App.css';
// $primary: #53D2FA;
// import '~@progress/kendo-theme-bootstrap/dist/all.scss';

// ES2015 module syntax
import { Grid, GridColumn} from "@progress/kendo-react-grid";
import products from "../products.json";
const App = () => {
  

  return (
    <div className='App'>
      <Grid
     style={{width:"50%",}}
      data={products}
    >
      <GridColumn field="ProductID" title="ID" width="40px" />
      <GridColumn field="ProductName" title="Name" width="250px" />
      <GridColumn field="Category.CategoryName" title="CategoryName" />
      <GridColumn field="UnitPrice" title="Price" />
      <GridColumn field="UnitsInStock" title="In stock" />
    </Grid>
    </div>
  );
};

export default App;
// ReactDOM.render(<App />, document.querySelector("my-app"));
