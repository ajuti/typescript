interface Arguments {
  height: number,
  weight: number
}

const parseBmi = (args: string[]): Arguments => {
  if (args.length < 4) { throw new Error("Not enough arguments")};
  if (args.length > 4) { throw new Error("Too many arguments")};

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  if (weight === 0) { throw new Error("Weight cannot be zero.")}

  const inMeters: number = height / 100;
  const bmi: number = weight / (inMeters * inMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (18.5 <= bmi && bmi < 25.0) {
    return "Normal (healthy weight)";
  } else {
    return "Obese (overweight)";
  }
};

try {
  const { height, weight } = parseBmi(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage: string = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage)
}