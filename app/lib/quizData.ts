export interface Question {
    question: string;
    options?: string[]; // Only for multiple-choice questions
    answer: string | number;
    type: "MCQ" | "INTEGER"; // Question type
}

export const quizQuestions: Question[] = [
    // Multiple-Choice Questions
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars",
        type: "MCQ",
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
        type: "MCQ",
    },
    {
        question: "Which programming language is primarily used for web development?",
        options: ["C++", "Java", "Python", "JavaScript"],
        answer: "JavaScript",
        type: "MCQ",
    },
    {
        question: "What is the chemical symbol for Silver?",
        options: ["Si", "Ag", "Au", "Pb"],
        answer: "Ag",
        type: "MCQ",
    },
    {
        question: "Which gas is most abundant in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Nitrogen",
        type: "MCQ",
    },
    // Integer-Type Questions
    {
        question: "What is 25 multiplied by 4?",
        answer: 100,
        type: "INTEGER",
    },
    {
        question: "How many continents are there on Earth?",
        answer: 7,
        type: "INTEGER",
    },
    {
        question: "In which year did World War II end?",
        answer: 1945,
        type: "INTEGER",
    },
    {
        question: "What is the square root of 64?",
        answer: 8,
        type: "INTEGER",
    },
    {
        question: "If a train travels at 90 km/h for 3 hours, how many kilometers does it cover?",
        answer: 270,
        type: "INTEGER",
    },
];