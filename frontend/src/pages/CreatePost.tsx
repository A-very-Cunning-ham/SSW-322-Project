import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import { CreateMealForm } from '../components/CreateMealForm';
import { useNavigate } from "react-router-dom";
//const {ObjectId} = require('mongodb');

const CreateMeal: FC<any> = (): ReactElement => {
    let navigate = useNavigate();
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
            <CreateMealForm onSubmit={async ({ mealName, description, price, date,
            startHour,startMin,startPeriod,endHour,endMin,endPeriod, capacity, address, tagNames, courses }) => {
                var startTime = new Date(date + ' ' + startHour.concat(':',startMin,' ',startPeriod)) //format: 00:00 AM
                var endTime = new Date(date + ' ' + endHour.concat(':',endMin,' ',endPeriod)) //format: 00:00 AM

                console.log("Now we make a meal!")
                console.log({
                    "mealName": mealName,
                    "description": description,
                    "price": price,
                    "date": date,
                    "startTime": startTime,
                    "endTime": endTime,
                    "capacity": capacity,
                    "address": address,
                    "tagNames": tagNames,
                    "courses": courses
                })
                let newPost = await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: mealName, //TODO make unique post title
                        startTime: startTime,
                        endTime: endTime,
                        price: price,
                        filters: tagNames,
                        capacity: capacity,
                        address: address
                    })
                })
                const postRes = await newPost.json();
                const meal = await fetch(`/api/meals/${postRes}`, {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                title: mealName,
                                course: courses,
                                description: description,
                            })
                        });
                navigate(`/viewpost/${postRes}`);
            }}
            />
        </div>
    </div>
    );
};

export default CreateMeal;