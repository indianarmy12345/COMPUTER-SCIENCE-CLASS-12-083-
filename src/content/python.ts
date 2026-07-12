

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

  // ================= NEW LESSONS =================

  "install-and-setup": {
    intro:
      "Before writing serious Python, install Python 3 on your machine and pick an editor. This lesson walks you through the whole setup — Windows, macOS, and Linux.",
    sections: [
      {
        title: "Install Python 3",
        body:
          "• Windows: download from python.org/downloads. On the first installer screen, tick 'Add python.exe to PATH', then click 'Install Now'.\n• macOS: install with Homebrew — `brew install python` — or the official installer.\n• Linux: it's usually already installed. Use your package manager, e.g. `sudo apt install python3 python3-pip`.\n\nAvoid Python 2 — it's end-of-life. Always use Python 3.10+ for modern features.",
      },
      {
        title: "Verify the install",
        body:
          "Open a terminal (Command Prompt / PowerShell on Windows, Terminal on macOS/Linux) and run:\n\n  python --version\n  python3 --version\n\nYou should see something like `Python 3.12.4`. If not, re-run the installer with 'Add to PATH' enabled.",
      },
      {
        title: "Pick an editor",
        body:
          "• VS Code (recommended for beginners) — free, fast, with a great Python extension. Install VS Code, then the 'Python' extension by Microsoft.\n• PyCharm Community — full-featured IDE built for Python.\n• IDLE — ships with Python. Simple and enough for your first few lessons.\n\nWhichever you pick, keep the built-in browser editor on this site open while you learn — it removes all setup friction.",
      },
      {
        title: "Your first script on your machine",
        body:
          "Create a file `hello.py`, put `print('Hello from my computer!')` in it, then run:\n\n  python hello.py\n\nCongratulations — that's the full 'install → write → run' loop that every Python project uses.",
      },
    ],
    runner: {
      code: `# You can also run Python right here — no install required.\nimport sys\nprint("Python version:", sys.version.split()[0])\nprint("Ready to code!")`,
    },
    keyPoints: [
      "Install Python 3 from python.org and tick 'Add to PATH' on Windows.",
      "Verify with `python --version` in a terminal.",
      "VS Code + the Python extension is the friendliest setup in 2025.",
    ],
  },

  "type-conversion": {
    intro:
      "Python is dynamically typed but it doesn't automatically convert between types. When you need a number from a string, or a string from a number, you convert (cast) explicitly.",
    sections: [
      {
        title: "The four workhorse conversions",
        body:
          "• int(x) — to integer. Truncates floats toward zero. Fails on non-numeric strings.\n• float(x) — to float.\n• str(x) — to a string representation.\n• bool(x) — Python's truthiness rules: 0, 0.0, '', [], {}, None → False; everything else → True.",
        code: `print(int("42"))       # 42\nprint(int(3.9))         # 3 (truncated, not rounded)\nprint(float("3.14"))    # 3.14\nprint(str(2025))        # "2025"\nprint(bool(""), bool("hi"), bool(0), bool(0.1))`,
      },
      {
        title: "Common pitfalls",
        body:
          "• int('3.5') raises ValueError — go via float first: int(float('3.5')).\n• Concatenating a number to a string needs str(): 'age ' + str(21).\n• Reading input() always gives a string — convert if you want to do math.",
        code: `age = 17\nprint("next year: " + str(age + 1))`,
      },
      {
        title: "Explicit is better than implicit",
        body:
          "Python won't guess for you. This is a feature — silent conversions cause bugs in other languages. Convert once at the boundary (where data enters your program) and keep the right type from there.",
      },
    ],
    runner: {
      code: `# Convert a list of numeric strings to floats and average them\nrows = ["12.5", "8", "17.25", "9.5"]\nnums = [float(x) for x in rows]\nprint("avg:", sum(nums) / len(nums))`,
    },
  },

  "nested-loops": {
    intro:
      "You can put a loop inside another loop. It's how you build tables, grids, and process 2-D data. Python also has a rarely-known `else` clause on loops.",
    sections: [
      {
        title: "Loops inside loops",
        body:
          "The inner loop runs to completion for every single iteration of the outer loop. Total iterations = outer × inner.",
        code: `for i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}x{j}={i*j}", end="  ")\n    print()`,
      },
      {
        title: "Iterating a 2-D grid",
        body: "A list of lists is a natural grid. Two nested loops walk every cell.",
        code: `grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nfor row in grid:\n    for cell in row:\n        print(cell, end=" ")\n    print()`,
      },
      {
        title: "The else clause on loops",
        body:
          "for/while can have an `else`. It runs only if the loop finished normally — not if `break` fired. Perfect for search loops.",
        code: `def find_factor(n):\n    for p in range(2, n):\n        if n % p == 0:\n            print(p, "divides", n)\n            break\n    else:\n        print(n, "is prime")\n\nfind_factor(21)\nfind_factor(23)`,
      },
    ],
    runner: {
      code: `# 5x5 multiplication table\nfor i in range(1, 6):\n    for j in range(1, 6):\n        print(f"{i*j:4}", end="")\n    print()`,
    },
  },

  recursion: {
    intro:
      "A recursive function calls itself. Every recursion needs a base case (when to stop) and a recursive case (a smaller subproblem).",
    sections: [
      {
        title: "The shape of a recursive function",
        body:
          "1. Check the base case — return a direct answer.\n2. Otherwise, call yourself with a smaller input and combine.",
        code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(6))    # 720`,
      },
      {
        title: "A classic: Fibonacci",
        body: "Elegant but slow (exponential). We fix it with a decorator in the Advanced module.",
        code: `def fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nprint([fib(i) for i in range(10)])`,
      },
      {
        title: "Recursion limits",
        body:
          "Python caps recursion depth (default 1000) to prevent stack overflows. For deep problems, prefer iteration or memoization. Use sys.setrecursionlimit() only if you truly know what you're doing.",
      },
    ],
    runner: {
      code: `def deep_sum(items):\n    total = 0\n    for x in items:\n        if isinstance(x, list):\n            total += deep_sum(x)\n        else:\n            total += x\n    return total\n\nprint(deep_sum([1, [2, [3, 4], 5], [6, [7, [8]]]]))`,
    },
  },

  docstrings: {
    intro:
      "A docstring is a string literal placed as the first statement in a module, function, class, or method. Python's help() and every IDE reads them.",
    sections: [
      {
        title: "Writing a docstring",
        body: "Use triple-quoted strings. First line is a short summary; leave a blank line before longer detail.",
        code: `def area(width, height):\n    """Return the area of a rectangle.\n\n    Both arguments must be non-negative numbers.\n    """\n    return width * height\n\nhelp(area)`,
      },
      {
        title: "Common styles",
        body:
          "Popular formats: Google, NumPy, and reStructuredText. Any of them is fine — just be consistent within a project.\n\nGoogle style:\n\n  Args:\n      width: horizontal size.\n      height: vertical size.\n  Returns:\n      Area.",
      },
      {
        title: "__doc__ attribute",
        body: "Docstrings become the __doc__ attribute — tools like Sphinx build full doc sites from them.",
        code: `def greet(name):\n    "Say hi to someone."\n    return "hi " + name\n\nprint(greet.__doc__)`,
      },
    ],
    runner: {
      code: `class BankAccount:\n    """A very small bank account.\n\n    Attributes:\n        balance: current balance in rupees.\n    """\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        """Add money to the account."""\n        self.balance += amount\n\nprint(BankAccount.__doc__)\nhelp(BankAccount.deposit)`,
    },
  },

  "pip-and-venv": {
    intro:
      "Real Python projects use packages from the Python Package Index (PyPI). pip installs them and virtual environments keep each project's packages isolated.",
    sections: [
      {
        title: "pip — the package installer",
        body:
          "Basic commands (run in your terminal, not in a Python REPL):\n\n  pip install requests\n  pip install \"django>=5.0\"\n  pip uninstall requests\n  pip list\n  pip show requests\n\nOn some systems you must use `pip3` or `python -m pip` instead of plain `pip`.",
      },
      {
        title: "Why virtual environments",
        body:
          "Different projects need different package versions. A venv is a private folder with its own Python and its own installed packages.\n\n  python -m venv .venv\n  source .venv/bin/activate      # macOS/Linux\n  .venv\\Scripts\\activate         # Windows\n  deactivate\n\nAfter activating, `pip install` only affects that venv.",
      },
      {
        title: "requirements.txt",
        body:
          "Freeze exact versions so teammates can reproduce your setup:\n\n  pip freeze > requirements.txt\n  pip install -r requirements.txt\n\nModern projects often use pyproject.toml + tools like uv or Poetry, but requirements.txt is still everywhere.",
      },
    ],
    runner: {
      code: `import sys\nprint("Python:", sys.version.split()[0])\nprint("Executable:", sys.executable)\n\nfor name in ["math", "json", "random", "statistics"]:\n    mod = __import__(name)\n    print(name, "->", (mod.__doc__ or "").split(chr(10))[0])`,
    },
    keyPoints: [
      "Use pip to install packages from PyPI.",
      "One virtual environment per project.",
      "Commit requirements.txt (or pyproject.toml), never the .venv folder.",
    ],
  },

  "properties-encapsulation": {
    intro:
      "Python doesn't have truly private attributes — it uses conventions instead. The @property decorator lets attribute access run code, so you can validate or compute values transparently.",
    sections: [
      {
        title: "The single-underscore convention",
        body: "Attributes prefixed with `_` are 'internal — please don't touch from outside'. Python doesn't stop you, but linters and other developers will respect it.",
        code: `class Counter:\n    def __init__(self):\n        self._value = 0\n    def bump(self):\n        self._value += 1`,
      },
      {
        title: "@property — computed attributes",
        body: "Turn a method into something callers access like a regular attribute.",
        code: `class Circle:\n    def __init__(self, r):\n        self.r = r\n    @property\n    def area(self):\n        return 3.14159 * self.r ** 2\n\nc = Circle(3)\nprint(c.area)   # no parentheses`,
      },
      {
        title: "Setters with validation",
        body: "Pair @property with a setter to enforce rules when a value is assigned.",
        code: `class Temperature:\n    def __init__(self, c):\n        self.celsius = c\n    @property\n    def celsius(self):\n        return self._c\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Below absolute zero!")\n        self._c = value\n\nt = Temperature(25)\nt.celsius = 30\nprint(t.celsius)`,
      },
      {
        title: "Name mangling with __double_underscore",
        body: "Names beginning with (but not ending in) two underscores get renamed to _ClassName__name. Not security — just avoids accidental clashes in subclasses.",
      },
    ],
    runner: {
      code: `class BankAccount:\n    def __init__(self, initial=0):\n        self._balance = initial\n    @property\n    def balance(self):\n        return self._balance\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("positive only")\n        self._balance += amount\n\na = BankAccount(100)\na.deposit(250)\nprint("balance:", a.balance)`,
    },
  },

  "classmethod-staticmethod": {
    intro:
      "Regular methods receive the instance (self). @classmethod receives the class (cls). @staticmethod receives nothing special — it's just a function that lives in the class namespace.",
    sections: [
      {
        title: "@classmethod — alternative constructors",
        body: "The classic use case: factory methods that build an instance from a different kind of input.",
        code: `class Date:\n    def __init__(self, year, month, day):\n        self.year, self.month, self.day = year, month, day\n    @classmethod\n    def from_string(cls, s):\n        y, m, d = map(int, s.split("-"))\n        return cls(y, m, d)\n    def __repr__(self):\n        return f"Date({self.year}, {self.month}, {self.day})"\n\nprint(Date.from_string("2026-07-12"))`,
      },
      {
        title: "@staticmethod — utility functions",
        body: "Use when a function is conceptually part of the class but doesn't need `self` or `cls`.",
        code: `class MathTools:\n    @staticmethod\n    def is_even(n):\n        return n % 2 == 0\n\nprint(MathTools.is_even(10))`,
      },
      {
        title: "Choosing between them",
        body: "• Need the instance's data? → regular method.\n• Need the class (subclass-friendly instantiate)? → @classmethod.\n• Need neither? → @staticmethod (or a module-level function).",
      },
    ],
    runner: {
      code: `class Pizza:\n    def __init__(self, ingredients):\n        self.ingredients = ingredients\n    def __repr__(self):\n        return f"Pizza({self.ingredients})"\n    @classmethod\n    def margherita(cls):\n        return cls(["mozzarella", "tomato", "basil"])\n    @classmethod\n    def pepperoni(cls):\n        return cls(["mozzarella", "tomato", "pepperoni"])\n\nprint(Pizza.margherita())\nprint(Pizza.pepperoni())`,
    },
  },

  "abstract-and-polymorphism": {
    intro:
      "Polymorphism means different objects can respond to the same message in their own way. Python leans on 'duck typing' but also offers formal abstract base classes.",
    sections: [
      {
        title: "Duck typing",
        body: "You don't have to share a base class — sharing a method name is enough. Python won't check types unless you ask it to.",
        code: `class Dog:\n    def speak(self): return "woof"\nclass Cat:\n    def speak(self): return "meow"\n\nfor a in [Dog(), Cat()]:\n    print(a.speak())`,
      },
      {
        title: "Abstract Base Classes (ABC)",
        body: "Use `abc.ABC` to declare a class that can't be instantiated directly and to mark methods subclasses MUST implement.",
        code: `from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): ...\n\nclass Square(Shape):\n    def __init__(self, side): self.side = side\n    def area(self): return self.side ** 2\n\nprint(Square(4).area())`,
      },
      {
        title: "Programming to an interface",
        body: "Write code that only cares about the methods it needs, not the exact class. This is how frameworks stay flexible.",
      },
    ],
    runner: {
      code: `from abc import ABC, abstractmethod\n\nclass Notifier(ABC):\n    @abstractmethod\n    def send(self, message): ...\n\nclass EmailNotifier(Notifier):\n    def send(self, message): print("EMAIL:", message)\n\nclass SMSNotifier(Notifier):\n    def send(self, message): print("SMS:", message)\n\ndef alert_all(channels, msg):\n    for c in channels: c.send(msg)\n\nalert_all([EmailNotifier(), SMSNotifier()], "Server is down!")`,
    },
  },

  "collections-module": {
    intro:
      "The `collections` module ships specialised data structures that solve everyday problems more cleanly than plain dicts and lists.",
    sections: [
      {
        title: "Counter — count anything",
        body: "Give it any iterable; it returns a dict-like object with counts.",
        code: `from collections import Counter\nvotes = ["a", "b", "a", "c", "b", "a"]\nprint(Counter(votes))\nprint(Counter("mississippi").most_common(3))`,
      },
      {
        title: "defaultdict — default values on missing keys",
        body: "No more `if key not in d: d[key] = []`. Just declare the default factory.",
        code: `from collections import defaultdict\ngroups = defaultdict(list)\nfor name in ["Ada", "Ken", "Alan", "Grace"]:\n    groups[name[0]].append(name)\nprint(dict(groups))`,
      },
      {
        title: "deque — O(1) appends and pops from both ends",
        body: "Perfect for queues and sliding windows. Lists are O(n) for pop(0).",
        code: `from collections import deque\nq = deque([1, 2, 3])\nq.appendleft(0)\nq.append(4)\nprint(q, q.popleft())`,
      },
      {
        title: "namedtuple — self-documenting tuples",
        body: "Give tuple fields names without writing a full class.",
        code: `from collections import namedtuple\nPoint = namedtuple("Point", "x y")\np = Point(3, 4)\nprint(p, p.x, p.y)`,
      },
    ],
    runner: {
      code: `from collections import Counter, defaultdict\n\ntext = "to be or not to be that is the question".split()\nprint(Counter(text).most_common(3))\n\nby_len = defaultdict(list)\nfor w in text:\n    by_len[len(w)].append(w)\nprint(dict(by_len))`,
    },
  },

  "itertools-functools": {
    intro:
      "`itertools` gives you memory-efficient iterator building blocks; `functools` gives you tools for higher-order functions like caching and partial application.",
    sections: [
      {
        title: "itertools essentials",
        body: "count, cycle, repeat — infinite iterators.\nchain, islice, takewhile, dropwhile — slicing and filtering.\ncombinations, permutations, product — combinatorics.",
        code: `from itertools import chain, islice, combinations\n\nprint(list(chain([1,2], [3,4])))\nprint(list(islice(range(100), 3, 8)))\nprint(list(combinations("ABCD", 2)))`,
      },
      {
        title: "functools.lru_cache — memoize slow functions",
        body: "Turns exponential Fibonacci into linear.",
        code: `from functools import lru_cache\n\n@lru_cache\ndef fib(n):\n    return n if n < 2 else fib(n-1) + fib(n-2)\n\nprint(fib(50))`,
      },
      {
        title: "functools.reduce & partial",
        body: "reduce folds an iterable into a single value. partial pre-fills some arguments of a function.",
        code: `from functools import reduce, partial\n\nprint(reduce(lambda a, b: a * b, range(1, 6)))  # 120\n\ndef power(base, exp): return base ** exp\nsquare = partial(power, exp=2)\nprint([square(x) for x in range(5)])`,
      },
    ],
    runner: {
      code: `from itertools import groupby\n\ndata = [("a", 1), ("a", 2), ("b", 3), ("b", 4), ("a", 5)]\ndata.sort(key=lambda t: t[0])\nfor k, group in groupby(data, key=lambda t: t[0]):\n    print(k, [v for _, v in group])`,
    },
  },

  "pathlib-os": {
    intro:
      "`pathlib` is the modern, object-oriented way to work with filesystem paths in Python. It replaces most of the string juggling you'd do with os.path.",
    sections: [
      {
        title: "Building paths",
        body: "Use `/` to join parts — works on Windows and Unix. Path objects have handy properties: .name, .stem, .suffix, .parent.",
        code: `from pathlib import Path\np = Path("data") / "reports" / "2026.csv"\nprint(p)\nprint(p.name, p.stem, p.suffix, p.parent)`,
      },
      {
        title: "Checking and iterating",
        body: "path.exists(), .is_file(), .is_dir(), .iterdir(), .glob('*.py'), .rglob() recurse into subfolders.",
      },
      {
        title: "Reading and writing files",
        body: "Path.read_text() / write_text() / read_bytes() / write_bytes() cover 90% of tiny scripts without needing open().",
      },
      {
        title: "When you still want os",
        body: "os.getenv() reads environment variables. os.getcwd() gives the current working directory. os.remove/rename are also common — though pathlib has p.unlink() and p.rename().",
      },
    ],
    runner: {
      code: `from pathlib import PurePosixPath, PureWindowsPath\n\np = PurePosixPath("/home/ada/notes/day1.txt")\nprint("parts:", p.parts)\nprint("parent:", p.parent)\nprint("suffix:", p.suffix)\n\nw = PureWindowsPath("C:/Users/Ada/Documents/report.pdf")\nprint("windows:", w, w.drive)`,
    },
  },

  "datetime-time": {
    intro:
      "The `datetime` module handles dates, times, and timezones. `time` gives lower-level clock access. Both live in the standard library.",
    sections: [
      {
        title: "date, time, datetime",
        body: "date — just a calendar date. time — clock time. datetime — the two combined. All are immutable.",
        code: `from datetime import date, datetime\ntoday = date.today()\nnow = datetime.now()\nprint(today, now)\nprint(now.year, now.hour)`,
      },
      {
        title: "timedelta — durations & arithmetic",
        body: "Subtract two datetimes → timedelta. Add a timedelta to shift a date.",
        code: `from datetime import datetime, timedelta\ndeadline = datetime(2026, 12, 31)\nprint("days to go:", (deadline - datetime.now()).days)\nprint("in 90 days:", datetime.now() + timedelta(days=90))`,
      },
      {
        title: "Formatting: strftime / strptime",
        body: "strftime turns a datetime into a string; strptime parses a string. Common codes: %Y %m %d %H %M %S %A %B.",
        code: `from datetime import datetime\nprint(datetime.now().strftime("%A, %d %B %Y %H:%M"))\nd = datetime.strptime("2026-07-12", "%Y-%m-%d")\nprint(d)`,
      },
      {
        title: "Timezones",
        body: "Use `datetime.now(tz)` with `zoneinfo.ZoneInfo('Asia/Kolkata')` for aware datetimes. Naive datetimes (no tz) are fine locally but dangerous when data travels.",
      },
    ],
    runner: {
      code: `from datetime import datetime, timedelta\n\nbirthday = datetime(2010, 4, 22, 8, 30)\nage = datetime.now() - birthday\nprint("You have lived approximately", age.days, "days.")\nprint("Next 1000-day milestone:", birthday + timedelta(days=(age.days // 1000 + 1) * 1000))`,
    },
  },

  logging: {
    intro:
      "`print()` is fine for tiny scripts, but real programs use the `logging` module — it supports levels, format, multiple destinations, and can be silenced or amplified without touching code.",
    sections: [
      {
        title: "The five levels",
        body: "DEBUG < INFO < WARNING < ERROR < CRITICAL. Setting a level shows that level and everything above it.",
        code: `import logging\nlogging.basicConfig(level=logging.INFO,\n                    format="%(levelname)s %(name)s: %(message)s")\nlog = logging.getLogger("app")\nlog.debug("won't show")\nlog.info("starting up")\nlog.warning("cache miss")\nlog.error("payment failed")`,
      },
      {
        title: "Loggers per module",
        body: "Use `logging.getLogger(__name__)` in each module. Every log line tells you where it came from, and you can turn one module's logs on/off.",
      },
      {
        title: "Handlers and formatters",
        body: "A handler decides where log records go (console, file, HTTP). A formatter decides how they look. logging.basicConfig is a shortcut; for larger apps use logging.config.dictConfig.",
      },
      {
        title: "Why not just print?",
        body: "logging lets you control verbosity globally, adds timestamps and levels, and separates output for humans from diagnostics for developers.",
      },
    ],
    runner: {
      code: `import logging\nlogging.basicConfig(level=logging.DEBUG,\n                    format="%(asctime)s %(levelname)-8s %(message)s",\n                    datefmt="%H:%M:%S")\n\nlog = logging.getLogger("demo")\nfor i in range(3):\n    log.debug("loop iter %d", i)\n    if i == 1:\n        log.warning("halfway through")\nlog.info("done")`,
    },
  },

  "testing-basics": {
    intro:
      "Tests let you change code without fear. Python ships `unittest`; `pytest` is the community favourite for its terser syntax.",
    sections: [
      {
        title: "unittest — batteries included",
        body: "Subclass unittest.TestCase, prefix methods with test_, and use self.assertEqual / assertTrue / assertRaises.",
        code: `import unittest\n\ndef add(a, b): return a + b\n\nclass AddTests(unittest.TestCase):\n    def test_positive(self):\n        self.assertEqual(add(2, 3), 5)\n    def test_negative(self):\n        self.assertEqual(add(-1, 1), 0)\n\nunittest.main(argv=[""], exit=False)`,
      },
      {
        title: "pytest — plain functions",
        body: "Install with `pip install pytest`. Tests are just functions starting with test_ that use assert. Run `pytest` and it discovers them.\n\n  # test_math.py\n  from math_utils import add\n  def test_add():\n      assert add(2, 3) == 5",
      },
      {
        title: "Structuring tests",
        body: "Put tests in a `tests/` folder next to your code. Aim for tests that are fast, isolated, and named after the behaviour they check. Test the tricky edges — empty input, zero, negatives, huge values.",
      },
    ],
    runner: {
      code: `import unittest\n\ndef reverse(s):\n    return s[::-1]\n\nclass ReverseTests(unittest.TestCase):\n    def test_hello(self):\n        self.assertEqual(reverse("hello"), "olleh")\n    def test_empty(self):\n        self.assertEqual(reverse(""), "")\n    def test_palindrome(self):\n        self.assertEqual(reverse("abba"), "abba")\n\nunittest.main(argv=[""], exit=False, verbosity=2)`,
    },
  },

  "http-requests": {
    intro:
      "Most modern programs talk to web APIs over HTTP. The `requests` library is the de-facto way to do that in Python — its slogan is 'HTTP for humans'.",
    sections: [
      {
        title: "Installing and importing",
        body: "  pip install requests\n\nThen `import requests`.",
      },
      {
        title: "GET requests",
        body: "requests.get(url) returns a Response object. Read text, json, status_code, headers.",
        code: `import requests\nr = requests.get("https://httpbin.org/json")\nprint(r.status_code)\nprint(r.json())`,
      },
      {
        title: "POST, JSON bodies, headers",
        body: "Send data via `data=` (form) or `json=` (JSON). Custom headers via `headers=`. Query strings via `params=`.",
        code: `# Conceptual pattern for a real script:\n# r = requests.post("https://api.example.com/items",\n#                   json={"name": "Widget", "price": 9.99},\n#                   headers={"Authorization": "Bearer TOKEN"})\n# r.raise_for_status()\n# print(r.json())`,
      },
      {
        title: "Status codes and errors",
        body: "2xx = success, 3xx = redirect, 4xx = your fault, 5xx = server's fault. Call r.raise_for_status() to turn a bad response into an exception.",
      },
    ],
    runner: {
      code: `try:\n    import requests\n    r = requests.get("https://httpbin.org/get", params={"lang": "python"})\n    r.raise_for_status()\n    data = r.json()\n    print("You called:", data.get("url"))\n    print("Query args:", data.get("args"))\nexcept Exception as e:\n    print("Skipped (sandbox network limitation):", type(e).__name__)`,
    },
  },

  "performance-tips": {
    intro:
      "Python is fast enough for most work — until it isn't. Before optimising, measure. Then apply a handful of well-known techniques.",
    sections: [
      {
        title: "Measure first — timeit & cProfile",
        body: "timeit measures small snippets accurately. cProfile shows which functions dominate a whole program's runtime. Never optimise on gut feel.",
        code: `import timeit\nt1 = timeit.timeit("sum(range(10000))", number=1000)\nt2 = timeit.timeit("total = 0\\nfor i in range(10000): total += i", number=1000)\nprint(f"builtin sum: {t1:.3f}s")\nprint(f"manual loop: {t2:.3f}s")`,
      },
      {
        title: "Choose the right data structure",
        body: "• Membership test on 10k items? set / dict → O(1). list → O(n).\n• Frequent pops from the front? collections.deque, not a list.\n• Building a string in a loop? join a list at the end, don't `+=`.",
      },
      {
        title: "Prefer built-ins and comprehensions",
        body: "sum, map, min, max, any, all and comprehensions run in C. They are almost always faster than the equivalent hand-written Python loop.",
      },
      {
        title: "Cache expensive results",
        body: "functools.lru_cache is a one-line speedup for pure, deterministic functions.",
      },
      {
        title: "When Python isn't enough",
        body: "Try NumPy for numeric arrays, multiprocessing for CPU-bound work, async I/O for network-bound work, or a compiled helper (Cython, Rust, C extensions) as a last resort.",
      },
    ],
    runner: {
      code: `import time\n\nN = 200_000\ndata_list = list(range(N))\ndata_set  = set(data_list)\ntargets   = [N - 1, N // 2, -1]\n\nt0 = time.perf_counter()\nfor t in targets: t in data_list\nprint("list:", round(time.perf_counter() - t0, 4), "s")\n\nt0 = time.perf_counter()\nfor t in targets: t in data_set\nprint("set: ", round(time.perf_counter() - t0, 6), "s")`,
    },
    keyPoints: [
      "Measure with timeit/cProfile before you touch any code.",
      "Right data structure > clever code.",
      "Use built-ins, comprehensions, and lru_cache before reaching for anything exotic.",
    ],
  },
};

export function getLessonContent(courseSlug: string, lessonSlug: string): LessonContent | undefined {
  if (courseSlug !== "python") return undefined;
  return P[lessonSlug];
}


