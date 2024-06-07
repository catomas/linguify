import React from "react";
import {
  BooleanInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";

export const ChallengeOptionsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <TextInput source="imageSrc" label="Image Url" />
        <TextInput source="audioSrc" label="Audio url" />
        <ReferenceInput source="challengeId" reference="challenges" />
      </SimpleForm>
    </Edit>
  );
};
