import React from "react";
import {
  Edit,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const ChallengesEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput
          source="type"
          choices={[
            { id: "SELECT", name: "SELECT" },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
          validate={[required()]}
        />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <NumberInput source="order" validate={[required()]} label="Order" />
        <ReferenceInput source="lessonId" reference="lessons" />
      </SimpleForm>
    </Edit>
  );
};
