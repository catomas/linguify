import React from "react";
import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  TextField,
} from "react-admin";

export const ChallengeOptionsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="text" />
        <BooleanField source="correct" />
        <ReferenceField source="challengeId" reference="challenges" />
        <TextField source="imageSrc" />
        <TextField source="audioSrc" />
      </Datagrid>
    </List>
  );
};
