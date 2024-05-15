import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  console.log("Hello Full Stack!");
  res.send("Hello Full Stack!");
})

app.post("/bmi", async(req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight))
    res.json({
      weight,
      height,
      bmi
    })
  }
  res.json({ error: "malformatted parameters" });
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})