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
            <CreateMealForm onSubmit={async ({ postTitle, description, price, date,
            startHour,startMin,startPeriod,endHour,endMin,endPeriod, capacity, address, tagNames, meals }) => {
                var startTime = new Date(date + ' ' + startHour.concat(':',startMin,' ',startPeriod))   //format: 00:00 AM
                var endTime = new Date(date + ' ' + endHour.concat(':',endMin,' ',endPeriod))           //format: 00:00 AM
                
                console.log("Now we make a meal!")
                console.log({
                    "postTitle": postTitle,
                    "description": description,
                    "price": price,
                    "date": date,
                    "startTime": startTime,
                    "endTime": endTime,
                    "capacity": capacity,
                    "address": address,
                    "tagNames": tagNames,
                    "meals": meals
                })
                let newPost = await fetch("/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: postTitle, //TODO make unique post title
                        startTime: startTime,
                        endTime: endTime,
                        price: price,
                        filters: tagNames,
                        capacity: capacity,
                        address: address
                    })
                })
                const postRes = await newPost.json();

                const mealRes = await Promise.all(
                    meals.map(async (meal) => {
                      const response = await fetch(`/api/meals/${postRes}`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            course: meal.course,
                            title: meal.dishTitle,
                            description: meal.dishDesc
                        })
                    });
                      return await response.json();
                    })
                  );

                console.log(mealRes)
                navigate(`/viewpost/${postRes}`);
            }}
            />
            <Box sx={{padding: '30px'}}></Box>
        </div>
    </div>
    );
};

export default CreateMeal;