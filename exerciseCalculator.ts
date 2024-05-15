interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Args {
  hours: number[],
  target: number
}

const parseExercises = (args: string[]): Args => {
  if (args.length < 4) { throw new Error("Not enough arguments")};
 
  const hours: string[] = args.slice(2, args.length - 1);
  if (!hours.every(function(value) {
    return (!isNaN(Number(value)));
  })) { throw new Error("Hours must contain all numbers") };

  const target: string = args[args.length - 1];
  if (isNaN(Number(target))) { throw new Error("Target has to be a number") };

  return {
    hours: hours.map((x) => Number(x)),
    target: Number(target)
  }
};

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length;
  const trainingDays: number = hours.filter((hour) => hour !== 0).length;
  const average: number = hours.reduce((result, current) => { return result + current }, 0) / periodLength;
  const success: boolean = average >= target;
  let rating: number;
  let ratingDescription: string;
  const delta: number = target - average;
  if (delta > 1) {
    rating = 1;
    ratingDescription = "lazy";
  } else if (1 >= delta && delta > 0) {
    rating = 2;
    ratingDescription = "alright";
  } else {
    rating = 3;
    ratingDescription = "good job";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

try {
  const { hours, target } = parseExercises(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage: string = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}