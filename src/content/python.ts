

export type LessonContent = {
  intro: string;
  sections: { title: string; body: string; code?: string }[];
  runner: { title?: string; code: string };
  keyPoints?: string[];
};

const P: Record<string, LessonContent> = {
  "what-is-python": {
    intro:
      "Python is a high-level, general-purpose programming language known for its readable syntax and huge standard library. It's used everywhere: web backends, data science, machine learning, automation, scripting, education, and even in browsers (like this page).",
    sections: [
      {
        title: "Why Python?",
        body:
          "• Simple, English-like syntax so you can focus on solving problems.\n• Massive ecosystem (NumPy, Pandas, Django, Flask, PyTorch, requests, …).\n• Cross-platform: the same code runs on Windows, macOS, and Linux.\n• Interpreted, so you can experiment interactively.",
      },
      {
        title: "How Python runs",
        body:
          "You write .py files. The Python interpreter reads your code line by line, compiles it to bytecode, and runs it on the Python Virtual Machine (PVM). No separate compile step — just run.",
      },
    ],
    runner: {
      title: "Run your first Python line",
      code: `print("Python is running in your browser 🎉")`,
    },
    keyPoints: [
      "Python is interpreted and dynamically typed.",
      "It's used from tiny scripts to huge production systems.",
      "In this course, every lesson has a live editor — no installs needed.",
    ],
  },

  "hello-world": {
    intro:
      "By tradition, your first program in any language prints 'Hello, World!'. In Python, that takes one line.",
    sections: [
      {
        title: "The print() function",
        body:
          "print() writes text (and other values) to the output. Anything inside quotes is a string. You can print numbers, results of expressions, or several values separated by commas.",
        code: `print("Hello, World!")\nprint("2 + 3 =", 2 + 3)`,
      },
      {
        title: "Comments",
        body:
          "Anything after # on a line is a comment — Python ignores it. Comments explain your code to humans.",
        code: `# This line is ignored\nprint("Hi")  # inline comment`,
      },
    ],
    runner: {
      code: `# Change the message and run again\nname = "Ada"\nprint("Hello,", name)\nprint("Welcome to Python.")`,
    },
    keyPoints: [
      "print() outputs values.",
      "Strings go inside \"double\" or 'single' quotes.",
      "Comments start with # and are ignored by Python.",
    ],
  },

  "running-python": {
    intro:
      "There are three common ways to run Python: an interactive REPL, running a .py script from the terminal, or an in-browser runtime like Pyodide (what this site uses).",
    sections: [
      {
        title: "REPL — Read, Eval, Print, Loop",
        body:
          "Type `python` in your terminal to get an interactive prompt. Each line runs immediately and prints its result. Great for experimenting.",
      },
      {
        title: "Running a script",
        body:
          "Save code in a file like hello.py and run it with `python hello.py`. Scripts are how you build real programs and share them.",
      },
      {
        title: "In your browser (this course)",
        body:
          "The Run button below sends your code to Pyodide — a full CPython compiled to WebAssembly. You get real Python without installing anything.",
      },
    ],
    runner: {
      code: `# Try multiple statements at once\nfor i in range(3):\n    print("iteration", i)\nprint("done")`,
    },
  },

  "variables-and-types": {
    intro:
      "A variable is a name that refers to a value. You don't declare types — Python figures out the type from the value you assign.",
    sections: [
      {
        title: "Assignment",
        body:
          "Use `=` to bind a value to a name. Names are case-sensitive and by convention use snake_case.",
        code: `age = 17\nname = "Riya"\npi = 3.14159\nis_student = True`,
      },
      {
        title: "Built-in types",
        body:
          "• int — whole numbers\n• float — decimals\n• str — text\n• bool — True or False\n• NoneType — the value None (absence)\n\nUse type(x) to check.",
        code: `print(type(42))\nprint(type(3.14))\nprint(type("hi"))\nprint(type(True))`,
      },
    ],
    runner: {
      code: `x = 10\ny = 3.5\nname = "Ada"\nprint(name, "is", x, "years old")\nprint("Types:", type(x), type(y), type(name))`,
    },
  },

  "numbers-and-math": {
    intro:
      "Python supports integer and floating-point arithmetic with familiar operators.",
    sections: [
      {
        title: "Operators",
        body:
          "+  -  *  /   → add, subtract, multiply, divide (float result)\n//              → integer division (drops the fractional part)\n%               → remainder (modulo)\n**              → exponent",
        code: `print(7 / 2)   # 3.5\nprint(7 // 2)  # 3\nprint(7 % 2)   # 1\nprint(2 ** 10) # 1024`,
      },
      {
        title: "Precedence",
        body: "Follows the usual math rules: ** first, then *, /, //, %, then + and -. Use parentheses to make intent obvious.",
      },
    ],
    runner: {
      code: `# Convert Celsius to Fahrenheit\nc = 25\nf = c * 9 / 5 + 32\nprint(c, "°C =", f, "°F")`,
    },
  },

  strings: {
    intro:
      "Strings are sequences of characters. You can slice them, join them, and call dozens of methods on them.",
    sections: [
      {
        title: "Indexing and slicing",
        body:
          "s[0] is the first character. Negative indices count from the end. Slicing: s[start:stop:step] gives a substring; stop is exclusive.",
        code: `s = "python"\nprint(s[0], s[-1])   # p n\nprint(s[1:4])        # yth\nprint(s[::-1])       # nohtyp (reversed)`,
      },
      {
        title: "Common methods",
        body:
          "upper(), lower(), strip(), replace(), split(), join(), startswith(), endswith(), find(), count().",
        code: `msg = "  Hello, World!  "\nprint(msg.strip().lower())\nprint("-".join(["a", "b", "c"]))`,
      },
    ],
    runner: {
      code: `email = "  Ada.Lovelace@Example.COM  "\nclean = email.strip().lower()\nuser, domain = clean.split("@")\nprint("user:", user)\nprint("domain:", domain)`,
    },
  },

  "f-strings": {
    intro:
      "f-strings (formatted string literals) let you embed expressions directly inside a string using curly braces.",
    sections: [
      {
        title: "The basics",
        body: "Put an `f` before the quote. Anything in { } is evaluated as a Python expression.",
        code: `name = "Ada"\nage = 36\nprint(f"{name} is {age} years old.")\nprint(f"Next year: {age + 1}")`,
      },
      {
        title: "Format specs",
        body:
          "`{value:spec}` controls formatting. `:.2f` = 2 decimals, `:>10` = right-align in 10 cols, `:,` = thousands separators.",
        code: `pi = 3.14159\nprint(f"{pi:.2f}")           # 3.14\nprint(f"{1234567:,}")         # 1,234,567\nprint(f"{'hi':>10}|")         #         hi|`,
      },
    ],
    runner: {
      code: `items = [("Pen", 12), ("Book", 240), ("Bag", 1499)]\nfor name, price in items:\n    print(f"{name:<6} ₹{price:>6,.2f}")`,
    },
  },

  "input-and-output": {
    intro:
      "input() reads a line of text from the user. It always returns a string — convert it if you need a number.",
    sections: [
      {
        title: "Reading input",
        body:
          "input(prompt) shows the prompt and waits for the user to type + press Enter. In this browser runtime, input() is limited — prefer hard-coded values for practice.",
        code: `name = input("Your name: ")\nprint("Hi", name)`,
      },
      {
        title: "Converting types",
        body:
          "int(s), float(s), str(x), bool(x) convert between types. int('3.5') fails — use float first.",
        code: `age_str = "17"\nage = int(age_str)\nprint(age + 1)`,
      },
    ],
    runner: {
      code: `# Simulated input\nage_str = "21"\nage = int(age_str)\nprint(f"In 10 years you'll be {age + 10}.")`,
    },
  },

  "booleans-and-comparisons": {
    intro:
      "Booleans have two values: True and False. They come from comparisons and combine with logical operators.",
    sections: [
      {
        title: "Comparisons",
        body: "==  !=  <  <=  >  >=  in  not in  is  is not",
        code: `print(3 < 5)         # True\nprint("py" in "python")  # True\nprint(3 == 3.0)      # True (value equality)`,
      },
      {
        title: "Logical operators",
        body: "and, or, not — with short-circuit evaluation. Any non-zero, non-empty value is 'truthy'; 0, '', [], {}, None are 'falsy'.",
        code: `x = 5\nprint(x > 0 and x < 10)\nprint(not "")   # True\nprint([] or "fallback")  # 'fallback'`,
      },
    ],
    runner: {
      code: `def is_teen(age):\n    return 13 <= age <= 19\n\nfor a in [10, 13, 17, 20]:\n    print(a, is_teen(a))`,
    },
  },

  "if-else": {
    intro:
      "if/elif/else lets your program choose a path based on a condition. Indentation defines the body.",
    sections: [
      {
        title: "Syntax",
        body:
          "Every branch body is indented (4 spaces by convention). elif is short for 'else if' and you can have as many as you like.",
        code: `score = 72\nif score >= 90:\n    grade = "A"\nelif score >= 75:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "D"\nprint(grade)`,
      },
      {
        title: "Ternary expressions",
        body: "value_if_true if condition else value_if_false — inline, one-line conditionals.",
        code: `age = 20\nlabel = "adult" if age >= 18 else "minor"\nprint(label)`,
      },
    ],
    runner: {
      code: `def fizzbuzz(n):\n    if n % 15 == 0: return "FizzBuzz"\n    if n % 3 == 0:  return "Fizz"\n    if n % 5 == 0:  return "Buzz"\n    return str(n)\n\nfor i in range(1, 16):\n    print(fizzbuzz(i))`,
    },
  },

  "while-loops": {
    intro:
      "A while loop repeats a block as long as its condition is true. Use break to exit early and continue to skip to the next iteration.",
    sections: [
      {
        title: "The basics",
        body: "Make sure something inside the loop changes the condition — otherwise you get an infinite loop.",
        code: `n = 5\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("liftoff")`,
      },
      {
        title: "break and continue",
        body: "break exits the closest loop. continue skips the rest of this iteration.",
        code: `i = 0\nwhile True:\n    i += 1\n    if i % 2 == 0:\n        continue\n    if i > 7:\n        break\n    print(i)`,
      },
    ],
    runner: {
      code: `# Sum digits of 12345\nn = 12345\ntotal = 0\nwhile n:\n    total += n % 10\n    n //= 10\nprint(total)`,
    },
  },

  "for-loops": {
    intro:
      "for loops iterate over any iterable — a list, tuple, string, range, dict, file, or generator.",
    sections: [
      {
        title: "range()",
        body:
          "range(stop), range(start, stop), range(start, stop, step) — produce integers on demand. stop is exclusive.",
        code: `for i in range(5):\n    print(i)          # 0..4\n\nfor i in range(1, 11, 2):\n    print(i)          # odd numbers 1..9`,
      },
      {
        title: "Iterating collections",
        body: "Use enumerate() when you need both index and value, and zip() to loop over two lists together.",
        code: `names = ["Ada", "Grace", "Linus"]\nfor i, n in enumerate(names, start=1):\n    print(i, n)\n\nfor a, b in zip([1, 2, 3], ["a", "b", "c"]):\n    print(a, b)`,
      },
    ],
    runner: {
      code: `# Times table for 7\nfor i in range(1, 11):\n    print(f"7 x {i} = {7*i}")`,
    },
  },

  lists: {
    intro:
      "Lists are ordered, mutable sequences. They can hold values of any type, including other lists.",
    sections: [
      {
        title: "Creating and indexing",
        body: "Square brackets. Negative indices count from the end. Slices work like on strings.",
        code: `nums = [10, 20, 30, 40]\nprint(nums[0], nums[-1])\nprint(nums[1:3])   # [20, 30]`,
      },
      {
        title: "Mutating",
        body:
          "append(x), extend(iter), insert(i, x), remove(x), pop(i=-1), sort(), reverse(), clear(). len(lst) gives length.",
        code: `xs = [3, 1, 4, 1, 5]\nxs.append(9)\nxs.sort()\nprint(xs)`,
      },
    ],
    runner: {
      code: `todo = ["study", "workout", "sleep"]\ntodo.append("read")\ntodo.remove("workout")\nprint(todo)\nprint("count:", len(todo))`,
    },
  },

  tuples: {
    intro:
      "Tuples are like lists but immutable — you can't change them after creation. Great for fixed records and dictionary keys.",
    sections: [
      {
        title: "Creating tuples",
        body: "Comma makes a tuple; parentheses just group. A single-element tuple needs a trailing comma: (7,).",
        code: `p = (3, 4)\nprint(p, type(p))\none = (7,)\nprint(one, type(one))`,
      },
      {
        title: "Packing and unpacking",
        body: "You can assign several variables from a tuple at once. Use * to grab the middle.",
        code: `x, y = (10, 20)\nprint(x, y)\n\nfirst, *rest = [1, 2, 3, 4]\nprint(first, rest)`,
      },
    ],
    runner: {
      code: `def min_max(xs):\n    return (min(xs), max(xs))\n\nlo, hi = min_max([4, 9, 2, 7, 1])\nprint("min:", lo, "max:", hi)`,
    },
  },

  dictionaries: {
    intro:
      "Dictionaries store key → value pairs. Lookups are fast (O(1) average). Keys must be immutable (strings, numbers, tuples).",
    sections: [
      {
        title: "Basics",
        body: "d[key] gets a value (KeyError if missing). d.get(key, default) is safer. `in` checks for a key.",
        code: `student = {"name": "Ada", "age": 17, "marks": 92}\nprint(student["name"])\nprint(student.get("email", "n/a"))\nprint("age" in student)`,
      },
      {
        title: "Iterating",
        body: "Loop keys, values, or both with .items().",
        code: `for k, v in student.items():\n    print(k, "=>", v)`,
      },
    ],
    runner: {
      code: `# Count letters in a word\nword = "programming"\ncounts = {}\nfor ch in word:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)`,
    },
  },

  sets: {
    intro:
      "Sets are unordered collections of unique elements. Fast membership tests and useful set algebra.",
    sections: [
      {
        title: "Creating and using",
        body: "Use {..} literals or set(iterable). {} alone makes an empty dict — use set() for an empty set.",
        code: `a = {1, 2, 3, 3, 2}\nprint(a)          # {1, 2, 3}\nprint(2 in a)     # True`,
      },
      {
        title: "Set algebra",
        body: "| union, & intersection, - difference, ^ symmetric difference.",
        code: `evens = {2, 4, 6, 8}\nsmall = {1, 2, 3, 4}\nprint(evens | small)\nprint(evens & small)`,
      },
    ],
    runner: {
      code: `words = "the quick brown fox jumps over the lazy dog".split()\nunique = set(words)\nprint(len(words), "words,", len(unique), "unique")`,
    },
  },

  comprehensions: {
    intro:
      "Comprehensions are compact expressions that build a list, dict, or set from another iterable — with an optional filter.",
    sections: [
      {
        title: "List comprehension",
        body: "[expression for item in iterable if condition]",
        code: `squares = [x * x for x in range(6)]\nevens   = [x for x in range(10) if x % 2 == 0]\nprint(squares)\nprint(evens)`,
      },
      {
        title: "Dict & set comprehensions",
        body: "Use {} with a key:value pair for dicts, or a single expression for sets.",
        code: `word = "banana"\nfreq = {ch: word.count(ch) for ch in set(word)}\nprint(freq)`,
      },
    ],
    runner: {
      code: `# Uppercase all vowels in a sentence\nvowels = set("aeiou")\ntext = "hello world"\nout = "".join(ch.upper() if ch in vowels else ch for ch in text)\nprint(out)`,
    },
  },

  functions: {
    intro:
      "Functions package reusable behavior. Define with def, call with the name and parentheses.",
    sections: [
      {
        title: "Parameters and return",
        body: "Everything after the colon is indented. Use return to send a value back; a function without return returns None.",
        code: `def area(width, height):\n    return width * height\n\nprint(area(3, 4))    # 12`,
      },
      {
        title: "Default & keyword arguments",
        body:
          "Give parameters a default value so callers can omit them. Callers can pass by name (keyword) for clarity.",
        code: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Ada"))\nprint(greet("Ada", greeting="Hi"))`,
      },
    ],
    runner: {
      code: `def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True\n\nprint([n for n in range(2, 20) if is_prime(n)])`,
    },
  },

  "args-kwargs": {
    intro:
      "*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict.",
    sections: [
      {
        title: "*args",
        body: "Use when a function should accept any number of positional args.",
        code: `def total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4))   # 10`,
      },
      {
        title: "**kwargs",
        body: "Any name=value pair not matched by a named parameter is placed in **kwargs.",
        code: `def describe(**props):\n    for k, v in props.items():\n        print(f"{k}: {v}")\n\ndescribe(name="Ada", role="pioneer", year=1815)`,
      },
      {
        title: "Unpacking at call site",
        body: "You can spread a list with *lst or a dict with **d when calling a function.",
        code: `def add(a, b, c):\n    return a + b + c\n\nnums = [1, 2, 3]\nprint(add(*nums))`,
      },
    ],
    runner: {
      code: `def log(level, *messages, **meta):\n    print(f"[{level}]", *messages, "|", meta)\n\nlog("INFO", "app", "started", user="ada", ok=True)`,
    },
  },

  "scope-and-closures": {
    intro:
      "Python looks up names using the LEGB rule: Local, Enclosing, Global, Built-in. A closure is a function that 'remembers' names from an enclosing scope.",
    sections: [
      {
        title: "LEGB",
        body:
          "Inside a function, names refer to locals first, then to the enclosing function (if nested), then to module globals, and finally to built-ins.",
        code: `x = "global"\ndef outer():\n    x = "enclosing"\n    def inner():\n        print(x)     # 'enclosing'\n    inner()\nouter()`,
      },
      {
        title: "Closures",
        body:
          "A function defined inside another can capture and use variables from the outer scope, even after outer() has returned.",
        code: `def make_multiplier(k):\n    def mul(n):\n        return n * k\n    return mul\n\ndouble = make_multiplier(2)\nprint(double(9))    # 18`,
      },
    ],
    runner: {
      code: `def counter(start=0):\n    n = start\n    def next_val():\n        nonlocal n\n        n += 1\n        return n\n    return next_val\n\nc = counter()\nprint(c(), c(), c())`,
    },
  },

  lambdas: {
    intro:
      "A lambda is a small, anonymous, single-expression function. Great for use with sort(), map(), and filter().",
    sections: [
      {
        title: "Syntax",
        body: "lambda parameters: expression — the expression's value is returned.",
        code: `square = lambda x: x * x\nprint(square(7))    # 49`,
      },
      {
        title: "With map / filter / sorted",
        body: "map applies a function to every item; filter keeps items where a predicate is true; sorted accepts a key= callable.",
        code: `nums = [1, 2, 3, 4, 5]\nprint(list(map(lambda x: x * 10, nums)))\nprint(list(filter(lambda x: x % 2, nums)))\n\npeople = [("Ada", 36), ("Ken", 80), ("Guido", 68)]\nprint(sorted(people, key=lambda p: p[1]))`,
      },
    ],
    runner: {
      code: `words = ["apple", "kiwi", "banana", "fig"]\nby_len = sorted(words, key=lambda w: len(w))\nprint(by_len)`,
    },
  },

  "modules-and-imports": {
    intro:
      "A module is any .py file. The standard library ships hundreds of them. Use import to bring them in.",
    sections: [
      {
        title: "import styles",
        body:
          "• import math               → math.sqrt(16)\n• from math import sqrt     → sqrt(16)\n• from math import sqrt as s → s(16)\n• import math as m          → m.sqrt(16)",
        code: `import math\nprint(math.pi, math.sqrt(16))\n\nfrom random import randint\nprint(randint(1, 6))`,
      },
      {
        title: "Your own modules",
        body:
          "Any .py file becomes a module. Group related helpers, then `from mytools import clean_name` to reuse.",
      },
    ],
    runner: {
      code: `import statistics\nmarks = [82, 91, 76, 88, 95, 70]\nprint("mean:",   statistics.mean(marks))\nprint("median:", statistics.median(marks))\nprint("stdev:",  round(statistics.stdev(marks), 2))`,
    },
  },

  classes: {
    intro:
      "Classes bundle data (attributes) and behavior (methods). An object is an instance of a class.",
    sections: [
      {
        title: "Defining a class",
        body:
          "__init__ runs when you create an instance. `self` refers to the instance being acted on.",
        code: `class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    def bark(self):\n        return f"{self.name} says woof!"\n\nd = Dog("Rex", 3)\nprint(d.bark())`,
      },
      {
        title: "Class vs instance attributes",
        body: "Attributes set inside __init__ belong to each instance. Attributes at the class level are shared.",
      },
    ],
    runner: {
      code: `class Rectangle:\n    def __init__(self, w, h):\n        self.w, self.h = w, h\n    def area(self):\n        return self.w * self.h\n    def perimeter(self):\n        return 2 * (self.w + self.h)\n\nr = Rectangle(4, 5)\nprint("area:", r.area(), "perimeter:", r.perimeter())`,
    },
  },

  inheritance: {
    intro:
      "A subclass inherits attributes and methods from its parent, and can add or override them. Call super() to reuse the parent's implementation.",
    sections: [
      {
        title: "Extending a class",
        body: "Subclass by writing class Child(Parent):",
        code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name}: meow"\n\nprint(Cat("Milo").speak())`,
      },
      {
        title: "super()",
        body: "Reuse the parent's __init__ or method logic instead of copy-pasting.",
        code: `class Employee:\n    def __init__(self, name, salary):\n        self.name, self.salary = name, salary\n\nclass Manager(Employee):\n    def __init__(self, name, salary, team):\n        super().__init__(name, salary)\n        self.team = team\n\nm = Manager("Ada", 90000, ["a", "b"])\nprint(m.name, m.team)`,
      },
    ],
    runner: {
      code: `class Vehicle:\n    def __init__(self, wheels):\n        self.wheels = wheels\n    def describe(self):\n        return f"A vehicle with {self.wheels} wheels."\n\nclass Car(Vehicle):\n    def __init__(self, brand):\n        super().__init__(4)\n        self.brand = brand\n    def describe(self):\n        return f"{self.brand}, {super().describe().lower()}"\n\nprint(Car("Tesla").describe())`,
    },
  },

  "dunder-methods": {
    intro:
      "Dunder ('double-underscore') methods let your classes cooperate with Python's built-in operators and functions.",
    sections: [
      {
        title: "Common ones",
        body:
          "__init__ construct, __repr__ debug string, __str__ user string, __eq__ equality, __lt__ ordering, __len__ len(), __add__ + operator, __iter__ / __next__ iteration.",
        code: `class Money:\n    def __init__(self, amount):\n        self.amount = amount\n    def __repr__(self):\n        return f"Money({self.amount})"\n    def __add__(self, other):\n        return Money(self.amount + other.amount)\n\nprint(Money(10) + Money(5))`,
      },
    ],
    runner: {
      code: `class Vec:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vec(self.x + other.x, self.y + other.y)\n    def __repr__(self):\n        return f"Vec({self.x}, {self.y})"\n\nprint(Vec(1, 2) + Vec(3, 4))`,
    },
  },

  exceptions: {
    intro:
      "Exceptions are Python's way to signal errors. Handle them with try/except; guarantee cleanup with finally; raise your own with raise.",
    sections: [
      {
        title: "try / except / else / finally",
        body:
          "try — code that might fail. except — how to handle a specific error. else — runs if no exception happened. finally — always runs (cleanup).",
        code: `try:\n    n = int("42a")\nexcept ValueError as e:\n    print("bad number:", e)\nfinally:\n    print("done")`,
      },
      {
        title: "Raising and custom exceptions",
        body: "Raise built-in or custom exceptions to signal invalid state.",
        code: `class NegativeError(ValueError):\n    pass\n\ndef sqrt(x):\n    if x < 0:\n        raise NegativeError("no real sqrt of negative")\n    return x ** 0.5\n\ntry:\n    print(sqrt(-1))\nexcept NegativeError as e:\n    print("caught:", e)`,
      },
    ],
    runner: {
      code: `def safe_div(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\nprint(safe_div(10, 2))\nprint(safe_div(10, 0))`,
    },
  },

  "context-managers": {
    intro:
      "The `with` statement guarantees setup/teardown pairs happen correctly — even if an exception is raised. Files are the classic example.",
    sections: [
      {
        title: "Files with with",
        body: "The file is opened for the block and closed automatically at the end.",
        code: `# with open("data.txt") as f:\n#     for line in f:\n#         print(line.rstrip())`,
      },
      {
        title: "Writing your own",
        body: "Implement __enter__ and __exit__, or use contextlib.contextmanager on a generator.",
        code: `from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timer(label):\n    t0 = time.time()\n    yield\n    print(label, round(time.time() - t0, 3), "s")\n\nwith timer("sum"):\n    total = sum(range(100000))\nprint(total)`,
      },
    ],
    runner: {
      code: `from contextlib import contextmanager\n\n@contextmanager\ndef section(name):\n    print(f"--- {name} ---")\n    yield\n    print(f"--- end {name} ---")\n\nwith section("greetings"):\n    print("hello")\n    print("hi")`,
    },
  },

  "iterators-generators": {
    intro:
      "Iterators produce values one at a time. Generators (with `yield`) are the easiest way to make one, and they use very little memory.",
    sections: [
      {
        title: "Generators with yield",
        body: "Each yield pauses the function and hands a value back. The function resumes right after when asked for the next value.",
        code: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor x in countdown(3):\n    print(x)`,
      },
      {
        title: "Generator expressions",
        body: "Like a list comprehension but with () — it produces values lazily.",
        code: `squares = (x * x for x in range(5))\nprint(next(squares), next(squares))\nprint(sum(x * x for x in range(1000)))`,
      },
    ],
    runner: {
      code: `def fibs():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\ng = fibs()\nprint([next(g) for _ in range(10)])`,
    },
  },

  decorators: {
    intro:
      "A decorator is a function that wraps another function to add behavior — logging, timing, caching, access control — without changing the original code.",
    sections: [
      {
        title: "Applying a decorator",
        body: "`@wrap` above a def is short for `func = wrap(func)`.",
        code: `def loud(fn):\n    def wrapper(*args, **kwargs):\n        print(">>> calling", fn.__name__)\n        result = fn(*args, **kwargs)\n        print("<<< done")\n        return result\n    return wrapper\n\n@loud\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))`,
      },
      {
        title: "Real-world: caching",
        body: "functools.lru_cache memoizes results automatically.",
        code: `from functools import lru_cache\n\n@lru_cache\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint(fib(30))`,
      },
    ],
    runner: {
      code: `import time\n\ndef timed(fn):\n    def w(*a, **kw):\n        t0 = time.time()\n        r = fn(*a, **kw)\n        print(fn.__name__, round(time.time()-t0, 4), "s")\n        return r\n    return w\n\n@timed\ndef work():\n    return sum(range(1_000_000))\n\nprint(work())`,
    },
  },

  "type-hints": {
    intro:
      "Type hints annotate what types your code expects. Python doesn't enforce them at runtime, but tools like mypy and your IDE use them to catch bugs.",
    sections: [
      {
        title: "Basic hints",
        body: "name: type on parameters, and -> type after ) for the return type.",
        code: `def greet(name: str, times: int = 1) -> str:\n    return ("Hello, " + name + "! ") * times\n\nprint(greet("Ada", 2))`,
      },
      {
        title: "Container and Optional types",
        body:
          "list[int], dict[str, int], tuple[int, str]. For 'might be None', use `X | None` (or Optional[X]).",
        code: `def find(items: list[int], target: int) -> int | None:\n    for i, x in enumerate(items):\n        if x == target:\n            return i\n    return None\n\nprint(find([10, 20, 30], 20))\nprint(find([10, 20, 30], 99))`,
      },
    ],
    runner: {
      code: `def total(prices: list[float], tax: float = 0.18) -> float:\n    return round(sum(prices) * (1 + tax), 2)\n\nprint(total([120.0, 49.5, 200.0]))`,
    },
  },

  dataclasses: {
    intro:
      "A dataclass generates __init__, __repr__, and __eq__ for you. Perfect for classes that mostly hold data.",
    sections: [
      {
        title: "@dataclass",
        body: "Decorate the class and declare fields with type hints and (optionally) defaults.",
        code: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\np = Point(3, 4)\nprint(p)         # Point(x=3, y=4)\nprint(p == Point(3, 4))   # True`,
      },
      {
        title: "Defaults and methods",
        body: "Add regular methods alongside the fields.",
        code: `from dataclasses import dataclass, field\nfrom math import hypot\n\n@dataclass\nclass Player:\n    name: str\n    score: int = 0\n    tags: list[str] = field(default_factory=list)\n    def bonus(self):\n        return self.score * 2\n\nprint(Player("Ada"))`,
      },
    ],
    runner: {
      code: `from dataclasses import dataclass\n\n@dataclass\nclass Book:\n    title: str\n    pages: int\n    price: float\n\nb = Book("Fluent Python", 792, 899.0)\nprint(b)\nprint("per-page:", round(b.price / b.pages, 2))`,
    },
  },

  "files-and-json": {
    intro:
      "Reading and writing text files uses open() and the with statement. JSON — a universal data format — maps naturally to Python dicts and lists.",
    sections: [
      {
        title: "Text files (concept)",
        body:
          "with open('notes.txt', 'w') as f: f.write('hi')  → writes a file.\nwith open('notes.txt') as f: print(f.read())  → reads it back.\n\nThis in-browser runtime doesn't expose your real filesystem, so we demonstrate with StringIO below.",
      },
      {
        title: "JSON",
        body:
          "json.dumps(obj) → string. json.loads(s) → Python object. Use json.dump/load for files.",
        code: `import json\n\ndata = {"name": "Ada", "skills": ["math", "cs"], "active": True}\ns = json.dumps(data)\nprint(s)\n\nback = json.loads(s)\nprint(back["skills"][0])`,
      },
    ],
    runner: {
      code: `import io, json\n\n# Simulate a file with StringIO\nbuf = io.StringIO()\njson.dump({"score": 92, "grade": "A"}, buf)\n\nbuf.seek(0)\nprint("file contents:", buf.read())\n\nbuf.seek(0)\nobj = json.load(buf)\nprint("parsed:", obj, "grade is", obj["grade"])`,
    },
  },

  regex: {
    intro:
      "Regular expressions describe patterns in text. Python's `re` module can search, match, replace, and split.",
    sections: [
      {
        title: "Common patterns",
        body:
          "\\d digit, \\w word char, \\s whitespace, . any char, + one-or-more, * zero-or-more, ? optional, ^ start, $ end, [abc] set, (…) group.",
      },
      {
        title: "Using re",
        body: "re.search finds anywhere; re.findall returns all matches; re.sub replaces.",
        code: `import re\n\ntext = "Order #A-193 shipped on 2026-07-10"\nm = re.search(r"#([A-Z]-\\d+)", text)\nprint(m.group(1))\n\nprint(re.findall(r"\\d+", text))\nprint(re.sub(r"\\d", "*", text))`,
      },
    ],
    runner: {
      code: `import re\n\nemails = "Reach us at a@x.com or bob_1@example.co.in!"\nfound = re.findall(r"[\\w.+-]+@[\\w.-]+\\.\\w+", emails)\nprint(found)`,
    },
  },

  "async-await": {
    intro:
      "async / await lets a single thread juggle many I/O-bound tasks by pausing while waiting (network, files) and running other work in the meantime.",
    sections: [
      {
        title: "async def and await",
        body:
          "An async def defines a coroutine. Inside it, await pauses until another coroutine finishes. asyncio.run(main()) starts the event loop.",
        code: `import asyncio\n\nasync def task(name, delay):\n    await asyncio.sleep(delay)\n    return f"{name} done in {delay}s"\n\nasync def main():\n    results = await asyncio.gather(\n        task("A", 0.2),\n        task("B", 0.1),\n        task("C", 0.15),\n    )\n    for r in results: print(r)\n\nawait main()`,
      },
      {
        title: "When (not) to use it",
        body:
          "Great for I/O-heavy code — thousands of network requests, database calls, timers. Not useful for CPU-heavy work (use multiprocessing for that).",
      },
    ],
    runner: {
      code: `import asyncio\n\nasync def fetch(i):\n    await asyncio.sleep(0.05 * i)\n    return f"result {i}"\n\nasync def main():\n    xs = await asyncio.gather(*[fetch(i) for i in range(1, 6)])\n    print(xs)\n\nawait main()`,
    },
  },
};

export function getLessonContent(courseSlug: string, lessonSlug: string): LessonContent | undefined {
  if (courseSlug !== "python") return undefined;
  return P[lessonSlug];
}

