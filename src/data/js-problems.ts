export type Difficulty = 'easy' | 'medium' | 'hard'

export type JSProblemCategory =
  | 'Basic'
  | 'Strings'
  | 'Arrays'
  | 'Higher-Order Functions'
  | 'Recursion'
  | 'Hash Tables'
  | 'Data Structures'
  | 'Sorting'
  | 'Trees'

export interface TestCase {
  input: unknown[]
  expected: unknown
  description: string
  tolerance?: number
}

export interface JSProblem {
  id: string
  title: string
  difficulty: Difficulty
  category: JSProblemCategory
  tags: string[]
  description: string
  examples: Array<{ input: string; output: string; explanation?: string }>
  starterCode: string
  testCases: TestCase[]
  hints?: string[]
  functionName: string
  problemType?: 'function' | 'class'
}

export const jsProblems: JSProblem[] = [
  // ─── EASY ────────────────────────────────────────────────────────────────
  {
    id: 'hello-world',
    title: 'Hello World',
    difficulty: 'easy',
    category: 'Basic',
    tags: ['strings', 'functions'],
    description:
      'Write a function called `helloWorld` that returns the string "Hello World!".',
    examples: [{ input: 'helloWorld()', output: '"Hello World!"' }],
    starterCode: `function helloWorld() {\n  // Return the string 'Hello World!'\n}`,
    testCases: [{ input: [], expected: 'Hello World!', description: 'returns Hello World!' }],
    hints: ['Just return the string literal "Hello World!" from the function.'],
    functionName: 'helloWorld',
  },
  {
    id: 'get-sum',
    title: 'Get Sum',
    difficulty: 'easy',
    category: 'Basic',
    tags: ['math', 'functions'],
    description:
      'Write a function called `getSum` that takes in two numbers and returns their sum.',
    examples: [
      { input: 'getSum(5, 7)', output: '12' },
      { input: 'getSum(-1, 3)', output: '2' },
    ],
    starterCode: `function getSum(num1, num2) {\n  \n}`,
    testCases: [
      { input: [5, 7], expected: 12, description: 'positive numbers' },
      { input: [-1, 3], expected: 2, description: 'negative + positive' },
      { input: [0, 0], expected: 0, description: 'both zero' },
    ],
    functionName: 'getSum',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    difficulty: 'easy',
    category: 'Basic',
    tags: ['math', 'conditionals', 'switch'],
    description:
      'Write a function called `calculator` that takes in 2 numbers and an operator (+, -, *, /) and returns the result of the calculation.\n\nThe function must throw an error if an invalid operator is given.',
    examples: [
      { input: "calculator(1, 2, '+')", output: '3' },
      { input: "calculator(10, 5, '-')", output: '5' },
      { input: "calculator(2, 2, '*')", output: '4' },
      { input: "calculator(10, 5, '/')", output: '2' },
    ],
    starterCode: `function calculator(num1, num2, operator) {\n  \n}`,
    testCases: [
      { input: [5, 7, '+'], expected: 12, description: 'addition' },
      { input: [5, 7, '-'], expected: -2, description: 'subtraction' },
      { input: [5, 7, '*'], expected: 35, description: 'multiplication' },
      { input: [10, 5, '/'], expected: 2, description: 'division' },
    ],
    hints: ['Use a switch statement or if/else to handle each operator.'],
    functionName: 'calculator',
  },
  {
    id: 'count-occurrences',
    title: 'Count Occurrences',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'loops'],
    description:
      'Write a function called `countOccurrences` that takes in a string and a character, and returns the number of times that character appears in the string.',
    examples: [
      { input: "countOccurrences('hello', 'l')", output: '2' },
      { input: "countOccurrences('banana', 'a')", output: '3' },
    ],
    starterCode: `function countOccurrences(str, char) {\n  \n}`,
    testCases: [
      { input: ['hello', 'l'], expected: 2, description: "count 'l' in 'hello'" },
      { input: ['programming', 'm'], expected: 2, description: "count 'm' in 'programming'" },
      { input: ['banana', 'a'], expected: 3, description: "count 'a' in 'banana'" },
    ],
    hints: ['You can use a for loop or the filter method on the split string.'],
    functionName: 'countOccurrences',
  },
  {
    id: 'find-max-number',
    title: 'Find Max Number',
    difficulty: 'easy',
    category: 'Arrays',
    tags: ['arrays', 'math'],
    description:
      'Write a function called `findMaxNumber` that takes in an array of numbers and returns the largest number in the array.',
    examples: [
      { input: 'findMaxNumber([1, 5, 3, 9, 2])', output: '9' },
      { input: 'findMaxNumber([0, -1, -5, 2])', output: '2' },
    ],
    starterCode: `function findMaxNumber(arr) {\n  \n}`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, description: 'positive numbers' },
      { input: [[0, -1, -5, 2]], expected: 2, description: 'includes negatives' },
      { input: [[10, 10, 10]], expected: 10, description: 'all same value' },
    ],
    hints: ['Try using Math.max() with the spread operator, or reduce the array.'],
    functionName: 'findMaxNumber',
  },
  {
    id: 'title-case',
    title: 'Title Case',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'map', 'split'],
    description:
      'Write a function called `titleCase` that takes in a string and returns a new string where the first letter of each word is capitalized.',
    examples: [
      { input: "titleCase('hello world')", output: '"Hello World"' },
      { input: "titleCase('javascript programming')", output: '"Javascript Programming"' },
    ],
    starterCode: `function titleCase(str) {\n  \n}`,
    testCases: [
      { input: ['hello world'], expected: 'Hello World', description: 'two words' },
      { input: ['javascript programming'], expected: 'Javascript Programming', description: 'two words' },
      { input: ['openai chatbot'], expected: 'Openai Chatbot', description: 'two words' },
    ],
    hints: [
      'Split the string into words, then capitalize the first letter of each word.',
      "Use slice(0, 1).toUpperCase() + slice(1) to capitalize a word.",
    ],
    functionName: 'titleCase',
  },
  {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'arrays'],
    description:
      'Write a function called `reverseString` that takes in a string and returns it reversed.',
    examples: [
      { input: "reverseString('Hello')", output: '"olleH"' },
      { input: "reverseString('JavaScript')", output: '"tpircSavaJ"' },
    ],
    starterCode: `function reverseString(str) {\n  \n}`,
    testCases: [
      { input: ['Hello'], expected: 'olleH', description: 'reverses a word' },
      { input: ['JavaScript'], expected: 'tpircSavaJ', description: 'reverses mixed case' },
      { input: ['12345'], expected: '54321', description: 'reverses numbers string' },
    ],
    hints: ['Try splitting the string into an array, reversing it, then joining back.'],
    functionName: 'reverseString',
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'regex'],
    description:
      'Write a function called `isPalindrome` that takes in a string and returns `true` if the string is a palindrome and `false` if it is not.\n\nA palindrome reads the same forwards and backwards. Ignore spaces and punctuation, and treat the string as case-insensitive.',
    examples: [
      { input: "isPalindrome('racecar')", output: 'true' },
      { input: "isPalindrome('Hello')", output: 'false' },
      { input: "isPalindrome('A man, a plan, a canal, Panama')", output: 'true' },
    ],
    starterCode: `function isPalindrome(str) {\n  \n}`,
    testCases: [
      { input: ['racecar'], expected: true, description: 'simple palindrome' },
      { input: ['Hello'], expected: false, description: 'not a palindrome' },
      { input: ['A man, a plan, a canal, Panama'], expected: true, description: 'ignores spaces and punctuation' },
      { input: ['12321'], expected: true, description: 'numeric palindrome' },
    ],
    hints: [
      'Lowercase the string and remove non-alphanumeric characters first.',
      'Use /[^a-z0-9]/g as the regex pattern to remove non-alphanumeric chars.',
    ],
    functionName: 'isPalindrome',
  },
  {
    id: 'fizzbuzz-array',
    title: 'FizzBuzz Array',
    difficulty: 'easy',
    category: 'Arrays',
    tags: ['arrays', 'loops', 'conditionals'],
    description:
      'Write a function called `fizzBuzzArray` that takes a number `n` and returns an array of values from 1 to n where:\n- Multiples of 3 are replaced with "Fizz"\n- Multiples of 5 are replaced with "Buzz"\n- Multiples of both 3 and 5 are replaced with "FizzBuzz"\n- Everything else is the number itself',
    examples: [
      {
        input: 'fizzBuzzArray(5)',
        output: '[1, 2, "Fizz", 4, "Buzz"]',
      },
    ],
    starterCode: `function fizzBuzzArray(n) {\n  \n}`,
    testCases: [
      {
        input: [15],
        expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'],
        description: 'first 15 values',
      },
      {
        input: [5],
        expected: [1, 2, 'Fizz', 4, 'Buzz'],
        description: 'first 5 values',
      },
    ],
    hints: ['Check divisibility by 15 first (FizzBuzz), then 3, then 5.'],
    functionName: 'fizzBuzzArray',
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'regex', 'filter'],
    description:
      'Write a function called `countVowels` that takes in a string and returns the number of vowels (a, e, i, o, u) in the string. The check should be case-insensitive.',
    examples: [
      { input: "countVowels('Hello, World!')", output: '3' },
      { input: "countVowels('JavaScript')", output: '3' },
    ],
    starterCode: `function countVowels(str) {\n  \n}`,
    testCases: [
      { input: ['Hello, World!'], expected: 3, description: 'Hello World' },
      { input: ['JavaScript'], expected: 3, description: 'JavaScript' },
      { input: ['OpenAI Chatbot'], expected: 6, description: 'OpenAI Chatbot' },
      { input: ['Coding Challenge'], expected: 5, description: 'Coding Challenge' },
    ],
    hints: ['Use a regex match or filter on an array of vowels.'],
    functionName: 'countVowels',
  },
  {
    id: 'find-missing-number',
    title: 'Find Missing Number',
    difficulty: 'easy',
    category: 'Arrays',
    tags: ['arrays', 'math'],
    description:
      'Write a function called `findMissingNumber` that takes in an unsorted array of unique integers and returns the one missing number from the sequence.\n\nThe array contains numbers from 1 to n with exactly one number missing.',
    examples: [
      { input: 'findMissingNumber([1, 2, 3, 5])', output: '4' },
      { input: 'findMissingNumber([10, 8, 6, 7, 5, 4, 2, 3, 1])', output: '9' },
    ],
    starterCode: `function findMissingNumber(arr) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3, 5]], expected: 4, description: 'missing 4' },
      { input: [[10, 8, 6, 7, 5, 4, 2, 3, 1]], expected: 9, description: 'missing 9, unsorted' },
      { input: [[1, 3, 4, 5, 6]], expected: 2, description: 'missing 2' },
    ],
    hints: [
      'The sum of 1 to n is n*(n+1)/2. Subtract the actual sum of the array to find the missing number.',
    ],
    functionName: 'findMissingNumber',
  },
  {
    id: 'display-likes',
    title: 'Display Likes',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'arrays', 'conditionals'],
    description:
      'Write a function called `displayLikes` that takes in an array of names and returns a string showing who likes a post.\n\n- 0 names: "no one likes this"\n- 1 name: "{name} likes this"\n- 2 names: "{name1} and {name2} like this"\n- 3 names: "{name1}, {name2} and {name3} like this"\n- 4+ names: "{name1}, {name2} and {x} others like this"',
    examples: [
      { input: 'displayLikes([])', output: '"no one likes this"' },
      { input: "displayLikes(['Peter'])", output: '"Peter likes this"' },
      { input: "displayLikes(['Jacob', 'Alex'])", output: '"Jacob and Alex like this"' },
      { input: "displayLikes(['Alex', 'Jacob', 'Mark', 'Max'])", output: '"Alex, Jacob and 2 others like this"' },
    ],
    starterCode: `function displayLikes(names) {\n  \n}`,
    testCases: [
      { input: [[]], expected: 'no one likes this', description: 'empty array' },
      { input: [['Peter']], expected: 'Peter likes this', description: '1 person' },
      { input: [['Jacob', 'Alex']], expected: 'Jacob and Alex like this', description: '2 people' },
      { input: [['Max', 'John', 'Mark']], expected: 'Max, John and Mark like this', description: '3 people' },
      { input: [['Alex', 'Jacob', 'Mark', 'Max']], expected: 'Alex, Jacob and 2 others like this', description: '4 people' },
      { input: [['Alex', 'Jacob', 'Mark', 'Max', 'Jill']], expected: 'Alex, Jacob and 3 others like this', description: '5 people' },
    ],
    functionName: 'displayLikes',
  },

  // ─── MEDIUM ───────────────────────────────────────────────────────────────
  {
    id: 'first-non-repeating-char',
    title: 'First Non-Repeating Character',
    difficulty: 'medium',
    category: 'Strings',
    tags: ['strings', 'hash map', 'frequency'],
    description:
      'Write a function called `findFirstNonRepeatingCharacter` that takes in a string and returns the first character that does not repeat. If there is no non-repeating character, return `null`.',
    examples: [
      { input: "findFirstNonRepeatingCharacter('aabccdeff')", output: '"b"' },
      { input: "findFirstNonRepeatingCharacter('aabbcc')", output: 'null' },
      { input: "findFirstNonRepeatingCharacter('hello world')", output: '"h"' },
    ],
    starterCode: `function findFirstNonRepeatingCharacter(str) {\n  \n}`,
    testCases: [
      { input: ['aabccdeff'], expected: 'b', description: 'first non-repeating is b' },
      { input: ['aabbcc'], expected: null, description: 'no non-repeating char' },
      { input: ['hello world'], expected: 'h', description: 'first non-repeating is h' },
    ],
    hints: [
      'Use a frequency map (object or Map) to count each character.',
      'Then loop through the string again to find the first character with a count of 1.',
    ],
    functionName: 'findFirstNonRepeatingCharacter',
  },
  {
    id: 'sum-of-even-squares',
    title: 'Sum of Even Squares',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['arrays', 'filter', 'map', 'reduce'],
    description:
      'Write a function called `sumOfEvenSquares` that takes in an array of numbers and returns the sum of the squares of all even numbers in the array.',
    examples: [
      { input: 'sumOfEvenSquares([1, 2, 3, 4, 5])', output: '20', explanation: '2² + 4² = 4 + 16 = 20' },
      { input: 'sumOfEvenSquares([])', output: '0' },
    ],
    starterCode: `function sumOfEvenSquares(arr) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: 20, description: '2² + 4² = 20' },
      { input: [[-1, 0, 1, 2, 3, 4]], expected: 20, description: 'includes 0 and negatives' },
      { input: [[]], expected: 0, description: 'empty array' },
    ],
    hints: ['Chain filter (keep evens), map (square each), and reduce (sum).'],
    functionName: 'sumOfEvenSquares',
  },
  {
    id: 'highest-scoring-word',
    title: 'Highest Scoring Word',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['strings', 'map', 'reduce', 'charCodeAt'],
    description:
      'Write a function called `highestScoringWord` that takes in a string and returns the word with the highest score. The score of a word is the sum of the ASCII values of its letters (a=1, b=2, ..., z=26).',
    examples: [
      { input: "highestScoringWord('hello my name is xavier')", output: '"xavier"' },
      { input: "highestScoringWord('take me to semynak')", output: '"semynak"' },
    ],
    starterCode: `function highestScoringWord(str) {\n  \n}`,
    testCases: [
      { input: ['hello my name is xavier'], expected: 'xavier', description: 'xavier scores highest' },
      { input: ['what time are we climbing up the volcano'], expected: 'volcano', description: 'volcano scores highest' },
      { input: ['take me to semynak'], expected: 'semynak', description: 'semynak scores highest' },
    ],
    hints: [
      'Use charCodeAt(0) - 96 to get the value of a lowercase letter (a=1, b=2, ...).',
      'Split into words, score each word, then find the max.',
    ],
    functionName: 'highestScoringWord',
  },
  {
    id: 'valid-anagrams',
    title: 'Valid Anagrams',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['strings', 'sort', 'frequency'],
    description:
      'Write a function called `validAnagrams` that takes in two strings and returns `true` if they are valid anagrams of each other, and `false` otherwise.\n\nTwo strings are anagrams if they contain the same characters in the same frequencies.',
    examples: [
      { input: "validAnagrams('listen', 'silent')", output: 'true' },
      { input: "validAnagrams('hello', 'world')", output: 'false' },
      { input: "validAnagrams('astronomer', 'moonstarer')", output: 'true' },
    ],
    starterCode: `function validAnagrams(str1, str2) {\n  \n}`,
    testCases: [
      { input: ['listen', 'silent'], expected: true, description: 'anagrams' },
      { input: ['hello', 'world'], expected: false, description: 'not anagrams' },
      { input: ['astronomer', 'moonstarer'], expected: true, description: 'longer anagrams' },
      { input: ['apple', 'banana'], expected: false, description: 'different lengths' },
      { input: ['aaa', 'aaab'], expected: false, description: 'different frequency' },
    ],
    hints: [
      'One approach: sort both strings and compare.',
      'Another approach: build a frequency map for each string and compare the maps.',
    ],
    functionName: 'validAnagrams',
  },
  {
    id: 'password-validator',
    title: 'Password Validator',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['strings', 'regex', 'validation'],
    description:
      'Write a function called `validatePassword` that takes in a password string and returns `true` if it is valid, `false` otherwise.\n\nA valid password must:\n- Be at least 8 characters long\n- Contain at least one uppercase letter\n- Contain at least one lowercase letter\n- Contain at least one number',
    examples: [
      { input: "validatePassword('Abc12345')", output: 'true' },
      { input: "validatePassword('password123')", output: 'false', explanation: 'no uppercase' },
      { input: "validatePassword('Pass')", output: 'false', explanation: 'too short' },
    ],
    starterCode: `function validatePassword(password) {\n  \n}`,
    testCases: [
      { input: ['Abc12345'], expected: true, description: 'valid password' },
      { input: ['password123'], expected: false, description: 'no uppercase letter' },
      { input: ['Pass'], expected: false, description: 'too short' },
      { input: ['HelloWorld'], expected: false, description: 'no number' },
    ],
    hints: [
      'Check the length with .length.',
      'Use /[A-Z]/.test(password) to check for uppercase, /[a-z]/ for lowercase, /[0-9]/ for numbers.',
    ],
    functionName: 'validatePassword',
  },
  {
    id: 'fibonacci-sequence',
    title: 'Fibonacci Sequence',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'math'],
    description:
      'Write a function called `fibonacci` that takes in a number `n` and returns the nth number in the Fibonacci sequence.\n\nThe Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...\nFormula: F(n) = F(n-1) + F(n-2), with F(0)=0 and F(1)=1.',
    examples: [
      { input: 'fibonacci(0)', output: '0' },
      { input: 'fibonacci(5)', output: '5' },
      { input: 'fibonacci(7)', output: '13' },
    ],
    starterCode: `function fibonacci(n) {\n  // Return the nth Fibonacci number\n}`,
    testCases: [
      { input: [0], expected: 0, description: 'F(0) = 0' },
      { input: [1], expected: 1, description: 'F(1) = 1' },
      { input: [3], expected: 2, description: 'F(3) = 2' },
      { input: [5], expected: 5, description: 'F(5) = 5' },
      { input: [7], expected: 13, description: 'F(7) = 13' },
    ],
    hints: [
      'Base cases: if n === 0 return 0, if n === 1 return 1.',
      'Recursive case: return fibonacci(n-1) + fibonacci(n-2).',
    ],
    functionName: 'fibonacci',
  },
  {
    id: 'reverse-string-recursive',
    title: 'Reverse String (Recursive)',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'strings'],
    description:
      'Write a function called `reverseString` that takes in a string and returns it reversed — but this time using recursion.\n\nDo not use the built-in .reverse() method.',
    examples: [
      { input: "reverseString('Hello')", output: '"olleH"' },
      { input: "reverseString('JavaScript')", output: '"tpircSavaJ"' },
    ],
    starterCode: `function reverseString(str) {\n  // Use recursion — no .reverse() allowed!\n}`,
    testCases: [
      { input: ['Hello'], expected: 'olleH', description: 'reverses a word' },
      { input: ['JavaScript'], expected: 'tpircSavaJ', description: 'reverses mixed case' },
      { input: ['12345'], expected: '54321', description: 'reverses digits' },
    ],
    hints: [
      'Base case: an empty string or single character is already reversed.',
      'Recursive case: return reverseString(str.slice(1)) + str[0].',
    ],
    functionName: 'reverseString',
  },
  {
    id: 'flatten-array',
    title: 'Flatten Array',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'arrays'],
    description:
      'Write a function called `flattenArray` that takes in a nested array of any depth and returns a new flat array with all values.',
    examples: [
      { input: 'flattenArray([1, [2, 3], [4, 5, [6]]])', output: '[1, 2, 3, 4, 5, 6]' },
      { input: 'flattenArray([1, [2, [3, [4, [5]]]]])', output: '[1, 2, 3, 4, 5]' },
    ],
    starterCode: `function flattenArray(arr) {\n  \n}`,
    testCases: [
      { input: [[1, [2, 3], [4, 5, [6]]]], expected: [1, 2, 3, 4, 5, 6], description: 'two levels deep' },
      { input: [[[1, 2], [3, [4, 5]], [6, [7]]]], expected: [1, 2, 3, 4, 5, 6, 7], description: 'various nesting' },
      { input: [[1, [2, [3, [4, [5]]]]]], expected: [1, 2, 3, 4, 5], description: 'deeply nested' },
    ],
    hints: [
      'Recursively check each element: if it is an array, flatten it; otherwise push it to the result.',
      'Array.isArray(item) can tell you if an element is an array.',
    ],
    functionName: 'flattenArray',
  },
  {
    id: 'word-frequency-counter',
    title: 'Word Frequency Counter',
    difficulty: 'medium',
    category: 'Hash Tables',
    tags: ['Map', 'strings', 'frequency'],
    description:
      'Write a function called `wordFrequencyCounter` that takes in a string and returns a Map where each key is a word and the value is how many times it appears.\n\nIgnore case (convert to lowercase) and strip punctuation.',
    examples: [
      {
        input: 'wordFrequencyCounter("the cat sat")',
        output: 'Map { "the" => 1, "cat" => 1, "sat" => 1 }',
      },
    ],
    starterCode: `function wordFrequencyCounter(str) {\n  \n}`,
    testCases: [
      {
        input: ['The quick brown fox jumps over the lazy dog. The dog barks, and the fox runs away.'],
        expected: new Map([
          ['the', 4], ['quick', 1], ['brown', 1], ['fox', 2], ['jumps', 1],
          ['over', 1], ['lazy', 1], ['dog', 2], ['barks', 1], ['and', 1],
          ['runs', 1], ['away', 1],
        ]),
        description: 'counts word frequencies',
      },
      {
        input: [''],
        expected: new Map(),
        description: 'empty string returns empty map',
      },
      {
        input: ['hello'],
        expected: new Map([['hello', 1]]),
        description: 'single word',
      },
    ],
    hints: [
      'Use str.toLowerCase() and split with /\\W+/ to get words.',
      'Store frequencies in a new Map().',
    ],
    functionName: 'wordFrequencyCounter',
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'medium',
    category: 'Hash Tables',
    tags: ['arrays', 'hash map', 'indices'],
    description:
      'Write a function called `twoSum` that takes an array of numbers and a target number, and returns the indices of the two numbers that add up to the target.\n\nReturn the indices in ascending order. You may assume exactly one solution exists.',
    examples: [
      { input: 'twoSum([2, 7, 11, 15], 9)', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'twoSum([3, 2, 4], 6)', output: '[1, 2]' },
    ],
    starterCode: `function twoSum(nums, target) {\n  // Return [index1, index2] in ascending order\n}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'first two elements' },
      { input: [[3, 2, 4], 6], expected: [1, 2], description: 'middle elements' },
      { input: [[3, 3], 6], expected: [0, 1], description: 'duplicate values' },
    ],
    hints: [
      'Use a Map to store each number and its index as you iterate.',
      'For each number, check if (target - number) is already in the Map.',
    ],
    functionName: 'twoSum',
  },
  {
    id: 'anagram-grouping',
    title: 'Anagram Grouping',
    difficulty: 'medium',
    category: 'Hash Tables',
    tags: ['arrays', 'hash map', 'sort', 'strings'],
    description:
      'Write a function called `anagramGrouping` that takes an array of strings and groups anagrams together. Return an array of groups (each group is an array), maintaining the original order within each group.',
    examples: [
      {
        input: "anagramGrouping(['cat', 'act', 'dog', 'god', 'tac'])",
        output: "[['cat', 'act', 'tac'], ['dog', 'god']]",
      },
    ],
    starterCode: `function anagramGrouping(words) {\n  \n}`,
    testCases: [
      {
        input: [['cat', 'act', 'dog', 'god', 'tac']],
        expected: [['cat', 'act', 'tac'], ['dog', 'god']],
        description: 'groups cat/act/tac and dog/god',
      },
      {
        input: [['listen', 'silent', 'enlist', 'hello', 'world']],
        expected: [['listen', 'silent', 'enlist'], ['hello'], ['world']],
        description: 'groups listen anagrams, solo hello and world',
      },
    ],
    hints: [
      'Sort each word alphabetically to get its "key" (anagrams share the same sorted form).',
      'Use a Map to group words by their sorted key.',
    ],
    functionName: 'anagramGrouping',
  },

  // ─── HARD ─────────────────────────────────────────────────────────────────
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    difficulty: 'hard',
    category: 'Sorting',
    tags: ['sorting', 'arrays', 'algorithms'],
    description:
      'Implement a function called `bubbleSort` that takes an array of numbers and returns it sorted in ascending order using the Bubble Sort algorithm.\n\nBubble Sort works by repeatedly stepping through the list, comparing each pair of adjacent items, and swapping them if they are in the wrong order.',
    examples: [
      { input: 'bubbleSort([5, 4, 3, 2, 1])', output: '[1, 2, 3, 4, 5]' },
      { input: 'bubbleSort([64, 34, 25, 12, 22, 11, 90])', output: '[11, 12, 22, 25, 34, 64, 90]' },
    ],
    starterCode: `function bubbleSort(arr) {\n  \n}`,
    testCases: [
      { input: [[5, 2, 8, 1, 3]], expected: [1, 2, 3, 5, 8], description: 'unsorted array' },
      { input: [[4, 1, 3, 4, 2, 2]], expected: [1, 2, 2, 3, 4, 4], description: 'array with duplicates' },
      { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'already sorted' },
      { input: [[42]], expected: [42], description: 'single element' },
      { input: [[]], expected: [], description: 'empty array' },
    ],
    hints: [
      'Use nested loops: outer loop for passes, inner loop for comparisons.',
      'If arr[j] > arr[j+1], swap them.',
      'Optimization: stop early if no swaps occur in a full pass.',
    ],
    functionName: 'bubbleSort',
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    difficulty: 'hard',
    category: 'Sorting',
    tags: ['sorting', 'recursion', 'divide and conquer'],
    description:
      'Implement a function called `mergeSort` that takes an array of numbers and returns it sorted in ascending order using the Merge Sort algorithm.\n\nMerge Sort works by dividing the array in half, recursively sorting each half, then merging the sorted halves back together.',
    examples: [
      { input: 'mergeSort([5, 2, 8, 1, 3])', output: '[1, 2, 3, 5, 8]' },
    ],
    starterCode: `function mergeSort(arr) {\n  // Divide, sort recursively, then merge\n}`,
    testCases: [
      { input: [[5, 2, 8, 1, 3]], expected: [1, 2, 3, 5, 8], description: 'unsorted array' },
      { input: [[4, 1, 3, 4, 2, 2]], expected: [1, 2, 2, 3, 4, 4], description: 'array with duplicates' },
      { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'already sorted' },
      { input: [[42]], expected: [42], description: 'single element' },
      { input: [[]], expected: [], description: 'empty array' },
    ],
    hints: [
      'Base case: if array length <= 1, return the array as-is.',
      'Split at the midpoint, recursively call mergeSort on each half.',
      'Write a separate merge(left, right) helper that combines two sorted arrays.',
    ],
    functionName: 'mergeSort',
  },
  {
    id: 'stack-implementation',
    title: 'Stack Implementation',
    difficulty: 'hard',
    category: 'Data Structures',
    tags: ['class', 'stack', 'LIFO', 'data structures'],
    description:
      'Implement a `Stack` class with the following:\n\n**Constructor:**\n- `this.maxSize = 100`\n- `this.stack = []`\n- `this.top = -1`\n\n**Methods:**\n- `push(value)` — add element to top, return `true` (or `false` if full)\n- `pop()` — remove and return top element (or `null` if empty)\n- `peek()` — return top element without removing (or `null` if empty)\n- `isEmpty()` — return `true` if stack is empty\n- `isFull()` — return `true` if stack has reached maxSize',
    examples: [
      { input: 'const s = new Stack(); s.push(1); s.peek()', output: '1' },
      { input: 's.push(2); s.pop()', output: '2' },
    ],
    starterCode: `class Stack {\n  constructor() {\n    this.maxSize = 100;\n    this.stack = [];\n    this.top = -1;\n  }\n\n  push(value) {\n    \n  }\n\n  pop() {\n    \n  }\n\n  peek() {\n    \n  }\n\n  isEmpty() {\n    \n  }\n\n  isFull() {\n    \n  }\n}`,
    testCases: [
      {
        input: [['isEmpty', []]],
        expected: true,
        description: 'new stack is empty',
      },
      {
        input: [['push', [1]], ['peek', []]],
        expected: 1,
        description: 'peek after push',
      },
      {
        input: [['push', [1]], ['push', [2]], ['pop', []]],
        expected: 2,
        description: 'pop returns top element',
      },
      {
        input: [['push', [1]], ['pop', []], ['isEmpty', []]],
        expected: true,
        description: 'isEmpty after push then pop',
      },
      {
        input: [['push', [1]], ['isEmpty', []]],
        expected: false,
        description: 'not empty after push',
      },
    ],
    hints: [
      'Use this.stack and this.top to track elements.',
      'push: increment this.top, set this.stack[this.top] = value.',
      'pop: save this.stack[this.top], decrement this.top, return saved value.',
    ],
    functionName: 'Stack',
    problemType: 'class',
  },

  // ─── EASY (additional) ────────────────────────────────────────────────────
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates',
    difficulty: 'easy',
    category: 'Arrays',
    tags: ['arrays', 'Set'],
    description:
      'Write a function called `removeDuplicates` that takes in an array and returns a new array with all duplicate values removed, preserving the original order.',
    examples: [
      { input: 'removeDuplicates([1, 2, 3, 2, 4, 1, 5])', output: '[1, 2, 3, 4, 5]' },
      { input: "removeDuplicates(['apple', 'banana', 'orange', 'banana'])", output: "['apple', 'banana', 'orange']" },
    ],
    starterCode: `function removeDuplicates(arr) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3, 2, 4, 1, 5]], expected: [1, 2, 3, 4, 5], description: 'removes numeric duplicates' },
      { input: [['apple', 'banana', 'orange', 'banana', 'kiwi']], expected: ['apple', 'banana', 'orange', 'kiwi'], description: 'removes string duplicates' },
      { input: [[true, true, false, true, false]], expected: [true, false], description: 'removes boolean duplicates' },
    ],
    hints: ['A Set automatically removes duplicates. Spread it back into an array.'],
    functionName: 'removeDuplicates',
  },
  {
    id: 'array-intersection',
    title: 'Array Intersection',
    difficulty: 'easy',
    category: 'Arrays',
    tags: ['arrays', 'filter', 'Set'],
    description:
      'Write a function called `arrayIntersection` that takes in two arrays and returns a new array containing only the elements that appear in both arrays.',
    examples: [
      { input: 'arrayIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])', output: '[3, 4, 5]' },
      { input: 'arrayIntersection([1, 2, 3], [4, 5, 6])', output: '[]' },
    ],
    starterCode: `function arrayIntersection(arr1, arr2) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5], [3, 4, 5, 6, 7]], expected: [3, 4, 5], description: 'overlapping numbers' },
      { input: [[10, 20, 30], [30, 40, 50]], expected: [30], description: 'one common element' },
      { input: [[1, 2, 3], [4, 5, 6]], expected: [], description: 'no common elements' },
    ],
    hints: ['Convert one array to a Set, then filter the other array by membership.'],
    functionName: 'arrayIntersection',
  },
  {
    id: 'format-phone-number',
    title: 'Format Phone Number',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'arrays', 'formatting'],
    description:
      'Write a function called `formatPhoneNumber` that takes an array of 10 digits and returns a formatted phone number string in the format "(XXX) XXX-XXXX".',
    examples: [
      { input: 'formatPhoneNumber([1,2,3,4,5,6,7,8,9,0])', output: '"(123) 456-7890"' },
    ],
    starterCode: `function formatPhoneNumber(numbers) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]], expected: '(123) 456-7890', description: 'formats 10 digits' },
      { input: [[5, 0, 2, 4, 8, 1, 9, 6, 3, 7]], expected: '(502) 481-9637', description: 'different digits' },
      { input: [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9]], expected: '(999) 999-9999', description: 'all nines' },
    ],
    hints: ['Slice the array into groups of 3, 3, and 4, then join them with the format string.'],
    functionName: 'formatPhoneNumber',
  },

  // ─── MEDIUM (additional) ─────────────────────────────────────────────────
  {
    id: 'calculate-total-sales',
    title: 'Calculate Total Sales With Tax',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['arrays', 'reduce', 'objects', 'math'],
    description:
      'Write a function called `calculateTotalSalesWithTax` that takes an array of product objects `{ name, price, quantity }` and a tax rate (as a percentage), and returns the total cost including tax, rounded to 2 decimal places.',
    examples: [
      {
        input: "calculateTotalSalesWithTax([{ name: 'Apple', price: 0.5, quantity: 10 }], 8)",
        output: '5.4',
        explanation: '(0.5 * 10) * 1.08 = 5.40',
      },
    ],
    starterCode: `function calculateTotalSalesWithTax(products, taxRate) {\n  \n}`,
    testCases: [
      {
        input: [
          [
            { name: 'Apple', price: 0.5, quantity: 10 },
            { name: 'Banana', price: 0.3, quantity: 20 },
            { name: 'Orange', price: 0.6, quantity: 15 },
          ],
          8,
        ],
        expected: 21.6,
        description: 'mixed fruits at 8% tax',
      },
      {
        input: [
          [
            { name: 'Chocolate', price: 2.5, quantity: 5 },
            { name: 'Chips', price: 1.2, quantity: 10 },
            { name: 'Soda', price: 1.0, quantity: 8 },
            { name: 'Candy', price: 0.5, quantity: 15 },
          ],
          5,
        ],
        expected: 42,
        description: 'snacks at 5% tax',
      },
    ],
    hints: [
      'Use reduce to sum up price * quantity for all products.',
      'Then multiply by (1 + taxRate / 100) and round with Number.toFixed(2).',
    ],
    functionName: 'calculateTotalSalesWithTax',
  },
  {
    id: 'hashtag-generator',
    title: 'Hashtag Generator',
    difficulty: 'medium',
    category: 'Strings',
    tags: ['strings', 'map', 'filter', 'title case'],
    description:
      'Write a function called `generateHashtag` that takes a string and returns a hashtag version of it.\n\nRules:\n- Trim whitespace and split into words\n- Capitalize the first letter of each word\n- Prepend "#"\n- Return `false` if the input is empty or the result exceeds 140 characters',
    examples: [
      { input: "generateHashtag('Hello there')", output: '"#HelloThere"' },
      { input: "generateHashtag('    Hello     World   ')", output: '"#HelloWorld"' },
      { input: "generateHashtag('')", output: 'false' },
    ],
    starterCode: `function generateHashtag(str) {\n  \n}`,
    testCases: [
      { input: [' Hello there thanks for trying my Kata'], expected: '#HelloThereThanksForTryingMyKata', description: 'basic hashtag' },
      { input: ['    Hello     World   '], expected: '#HelloWorld', description: 'trims extra spaces' },
      { input: [''], expected: false, description: 'empty string returns false' },
      {
        input: ['This is a very very very very very very very very very very very very very very long input that should result in a false hashtag because it exceeds the character limit of 140'],
        expected: false,
        description: 'too long returns false',
      },
    ],
    hints: [
      'Split on whitespace, filter out empty strings, then title-case each word.',
      'Check if the result length > 140 and return false in that case.',
    ],
    functionName: 'generateHashtag',
  },
  {
    id: 'factorial',
    title: 'Factorial',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'math'],
    description:
      'Write a function called `factorial` that takes a non-negative integer `n` and returns its factorial using recursion.\n\nThe factorial of n (written n!) is the product of all positive integers from 1 to n.\nBase case: 0! = 1',
    examples: [
      { input: 'factorial(0)', output: '1' },
      { input: 'factorial(5)', output: '120', explanation: '5 * 4 * 3 * 2 * 1 = 120' },
    ],
    starterCode: `function factorial(n) {\n  \n}`,
    testCases: [
      { input: [0], expected: 1, description: 'factorial of 0 is 1' },
      { input: [5], expected: 120, description: 'factorial of 5' },
      { input: [10], expected: 3628800, description: 'factorial of 10' },
    ],
    hints: [
      'Base case: if n === 0, return 1.',
      'Recursive case: return n * factorial(n - 1).',
    ],
    functionName: 'factorial',
  },
  {
    id: 'array-sum',
    title: 'Array Sum (Recursive)',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'arrays', 'math'],
    description:
      'Write a function called `arraySum` that takes an array of numbers and returns the sum of all elements using recursion.\n\nDo not use a loop or the built-in reduce method.',
    examples: [
      { input: 'arraySum([1, 2, 3, 4, 5])', output: '15' },
      { input: 'arraySum([])', output: '0' },
    ],
    starterCode: `function arraySum(arr) {\n  // Use recursion — no loops or reduce!\n}`,
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: 15, description: 'sums positive numbers' },
      { input: [[-1, -2, -3, -4, -5]], expected: -15, description: 'sums negative numbers' },
      { input: [[]], expected: 0, description: 'empty array returns 0' },
    ],
    hints: [
      'Base case: if the array is empty, return 0.',
      'Recursive case: return arr[0] + arraySum(arr.slice(1)).',
    ],
    functionName: 'arraySum',
  },
  {
    id: 'number-range',
    title: 'Number Range (Recursive)',
    difficulty: 'medium',
    category: 'Recursion',
    tags: ['recursion', 'arrays'],
    description:
      'Write a function called `numberRange` that takes a start and end number and returns an array of all integers from start to end (inclusive) using recursion.',
    examples: [
      { input: 'numberRange(1, 5)', output: '[1, 2, 3, 4, 5]' },
      { input: 'numberRange(7, 7)', output: '[7]' },
    ],
    starterCode: `function numberRange(start, end) {\n  \n}`,
    testCases: [
      { input: [1, 5], expected: [1, 2, 3, 4, 5], description: 'range 1 to 5' },
      { input: [3, 10], expected: [3, 4, 5, 6, 7, 8, 9, 10], description: 'range 3 to 10' },
      { input: [7, 7], expected: [7], description: 'single number range' },
    ],
    hints: [
      'Base case: if start === end, return [start].',
      'Recursive case: return [start, ...numberRange(start + 1, end)].',
    ],
    functionName: 'numberRange',
  },
  {
    id: 'symmetric-difference',
    title: 'Symmetric Difference',
    difficulty: 'medium',
    category: 'Hash Tables',
    tags: ['arrays', 'Set', 'filter'],
    description:
      'Write a function called `symmetricDifference` that takes two arrays and returns a new array containing elements that are in either array but NOT in both (removing duplicates).',
    examples: [
      { input: 'symmetricDifference([1, 2, 3], [3, 4, 5])', output: '[1, 2, 4, 5]' },
      { input: 'symmetricDifference([1, 2, 3, 4, 5], [5, 4, 3, 2, 1])', output: '[]' },
    ],
    starterCode: `function symmetricDifference(arr1, arr2) {\n  \n}`,
    testCases: [
      { input: [[1, 2, 3], [3, 4, 5]], expected: [1, 2, 4, 5], description: 'basic difference' },
      { input: [[1, 2, 2, 3, 4], [2, 3, 3, 4, 5]], expected: [1, 5], description: 'with duplicates in input' },
      { input: [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1]], expected: [], description: 'identical sets return empty' },
      { input: [[1, 2, 3], [4, 5, 6]], expected: [1, 2, 3, 4, 5, 6], description: 'no overlap returns all' },
    ],
    hints: [
      'Find elements in arr1 not in arr2, and elements in arr2 not in arr1.',
      'Use a Set to handle duplicates in each array before comparing.',
    ],
    functionName: 'symmetricDifference',
  },

  // ─── HARD (additional) ───────────────────────────────────────────────────
  {
    id: 'longest-consecutive',
    title: 'Longest Consecutive Sequence',
    difficulty: 'hard',
    category: 'Hash Tables',
    tags: ['arrays', 'Set', 'sequences'],
    description:
      'Write a function called `longestConsecutiveSequence` that takes an unsorted array of integers and returns the length of the longest consecutive sequence of integers.\n\nFor example, in [100, 4, 200, 1, 3, 2], the longest consecutive sequence is [1, 2, 3, 4] which has length 4.',
    examples: [
      { input: 'longestConsecutiveSequence([100, 4, 200, 1, 3, 2])', output: '4', explanation: 'sequence 1,2,3,4' },
      { input: 'longestConsecutiveSequence([0,3,7,2,5,8,4,6,9,1])', output: '10' },
    ],
    starterCode: `function longestConsecutiveSequence(nums) {\n  \n}`,
    testCases: [
      { input: [[100, 4, 200, 1, 3, 2]], expected: 4, description: 'sequence 1,2,3,4' },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 9, 1]], expected: 10, description: 'full sequence 0-9' },
    ],
    hints: [
      'Put all numbers into a Set for O(1) lookup.',
      'For each number that has no predecessor (num-1 not in set), count how long the consecutive run starting there is.',
    ],
    functionName: 'longestConsecutiveSequence',
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    difficulty: 'hard',
    category: 'Sorting',
    tags: ['sorting', 'arrays', 'algorithms'],
    description:
      'Implement a function called `insertionSort` that takes an array of numbers and returns it sorted in ascending order using the Insertion Sort algorithm.\n\nInsertion Sort builds the sorted array one element at a time by inserting each element into its correct position.',
    examples: [
      { input: 'insertionSort([5, 2, 8, 1, 3])', output: '[1, 2, 3, 5, 8]' },
    ],
    starterCode: `function insertionSort(arr) {\n  \n}`,
    testCases: [
      { input: [[5, 2, 8, 1, 3]], expected: [1, 2, 3, 5, 8], description: 'unsorted array' },
      { input: [[4, 1, 3, 4, 2, 2]], expected: [1, 2, 2, 3, 4, 4], description: 'array with duplicates' },
      { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'already sorted' },
      { input: [[42]], expected: [42], description: 'single element' },
      { input: [[]], expected: [], description: 'empty array' },
    ],
    hints: [
      'Start from index 1. For each element, compare it backwards and shift larger elements right.',
      'Insert the current element into the correct position.',
    ],
    functionName: 'insertionSort',
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    difficulty: 'hard',
    category: 'Sorting',
    tags: ['sorting', 'arrays', 'algorithms'],
    description:
      'Implement a function called `selectionSort` that takes an array of numbers and returns it sorted in ascending order using the Selection Sort algorithm.\n\nSelection Sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning.',
    examples: [
      { input: 'selectionSort([5, 2, 8, 1, 3])', output: '[1, 2, 3, 5, 8]' },
    ],
    starterCode: `function selectionSort(arr) {\n  \n}`,
    testCases: [
      { input: [[5, 2, 8, 1, 3]], expected: [1, 2, 3, 5, 8], description: 'unsorted array' },
      { input: [[4, 1, 3, 4, 2, 2]], expected: [1, 2, 2, 3, 4, 4], description: 'array with duplicates' },
      { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'already sorted' },
      { input: [[42]], expected: [42], description: 'single element' },
      { input: [[]], expected: [], description: 'empty array' },
    ],
    hints: [
      'For each position i, find the index of the minimum value in arr[i..].',
      'Swap arr[i] with the found minimum.',
    ],
    functionName: 'selectionSort',
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    difficulty: 'hard',
    category: 'Sorting',
    tags: ['sorting', 'recursion', 'divide and conquer'],
    description:
      'Implement a function called `quickSort` that takes an array of numbers and returns it sorted in ascending order using the Quick Sort algorithm.\n\nQuick Sort picks a pivot element and partitions the array into elements less than the pivot, the pivot itself, and elements greater than the pivot, then recursively sorts each partition.',
    examples: [
      { input: 'quickSort([5, 2, 8, 1, 3])', output: '[1, 2, 3, 5, 8]' },
    ],
    starterCode: `function quickSort(arr) {\n  \n}`,
    testCases: [
      { input: [[5, 2, 8, 1, 3]], expected: [1, 2, 3, 5, 8], description: 'unsorted array' },
      { input: [[4, 1, 3, 4, 2, 2]], expected: [1, 2, 2, 3, 4, 4], description: 'array with duplicates' },
      { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'already sorted' },
      { input: [[42]], expected: [42], description: 'single element' },
      { input: [[]], expected: [], description: 'empty array' },
    ],
    hints: [
      'Base case: if arr.length <= 1, return arr.',
      'Pick a pivot (e.g. the last element). Partition into left (< pivot) and right (> pivot).',
      'Return [...quickSort(left), pivot, ...quickSort(right)].',
    ],
    functionName: 'quickSort',
  },
  {
    id: 'queue-implementation',
    title: 'Queue Implementation',
    difficulty: 'hard',
    category: 'Data Structures',
    tags: ['class', 'queue', 'FIFO', 'data structures'],
    description:
      'Implement a `Queue` class (First-In-First-Out) with the following:\n\n**Constructor:**\n- `this.maxSize = 100`\n- `this.queue = []`\n- `this.front = 0`\n- `this.back = 0`\n\n**Methods:**\n- `enqueue(value)` — add element to the back\n- `dequeue()` — remove and return front element (or `null` if empty)\n- `peek()` — return front element without removing (or `null` if empty)\n- `getLength()` — return number of elements\n- `isEmpty()` — return `true` if queue is empty\n- `isFull()` — return `true` if queue has reached maxSize',
    examples: [
      { input: 'const q = new Queue(); q.enqueue(1); q.enqueue(2); q.dequeue()', output: '1' },
    ],
    starterCode: `class Queue {\n  constructor() {\n    this.maxSize = 100;\n    this.queue = [];\n    this.front = 0;\n    this.back = 0;\n  }\n\n  enqueue(value) {\n    \n  }\n\n  dequeue() {\n    \n  }\n\n  peek() {\n    \n  }\n\n  getLength() {\n    \n  }\n\n  isEmpty() {\n    \n  }\n\n  isFull() {\n    \n  }\n}`,
    testCases: [
      {
        input: [['isEmpty', []]],
        expected: true,
        description: 'new queue is empty',
      },
      {
        input: [['enqueue', [1]], ['peek', []]],
        expected: 1,
        description: 'peek returns front element',
      },
      {
        input: [['enqueue', [1]], ['enqueue', [2]], ['dequeue', []]],
        expected: 1,
        description: 'dequeue returns first-in element (FIFO)',
      },
      {
        input: [['enqueue', [1]], ['enqueue', [2]], ['dequeue', []], ['peek', []]],
        expected: 2,
        description: 'peek after dequeue shows next element',
      },
      {
        input: [['enqueue', [1]], ['getLength', []]],
        expected: 1,
        description: 'getLength after one enqueue',
      },
    ],
    hints: [
      'enqueue: push to the back of the array, increment this.back.',
      'dequeue: return this.queue[this.front], increment this.front.',
      'getLength: return this.back - this.front.',
    ],
    functionName: 'Queue',
    problemType: 'class',
  },

  // ─── EASY (02 remaining) ─────────────────────────────────────────────────
  {
    id: 'find-missing-letter',
    title: 'Find Missing Letter',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'charCodeAt', 'arrays'],
    description:
      'Write a function called `findMissingLetter` that takes an array of consecutive letters and returns the missing letter in the sequence.',
    examples: [
      { input: "findMissingLetter(['a','b','c','e'])", output: '"d"' },
      { input: "findMissingLetter(['X','Z'])", output: '"Y"' },
    ],
    starterCode: `function findMissingLetter(arr) {\n  \n}`,
    testCases: [
      { input: [['a', 'b', 'c', 'e']], expected: 'd', description: 'missing d' },
      { input: [['X', 'Z']], expected: 'Y', description: 'missing Y (uppercase)' },
      { input: [['m', 'n', 'o', 'q', 'r']], expected: 'p', description: 'missing p' },
      { input: [['F', 'G', 'H', 'J']], expected: 'I', description: 'missing I' },
    ],
    hints: [
      'Use charCodeAt(0) to get the char code of each letter.',
      'If the difference between consecutive char codes is 2, the missing letter is between them.',
    ],
    functionName: 'findMissingLetter',
  },
  {
    id: 'are-all-chars-unique',
    title: 'Are All Characters Unique',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'Set', 'uniqueness'],
    description:
      'Write a function called `areAllCharactersUnique` that takes a string and returns `true` if all characters in the string are unique (no duplicates), and `false` otherwise. The check is case-sensitive.',
    examples: [
      { input: "areAllCharactersUnique('abcdefg')", output: 'true' },
      { input: "areAllCharactersUnique('programming')", output: 'false', explanation: 'r, g, m appear more than once' },
    ],
    starterCode: `function areAllCharactersUnique(str) {\n  \n}`,
    testCases: [
      { input: ['abcdefg'], expected: true, description: 'all unique' },
      { input: ['abcdefgA'], expected: true, description: 'case-sensitive, A and a are different' },
      { input: ['programming'], expected: false, description: 'has duplicates' },
      { input: [''], expected: true, description: 'empty string' },
      { input: ['a'], expected: true, description: 'single character' },
    ],
    hints: ['A Set removes duplicates — compare its size to the original string length.'],
    functionName: 'areAllCharactersUnique',
  },
  {
    id: 'validate-email',
    title: 'Validate Email',
    difficulty: 'easy',
    category: 'Strings',
    tags: ['strings', 'regex', 'validation'],
    description:
      'Write a function called `validateEmail` that takes a string and returns `true` if it is a valid email address, and `false` otherwise.\n\nA valid email must have: a local part, an "@" symbol, a domain name, and a top-level domain (e.g. .com, .org).',
    examples: [
      { input: "validateEmail('john@example.com')", output: 'true' },
      { input: "validateEmail('invalid-email')", output: 'false' },
      { input: "validateEmail('user@domain')", output: 'false', explanation: 'missing TLD' },
    ],
    starterCode: `function validateEmail(email) {\n  \n}`,
    testCases: [
      { input: ['john@example.com'], expected: true, description: 'valid email' },
      { input: ['jane.doe@domain.org'], expected: true, description: 'valid with dot in local part' },
      { input: ['invalid-email'], expected: false, description: 'no @ symbol' },
      { input: ['@domain.com'], expected: false, description: 'no local part' },
      { input: ['user@domain'], expected: false, description: 'no TLD' },
    ],
    hints: ['Use a regex like /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ to validate.'],
    functionName: 'validateEmail',
  },

  // ─── MEDIUM (03 remaining) ────────────────────────────────────────────────
  {
    id: 'valid-ipv4',
    title: 'Valid IPv4 Address',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['strings', 'validation', 'regex', 'split'],
    description:
      'Write a function called `isValidIPv4` that takes a string and returns `true` if it is a valid IPv4 address, and `false` otherwise.\n\nA valid IPv4 address has exactly 4 octets separated by dots. Each octet must be a number from 0 to 255 with no leading zeros.',
    examples: [
      { input: "isValidIPv4('1.2.3.4')", output: 'true' },
      { input: "isValidIPv4('123.456.78.90')", output: 'false', explanation: '456 > 255' },
      { input: "isValidIPv4('123.045.067.089')", output: 'false', explanation: 'leading zeros not allowed' },
    ],
    starterCode: `function isValidIPv4(ip) {\n  \n}`,
    testCases: [
      { input: ['1.2.3.4'], expected: true, description: 'valid IP' },
      { input: ['123.45.67.89'], expected: true, description: 'valid IP with larger values' },
      { input: ['1.2.3'], expected: false, description: 'only 3 octets' },
      { input: ['1.2.3.4.5'], expected: false, description: '5 octets' },
      { input: ['123.456.78.90'], expected: false, description: 'octet > 255' },
      { input: ['123.045.067.089'], expected: false, description: 'leading zeros' },
    ],
    hints: [
      'Split on "." and check you have exactly 4 parts.',
      'Each part must be a number 0-255 with no leading zeros (check with String(Number(part)) === part).',
    ],
    functionName: 'isValidIPv4',
  },
  {
    id: 'analyze-car-mileage',
    title: 'Analyze Car Mileage',
    difficulty: 'medium',
    category: 'Higher-Order Functions',
    tags: ['arrays', 'objects', 'reduce', 'filter'],
    description:
      'Write a function called `analyzeCarMileage` that takes an array of car objects `{ make, model, year, mileage }` and returns an analysis object with:\n- `averageMileage` — average mileage across all cars\n- `highestMileageCar` — the car object with the highest mileage\n- `lowestMileageCar` — the car object with the lowest mileage\n- `totalMileage` — sum of all mileages',
    examples: [
      {
        input: "analyzeCarMileage([{ make: 'Toyota', mileage: 25000 }, { make: 'Honda', mileage: 30000 }])",
        output: '{ averageMileage: 27500, highestMileageCar: Honda, lowestMileageCar: Toyota, totalMileage: 55000 }',
      },
    ],
    starterCode: `function analyzeCarMileage(cars) {\n  \n}`,
    testCases: [
      {
        input: [
          [
            { make: 'Toyota', model: 'Corolla', year: 2020, mileage: 25000 },
            { make: 'Honda', model: 'Civic', year: 2019, mileage: 30000 },
            { make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000 },
          ],
        ],
        expected: {
          averageMileage: (25000 + 30000 + 15000) / 3,
          highestMileageCar: { make: 'Honda', model: 'Civic', year: 2019, mileage: 30000 },
          lowestMileageCar: { make: 'Ford', model: 'Mustang', year: 2021, mileage: 15000 },
          totalMileage: 70000,
        },
        description: 'three cars analysis',
        tolerance: 0.01,
      },
    ],
    hints: [
      'Use reduce to compute totalMileage, then divide by cars.length for average.',
      'Use reduce or Math.max/Math.min with find to get highest and lowest mileage cars.',
    ],
    functionName: 'analyzeCarMileage',
  },

  // ─── EASY (04 remaining) ─────────────────────────────────────────────────
  {
    id: 'power',
    title: 'Power (Recursive)',
    difficulty: 'easy',
    category: 'Recursion',
    tags: ['recursion', 'math'],
    description:
      'Write a function called `power` that takes a base and an exponent and returns the result of raising the base to that exponent using recursion.',
    examples: [
      { input: 'power(2, 3)', output: '8', explanation: '2 * 2 * 2 = 8' },
      { input: 'power(5, 2)', output: '25' },
    ],
    starterCode: `function power(base, exponent) {\n  \n}`,
    testCases: [
      { input: [2, 3], expected: 8, description: '2^3 = 8' },
      { input: [5, 2], expected: 25, description: '5^2 = 25' },
      { input: [3, 4], expected: 81, description: '3^4 = 81' },
    ],
    hints: [
      'Base case: if exponent === 0, return 1.',
      'Recursive case: return base * power(base, exponent - 1).',
    ],
    functionName: 'power',
  },

  // ─── HARD (04 remaining) ──────────────────────────────────────────────────
  {
    id: 'permutations',
    title: 'Permutations',
    difficulty: 'hard',
    category: 'Recursion',
    tags: ['recursion', 'strings', 'backtracking'],
    description:
      'Write a function called `permutations` that takes a string and returns an array of all possible permutations of its characters.\n\nReturn an empty string in the result when the input is an empty string.',
    examples: [
      { input: "permutations('abc')", output: '["abc","acb","bac","bca","cab","cba"]' },
    ],
    starterCode: `function permutations(str) {\n  \n}`,
    testCases: [
      {
        input: ['abc'],
        expected: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'],
        description: 'all permutations of "abc"',
      },
      {
        input: ['dog'],
        expected: ['dog', 'dgo', 'odg', 'ogd', 'gdo', 'god'],
        description: 'all permutations of "dog"',
      },
      {
        input: [''],
        expected: [''],
        description: 'empty string returns [""]',
      },
    ],
    hints: [
      'Base case: if str.length <= 1, return [str].',
      'For each character, get all permutations of the remaining characters and prepend the character.',
    ],
    functionName: 'permutations',
  },

  // ─── EASY (06 remaining) ─────────────────────────────────────────────────
  {
    id: 'phone-number-directory',
    title: 'Phone Number Directory',
    difficulty: 'easy',
    category: 'Hash Tables',
    tags: ['Map', 'strings', 'split'],
    description:
      'Write a function called `phoneNumberDirectory` that takes an array of strings in the format "Name:PhoneNumber" and returns a Map where each key is the name and the value is the phone number.',
    examples: [
      {
        input: "phoneNumberDirectory(['John:123-456-7890', 'Jane:987-654-3210'])",
        output: 'Map { "John" => "123-456-7890", "Jane" => "987-654-3210" }',
      },
    ],
    starterCode: `function phoneNumberDirectory(phoneNumbers) {\n  \n}`,
    testCases: [
      {
        input: [['John:123-456-7890', 'Jane:987-654-3210', 'Joe:555-555-5555']],
        expected: new Map([['John', '123-456-7890'], ['Jane', '987-654-3210'], ['Joe', '555-555-5555']]),
        description: 'builds directory map',
      },
    ],
    hints: ['Split each entry on ":" to get the name and number, then set them in a new Map.'],
    functionName: 'phoneNumberDirectory',
  },
  {
    id: 'word-instance-counter',
    title: 'Word Instance Counter',
    difficulty: 'easy',
    category: 'Hash Tables',
    tags: ['strings', 'Map', 'frequency', 'regex'],
    description:
      'Write a function called `wordInstanceCounter` that takes a string and a target word, and returns how many times the target word appears in the string. The comparison is case-insensitive.',
    examples: [
      { input: "wordInstanceCounter('The quick brown fox', 'the')", output: '1' },
      { input: "wordInstanceCounter('Hello, Hello, Hello!', 'hello')", output: '3' },
    ],
    starterCode: `function wordInstanceCounter(str, word) {\n  \n}`,
    testCases: [
      { input: ['The quick brown fox jumps over the lazy dog.', 'the'], expected: 2, description: 'the appears twice' },
      { input: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'ipsum'], expected: 1, description: 'ipsum appears once' },
      { input: ['Hello, world!', 'hello'], expected: 1, description: 'case-insensitive match' },
      { input: ['Hello, Hello, Hello!', 'hello'], expected: 3, description: 'appears three times' },
    ],
    hints: [
      'Lowercase both the string and the word.',
      'Split on /\\W+/ and filter for exact matches, or use a regex with the g flag.',
    ],
    functionName: 'wordInstanceCounter',
  },

  // ─── MEDIUM (07 remaining — find-pair-sum works on plain arrays) ──────────
  {
    id: 'find-pair-sum',
    title: 'Find Pair Sum',
    difficulty: 'medium',
    category: 'Arrays',
    tags: ['arrays', 'two pointers', 'sorting'],
    description:
      'Write a function called `findPairSum` that takes an array of numbers and a target sum, and returns an array containing the pair of numbers that add up to the target. Return `null` if no such pair exists.',
    examples: [
      { input: 'findPairSum([2, 6, 3, 8, 10, 5], 12)', output: '[2, 10]' },
      { input: 'findPairSum([1, 2, 3, 4, 5], 10)', output: 'null' },
    ],
    starterCode: `function findPairSum(nums, targetSum) {\n  \n}`,
    testCases: [
      { input: [[2, 6, 3, 8, 10, 5], 12], expected: [2, 10], description: 'pair [2, 10] sums to 12' },
      { input: [[1, 2, 3, 4, 5], 10], expected: null, description: 'no pair found returns null' },
    ],
    hints: [
      'Sort the array, then use two pointers (one at each end) moving inward.',
      'If the sum is too small, move the left pointer right; if too large, move the right pointer left.',
    ],
    functionName: 'findPairSum',
  },

  // ─── HARD (08 — trees) ───────────────────────────────────────────────────
  {
    id: 'depth-first-traversal',
    title: 'Depth-First Traversal',
    difficulty: 'hard',
    category: 'Trees',
    tags: ['trees', 'DFS', 'stack', 'recursion'],
    description:
      'Write a function called `depthFirstTraversal` that takes the root of a binary tree and returns an array of node values in depth-first (pre-order) order: root → left subtree → right subtree.\n\nEach tree node has the shape: `{ value, left, right }`\n\nReturn an empty array for an empty tree (null root).',
    examples: [
      {
        input: 'depthFirstTraversal(root) where tree is: a → (b → d,e), (c → f)',
        output: '["a","b","d","e","c","f"]',
      },
    ],
    starterCode: `// Each node has: { value, left, right }\n// You may use a stack or recursion\n\nfunction depthFirstTraversal(root) {\n  \n}`,
    testCases: [
      {
        input: [{
          value: 'a',
          left: {
            value: 'b',
            left: { value: 'd', left: null, right: null },
            right: { value: 'e', left: null, right: null },
          },
          right: {
            value: 'c',
            left: { value: 'f', left: null, right: null },
            right: null,
          },
        }],
        expected: ['a', 'b', 'd', 'e', 'c', 'f'],
        description: 'pre-order traversal',
      },
      {
        input: [null],
        expected: [],
        description: 'empty tree returns []',
      },
      {
        input: [{ value: 'root', left: null, right: null }],
        expected: ['root'],
        description: 'single node',
      },
    ],
    hints: [
      'Recursive: visit root, then recurse left, then recurse right.',
      'Iterative: use a stack — push root, then in the loop push right child then left child (so left is processed first).',
    ],
    functionName: 'depthFirstTraversal',
  },
  {
    id: 'breadth-first-traversal',
    title: 'Breadth-First Traversal',
    difficulty: 'hard',
    category: 'Trees',
    tags: ['trees', 'BFS', 'queue'],
    description:
      'Write a function called `breadthFirstTraversal` that takes the root of a binary tree and returns an array of node values in breadth-first (level-order) order — left to right, level by level.\n\nEach tree node has the shape: `{ value, left, right }`\n\nReturn an empty array for an empty tree (null root).',
    examples: [
      {
        input: 'breadthFirstTraversal(root) where tree is: a → (b → d,e), (c → f)',
        output: '["a","b","c","d","e","f"]',
      },
    ],
    starterCode: `// Each node has: { value, left, right }\n// Use a queue (array) to process level by level\n\nfunction breadthFirstTraversal(root) {\n  \n}`,
    testCases: [
      {
        input: [{
          value: 'a',
          left: {
            value: 'b',
            left: { value: 'd', left: null, right: null },
            right: { value: 'e', left: null, right: null },
          },
          right: {
            value: 'c',
            left: { value: 'f', left: null, right: null },
            right: null,
          },
        }],
        expected: ['a', 'b', 'c', 'd', 'e', 'f'],
        description: 'level-order traversal',
      },
      {
        input: [null],
        expected: [],
        description: 'empty tree returns []',
      },
      {
        input: [{ value: 'root', left: null, right: null }],
        expected: ['root'],
        description: 'single node',
      },
    ],
    hints: [
      'Use a queue (array with shift/push). Start by enqueuing the root.',
      'Dequeue the front node, add its value to results, then enqueue its left and right children.',
    ],
    functionName: 'breadthFirstTraversal',
  },
]

export const jsProblemMap = new Map(jsProblems.map((p) => [p.id, p]))
