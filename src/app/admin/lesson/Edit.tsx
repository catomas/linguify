import React from "react";
import {
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <NumberInput source="order" validate={[required()]} label="Order" />
        <ReferenceInput source="unitId" reference="units" />
      </SimpleForm>
    </Edit>
  );
};
