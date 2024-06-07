import React from "react";
import {
  Create,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const ChallengesCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};
