import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import { CreateMealForm } from '../components/CreateMealForm';
//const {ObjectId} = require('mongodb');

const CreateMeal: FC<any> = (): ReactElement => {
    return (        
        <div style={{textAlign: "center" }}>
            <div style={{textAlign: "center" }}>
                <Box sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px'
                }}>
                    <Typography variant="h3">Meal Creation</Typography>
                </Box>
            </div>
        <div style={{ textAlign: "center" }}>
            <CreateMealForm onSubmit={({ mealName, description, price, startTime, endTime, capacity, address, tagNames, courses }) => {
                console.log("Now we make a meal!")
                console.log({
                    "mealName": mealName,
                    "description": description,
                    "price": price,
                    "startTime": startTime,
                    "endTime": endTime,
                    "capacity": capacity,
                    "address": address,
                    "tagNames": tagNames,
                    "courses": courses
                })
                let newPost = fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        startTime: startTime,
                        endTime: endTime,
                        capacity: capacity,
                        address: address
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        fetch(`/api/meals/${data}`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                title: mealName,
                                course: courses,
                                price: price,
                                description: description,
                                filters: tagNames,
                            })
                        })
                    });
            }}
            />
        </div>
    </div>
    );
};

export default CreateMeal;