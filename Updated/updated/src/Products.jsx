import React from 'react';
import { useState,useEffect } from "react";
import './App.css';
import EditForm from "./editForm";

import axios from 'axios';
import { toast } from "react-toastify";
import { Grid, GridColumn} from "@progress/kendo-react-grid";
import { useNavigate } from "react-router-dom";
const initialDataState = {
  skip: 0,
  take: 10,
};


const Products = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [data, setData] = useState([]);
  const currentDate = new Date().toISOString();
  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    getData();
  }, []);
  
//**********  Get All Posts  *****************/

const getData = () => {
  axios
    .get("https://localhost:7206/api/Posts/GetAllPosts")
    .then((result) => {
      setData(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

///

const DeleteCell = (props) => <DeletePost {...props} remove={remove} />;
  const deleteItem = (item) => {
    let index = data.findIndex((record) => record.pId === item.pId);
    data.splice(index, 1);
    return data;
  };
  const remove = (dataItem) => {
    const newData = deleteItem(dataItem);
    setData(newData);
  };

  const DeletePost = (props) => {
    const { dataItem } = props;
    return (
      <td className="k-command-cell">
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-remove-command"
          onClick={() => {
            if (
              window.confirm("Confirm deleting: " + dataItem.title) === true
            ) {
              axios
                .delete(
                  `https://localhost:7206/api/Posts/DeletePost?id=${dataItem.pId}`,
                  { headers }
                )
                .then((result) => {
                  toast.success("Post has been Deleted");
                  getData();
                })
                .catch((error) => {
                  if (error.response.status === 401) {
                    toast.error("Session Expired!");
                    setOpenForm(false);
                    navigate("/");
                  } else {
                    toast.error(error);
                  }
                });
            }
          }}
        >
          Delete
        </button>
      </td>
    );
  };

 //Update
 //**********  Add Posts  *****************/
 const navigate = useNavigate();
 const handleSave = () => {
   const url = "https://localhost:7206/api/Posts/AddPost";
   const data = {
     title: title,
     body: body,
     isActive: isActive,
     dateTime: currentDate,
   };
   axios
     .post(url, data, { headers })
     .then((result) => {
       getData();
       clear();
       toast.success("Post has been Added");
     })
     .catch((error) => {
       if (error.response.status === 401) {
         toast.error("Session Expired!");
         setOpenForm(false);
         navigate("/");
       } else {
         toast.error(error);
       }
     });
 };
 const clear = () => {
   setTitle("");
   setBody("");
   setIsActive(0);
 };
 const handleActiveChange = (e) => {
   if (e.target.checked) {
     setIsActive(1);
   } else {
     setIsActive(0);
   }
 };
///////////////////////////////////////////////
 //**********  Update Posts  *****************/

 const handleSubmit = (event) => {
  let newData = data.map((item) => {
    if (event.pId === item.pId) {
      item = {
        ...event,
      };
    }
    return item;
  });
  const originalDateTime = data.find(
    (item) => item.pId === event.pId
  )?.dateTime;

  event.dateTime = originalDateTime;
  event.id = event.pId;
  if (event.isActive === true) {
    event.isActive = 1;
  } else {
    event.isActive = 0;
  }
  // setData(newData);

  axios
    .put(
      `https://localhost:7206/api/Posts/UpdatePost?id=${event.pId}`,
      event,
      { headers }
    )
    .then((result) => {
      setOpenForm(false);
      getData();
      clear();
      toast.success("Post has been Updated");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        setOpenForm(false);
        navigate("/");
        toast.error("Session Expired!");
      } else {
        toast.error(error);
      }
    });
};
//////////////////////////////////////
const handleCancelEdit = () => {
  setOpenForm(false);
};
const MyEditCommandCell = (props) => (
  <EditCommandCell {...props} enterEdit={enterEdit} />
);
const EditCommandCell = (props) => {
  return (
    <td className="edit-btn">
      <button
        style={{ backgroundColor: "rgb(48, 144, 247)", color: "white" }}
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Edit
      </button>
    </td>
  );
};
const [openForm, setOpenForm] = React.useState(false);
const [editItem, setEditItem] = React.useState("");
const enterEdit = (item) => {
  setOpenForm(true);
  setEditItem(item);
};



  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take = targetEvent.value === "All" ? 77 : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://localhost:7206/api/Posts/GetAllPosts");

  
    const data = await response.json();
    setProducts(data);

  };
  
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-4">
      <form class="row">
       <div class="col-md-10">
       <h2>Products</h2>
       </div>
       <div class="col-md-2 butn-p">
      <button type="submit"  class="btn btn-primary">Add New Product</button>
    </div>
    </form>
       <form class="row">
    
    <div class="col-md-4">
      <div class="form-group">
        
        <input type="text" onChange={(e) => setTitle(e.target.value)} class="form-control" id="title" value={title} placeholder="Title"/>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        
        <input type="text" onChange={(e) => setBody(e.target.value)}  class="form-control" id="body" value={body} placeholder="Body"/>
      </div>
    </div>
    <div class="col-md-1">
      <div class="form-group">
        
        <input type="checkbox" checked={isActive === 1 ? true : false} onChange={(e) => handleActiveChange(e)}
            class="form-control"  id="isActive" value={isActive} placeholder="isActive"/>
      </div>
    </div>
    
    <div class="col-md-3 butn-p">
      <button type="submit" onClick={() => handleSave()} class="btn btn-primary">Submit</button>
    </div>
    
  </form>

      <Grid
     style={{width:'100%',height:'80%',marginTop:'30px'}}
     data={products.slice(page.skip, page.take + page.skip)}
     skip={page.skip}
     take={page.take}
     total={products.length}
     pageable={{
       buttonCount: 4,
       pageSizes: [5, 10, 15, "All"],
       pageSizeValue: pageSizeValue,
     }}
     onPageChange={pageChange}
   >
    
      <GridColumn field="id" title={<strong>ID</strong>} width="40px" />
      <GridColumn field="title" title={<strong>Title</strong>} width="250px" />
      <GridColumn field="body" title={<strong>Body</strong>} />
      <GridColumn field="isActive" title={<strong>isActive</strong>} />
      <GridColumn cell={MyEditCommandCell} className="table-btn" />
        <GridColumn cell={DeleteCell} className="table-btn" />
    </Grid>
    {openForm && (
        <EditForm
          cancelEdit={handleCancelEdit}
          onSubmit={handleSubmit}
          item={editItem}
        />
      )}
    </div>
  );
};

export default Products;
// ReactDOM.render(<App />, document.querySelector("my-app"));
