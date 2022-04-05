import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";
import { CreateMealForm } from '../components/CreateMealForm';

const CreateMeal: FC<any> = (): ReactElement => {
    return (
        <div style={{textAlign: "center" }}>
        <CreateMealForm onSubmit={( {mealName, description,price,startTime,endTime,comments}) => {
            console.log(mealName, description,price,startTime,endTime,comments);
          }}
          />
      </div>
    );
};

export default CreateMeal;