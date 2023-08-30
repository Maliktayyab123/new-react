import React from "react";
import "./Login.css";
import logo from "./images/logo.png";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,   
} from "@progress/kendo-react-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Input } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import axios from "axios";

function Login() {
  const LabelUserInput = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      disabled,
      type,
      ...others
    } = fieldRenderProps;

    return (
      <FieldWrapper>
        <Label editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <Input type={type} {...others} />
      </FieldWrapper>
    );
  };
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const id = 0;
  const handleSubmit = async (dataItem) => {
    // dataItem.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7206/api/Users/Login",
        {
          id: id,
          email: dataItem.username,
          password: dataItem.password,
        }
      );

      if (response.data.isSuccess === true) {
        navigate("/home");

        const jwtToken = response.data.token;
        localStorage.setItem("jwtToken", jwtToken);
        toast.success("Login Successful");
      } else {
        toast.error("Wrong Email or password!");
      }
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };
  // const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
  return (
    <>
      <div className="login">
        <div className="form">
          <div className="login-form">
            <Form
              onSubmit={handleSubmit}
              render={(formRenderProps) => (
                <FormElement
                  style={{
                    maxWidth: 650,
                  }}
                >
                  {" "}
                  <img className="logo-image" src={logo} alt="Logo" />
                  <p className="text-login">
                    Please Enter Your Credentials to login
                  </p>
                  <fieldset className={"k-form-fieldset field "}>
                    <div className="mb-3">
                      <Field
                        name={"username"}
                        component={LabelUserInput}
                        label={"Username"}
                        type={"username"}
                        id={1}

                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        name={"password"}
                        component={LabelUserInput}
                        label={"Password"}
                        type={"password"}
                        id={2}

                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type={"submit"}
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base button"
                        disabled={!formRenderProps.allowSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </fieldset>
                </FormElement>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
