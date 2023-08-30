import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { TextBox, Checkbox } from "@progress/kendo-react-inputs";

import { Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";

import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

const TextBoxField = (fieldRenderProps) => {
  const { validationMessage, visited, label, id, valid, ...others } =
    fieldRenderProps;
  return (
    <>
      <Label
        editorId={id}
        className={"k-form-label"}
        style={{ fontSize: "20px" }}
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <TextBox {...others} />
      </div>
    </>
  );
};
const CheckBoxField = (fieldRenderProps) => {
  const { validationMessage, visited, label, id, valid, ...others } =
    fieldRenderProps;

  return (
    <>
      <Label
        editorId={id}
        className={"k-form-label"}
        style={{ fontSize: "20px" }}
      >
        {label}
      </Label>
      <div className={"k-form-field-wrap"}>
        <Checkbox
          {...others}
          checked={fieldRenderProps.value}
          style={{ height: "25px", width: "25px" }}
        />
      </div>
    </>
  );
};
const EditForm = (props) => {
  const { cancelEdit, onSubmit, item, ...other } = props;
  return (
    <Form
      initialValues={item}
      onSubmit={onSubmit}
      render={(renderProps) => (
        <Dialog
          title={"Edit Post"}
          onClose={cancelEdit}
          style={{
            maxWidth: "650px",
          }}
        >
          <FormElement>
            <FieldWrapper>
              <Field name={"title"} component={TextBoxField} label={"Title"} />
            </FieldWrapper>

            <FieldWrapper>
              <Field name={"body"} component={TextBoxField} label={"Body"} />
            </FieldWrapper>
            <FieldWrapper>
              <Field
                name={"isActive"}
                component={CheckBoxField}
                label={"Is Active"}
              />
            </FieldWrapper>
          </FormElement>
          <DialogActionsBar layout="start">
            <Button
              type={"submit"}
              themeColor={"primary"}
              disabled={!renderProps.allowSubmit}
              onClick={renderProps.onSubmit}
              icon="save"
              svgIcon={saveIcon}
            >
              Update
            </Button>
            <Button onClick={cancelEdit} icon="cancel" svgIcon={cancelIcon}>
              Cancel
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
      {...other}
    />
  );
};
export default EditForm;
