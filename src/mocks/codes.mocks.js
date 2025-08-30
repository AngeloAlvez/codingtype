const codingMock = {
  "data": {
    "react": [
      {
        "id": "react-1",
        "code": "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Você clicou {count} vezes</p>\n      <button onClick={() => setCount(count + 1)}>\n        Clique aqui\n      </button>\n    </div>\n  );\n}"
      },
      {
        "id": "react-2",
        "code": "import React, { useEffect } from 'react';\n\nfunction ExampleComponent({ userId }) {\n  useEffect(() => {\n    const subscription = API.subscribe(userId);\n    return () => {\n      API.unsubscribe(subscription);\n    };\n  }, [userId]);\n\n  return <p>Observando o usuário {userId}</p>;\n}"
      },
      {
        "id": "react-3",
        "code": "import React from 'react';\n\nfunction Welcome(props) {\n  return <h1>Olá, {props.name}</h1>;\n}\n\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Sara\" />\n      <Welcome name=\"Cahal\" />\n    </div>\n  );\n}"
      },
      {
        "id": "react-4",
        "code": "import React from 'react';\n\nfunction Greeting({ isLoggedIn }) {\n  if (isLoggedIn) {\n    return <UserGreeting />;\n  }\n  return <GuestGreeting />;\n}\n\nfunction UserGreeting() {\n  return <h1>Bem-vindo de volta!</h1>;\n}\n\nfunction GuestGreeting() {\n  return <h1>Por favor, faça o login.</h1>;\n}"
      },
      {
        "id": "react-5",
        "code": "const numbers = [1, 2, 3, 4, 5];\nconst listItems = numbers.map((number) =>\n  <li key={number.toString()}>\n    {number}\n  </li>\n);\n\nReactDOM.render(\n  <ul>{listItems}</ul>,\n  document.getElementById('root')\n);"
      },
      {
        "id": "react-6",
        "code": "import React, { useReducer } from 'react';\n\nconst initialState = {count: 0};\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return {count: state.count + 1};\n    case 'decrement':\n      return {count: state.count - 1};\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  return (\n    <>\n      Count: {state.count}\n      <button onClick={() => dispatch({type: 'decrement'})}>-</button>\n      <button onClick={() => dispatch({type: 'increment'})}>+</button>\n    </>\n  );\n}"
      },
      {
        "id": "react-7",
        "code": "import React, { createContext, useContext } from 'react';\n\nconst ThemeContext = createContext('light');\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value=\"dark\">\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n  return <button>Current theme is {theme}</button>;\n}"
      },
      {
        "id": "react-8",
        "code": "import React from 'react';\n\nclass Clock extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {date: new Date()};\n  }\n\n  componentDidMount() {\n    this.timerID = setInterval(\n      () => this.tick(),\n      1000\n    );\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.timerID);\n  }\n\n  tick() {\n    this.setState({\n      date: new Date()\n    });\n  }\n\n  render() {\n    return (\n      <div>\n        <h1>Hello, world!</h1>\n        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>\n      </div>\n    );\n  }\n}"
      },
      {
        "id": "react-9",
        "code": "import React, { useState } from 'react';\n\nfunction FormExample() {\n  const [name, setName] = useState('');\n\n  const handleSubmit = (event) => {\n    alert('A name was submitted: ' + name);\n    event.preventDefault();\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <label>\n        Name:\n        <input type=\"text\" value={name} onChange={e => setName(e.target.value)} />\n      </label>\n      <input type=\"submit\" value=\"Submit\" />\n    </form>\n  );\n}"
      },
      {
        "id": "react-10",
        "code": "import React from 'react';\n\nfunction BoilingVerdict(props) {\n  if (props.celsius >= 100) {\n    return <p>The water would boil.</p>;\n  }\n  return <p>The water would not boil.</p>;\n}"
      },
      {
        "id": "react-11",
        "code": "import React, { useRef } from 'react';\n\nfunction TextInputWithFocusButton() {\n  const inputEl = useRef(null);\n  const onButtonClick = () => {\n    inputEl.current.focus();\n  };\n  return (\n    <>\n      <input ref={inputEl} type=\"text\" />\n      <button onClick={onButtonClick}>Focus the input</button>\n    </>\n  );\n}"
      },
      {
        "id": "react-12",
        "code": "import React from 'react';\n\nconst MyComponent = React.forwardRef((props, ref) => (\n  <button ref={ref}>\n    {props.children}\n  </button>\n));"
      },
      {
        "id": "react-13",
        "code": "import React, { useState, useMemo } from 'react';\n\nfunction ExpensiveComponent({ num }) {\n  const expensiveCalculation = (num) => {\n    console.log('Calculating...');\n    for (let i = 0; i < 1000000000; i++) {}\n    return num * 2;\n  };\n\n  const calculation = useMemo(() => expensiveCalculation(num), [num]);\n\n  return <div>{calculation}</div>;\n}"
      },
      {
        "id": "react-14",
        "code": "import React, { Profiler } from 'react';\n\nfunction onRenderCallback(id, phase, actualDuration) {\n  console.log(`${id}'s ${phase} phase took ${actualDuration}ms`);\n}\n\nfunction App() {\n  return (\n    <Profiler id=\"MyComponent\" onRender={onRenderCallback}>\n      <MyComponent />\n    </Profiler>\n  );\n}"
      },
      {
        "id": "react-15",
        "code": "import React, { Suspense } from 'react';\n\nconst OtherComponent = React.lazy(() => import('./OtherComponent'));\n\nfunction MyComponent() {\n  return (\n    <div>\n      <Suspense fallback={<div>Loading...</div>}>\n        <OtherComponent />\n      </Suspense>\n    </div>\n  );\n}"
      }
    ],
    "node": [
      {
        "id": "node-1",
        "code": "const http = require('http');\n\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Olá, Mundo!');\n});\n\nserver.listen(port, hostname, () => {\n  console.log(`Servidor rodando em http://${hostname}:${port}/`);\n});"
      },
      {
        "id": "node-2",
        "code": "const fs = require('fs');\n\nfs.readFile('arquivo.txt', 'utf8', (err, data) => {\n  if (err) {\n    console.error(err);\n    return;\n  }\n  console.log(data);\n});"
      },
      {
        "id": "node-3",
        "code": "const express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.get('/', (req, res) => {\n  res.send('Olá do Express!');\n});\n\napp.listen(port, () => {\n  console.log(`Exemplo de app escutando na porta ${port}`);\n});"
      },
      {
        "id": "node-4",
        "code": "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Erro ao buscar dados:', error);\n  }\n}\n\nfetchData();"
      },
      {
        "id": "node-5",
        "code": "// my-module.js\nconst sayHello = () => {\n  console.log('Olá!');\n};\n\nmodule.exports = { sayHello };\n\n// main.js\nconst myModule = require('./my-module');\nmyModule.sayHello();"
      },
      {
        "id": "node-6",
        "code": "const EventEmitter = require('events');\n\nclass MyEmitter extends EventEmitter {}\n\nconst myEmitter = new MyEmitter();\nmyEmitter.on('event', () => {\n  console.log('an event occurred!');\n});\nmyEmitter.emit('event');"
      },
      {
        "id": "node-7",
        "code": "const path = require('path');\n\nconst myPath = '/foo/bar/baz/asdf/quux.html';\n\nconsole.log(path.dirname(myPath));\nconsole.log(path.basename(myPath));\nconsole.log(path.extname(myPath));"
      },
      {
        "id": "node-8",
        "code": "const os = require('os');\n\nconsole.log('OS Type:', os.type());\nconsole.log('Platform:', os.platform());\nconsole.log('Total Memory:', os.totalmem());\nconsole.log('Free Memory:', os.freemem());"
      },
      {
        "id": "node-9",
        "code": "const zlib = require('zlib');\nconst gzip = zlib.createGzip();\nconst fs = require('fs');\n\nconst inp = fs.createReadStream('input.txt');\nconst out = fs.createWriteStream('input.txt.gz');\n\ninp.pipe(gzip).pipe(out);"
      },
      {
        "id": "node-10",
        "code": "const https = require('https');\n\nhttps.get('https://encrypted.google.com/', (res) => {\n  console.log('statusCode:', res.statusCode);\n  console.log('headers:', res.headers);\n\n  res.on('data', (d) => {\n    process.stdout.write(d);\n  });\n\n}).on('error', (e) => {\n  console.error(e);\n});"
      },
      {
        "id": "node-11",
        "code": "const dns = require('dns');\n\ndns.lookup('google.com', (err, address, family) => {\n  console.log('address: %j family: IPv%s', address, family);\n});"
      },
      {
        "id": "node-12",
        "code": "const crypto = require('crypto');\n\nconst secret = 'abcdefg';\nconst hash = crypto.createHmac('sha256', secret)\n                   .update('I love cupcakes')\n                   .digest('hex');\nconsole.log(hash);"
      },
      {
        "id": "node-13",
        "code": "const readline = require('readline');\n\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout\n});\n\nrl.question('What is your name? ', (name) => {\n  console.log(`Hello, ${name}!`);\n  rl.close();\n});"
      },
      {
        "id": "node-14",
        "code": "const cluster = require('cluster');\nconst http = require('http');\nconst numCPUs = require('os').cpus().length;\n\nif (cluster.isMaster) {\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n} else {\n  http.createServer((req, res) => {\n    res.writeHead(200);\n    res.end('hello world\\n');\n  }).listen(8000);\n}"
      },
      {
        "id": "node-15",
        "code": "const assert = require('assert');\n\nfunction add(a, b) {\n  return a + b;\n}\n\nassert.strictEqual(add(1, 2), 3, '1 + 2 should be 3');\nassert.throws(() => add('1', 2), TypeError, 'Should throw a TypeError');"
      }
    ],
    "java": [
      {
        "id": "java-1",
        "code": "import org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class GreetingController {\n\n    @GetMapping(\"/greeting\")\n    public String greeting(@RequestParam(value = \"name\", defaultValue = \"World\") String name) {\n        return \"Hello, \" + name;\n    }\n}"
      },
      {
        "id": "java-2",
        "code": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
      },
      {
        "id": "java-3",
        "code": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class ListExample {\n    public static void main(String[] args) {\n        List<String> fruits = new ArrayList<>();\n        fruits.add(\"Apple\");\n        fruits.add(\"Banana\");\n        fruits.add(\"Orange\");\n\n        for (String fruit : fruits) {\n            System.out.println(fruit);\n        }\n    }\n}"
      },
      {
        "id": "java-4",
        "code": "public class Car {\n    private String brand;\n    private int year;\n\n    public Car(String brand, int year) {\n        this.brand = brand;\n        this.year = year;\n    }\n\n    public void displayInfo() {\n        System.out.println(\"Brand: \" + brand + \", Year: \" + year);\n    }\n}"
      },
      {
        "id": "java-5",
        "code": "import java.util.stream.Collectors;\nimport java.util.List;\nimport java.util.Arrays;\n\npublic class StreamExample {\n  public static void main(String[] args) {\n    List<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\");\n    List<String> filteredNames = names.stream()\n                                      .filter(name -> !name.equals(\"Bob\"))\n                                      .collect(Collectors.toList());\n    System.out.println(filteredNames);\n  }\n}"
      },
      {
        "id": "java-6",
        "code": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class MapExample {\n    public static void main(String[] args) {\n        Map<String, Integer> studentScores = new HashMap<>();\n        studentScores.put(\"Alice\", 95);\n        studentScores.put(\"Bob\", 88);\n        studentScores.put(\"Charlie\", 92);\n\n        System.out.println(\"Bob's score: \" + studentScores.get(\"Bob\"));\n    }\n}"
      },
      {
        "id": "java-7",
        "code": "import java.io.File;\nimport java.io.IOException;\n\npublic class FileCreation {\n    public static void main(String[] args) {\n        try {\n            File myObj = new File(\"filename.txt\");\n            if (myObj.createNewFile()) {\n                System.out.println(\"File created: \" + myObj.getName());\n            } else {\n                System.out.println(\"File already exists.\");\n            }\n        } catch (IOException e) {\n            System.out.println(\"An error occurred.\");\n            e.printStackTrace();\n        }\n    }\n}"
      },
      {
        "id": "java-8",
        "code": "public class Animal {\n    public void makeSound() {\n        System.out.println(\"Some generic animal sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println(\"Woof\");\n    }\n}"
      },
      {
        "id": "java-9",
        "code": "public interface Drawable {\n    void draw();\n}\n\nclass Circle implements Drawable {\n    public void draw() {\n        System.out.println(\"Drawing a circle\");\n    }\n}"
      },
      {
        "id": "java-10",
        "code": "public class ExceptionExample {\n    public static void main(String[] args) {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Cannot divide by zero!\");\n        }\n    }\n}"
      },
      {
        "id": "java-11",
        "code": "public class Singleton {\n    private static Singleton instance;\n\n    private Singleton() {}\n\n    public static Singleton getInstance() {\n        if (instance == null) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n}"
      },
      {
        "id": "java-12",
        "code": "import java.util.Optional;\n\npublic class OptionalExample {\n    public static void main(String[] args) {\n        Optional<String> name = Optional.of(\"John\");\n        System.out.println(name.orElse(\"Unknown\"));\n\n        Optional<String> emptyName = Optional.empty();\n        System.out.println(emptyName.orElse(\"Unknown\"));\n    }\n}"
      },
      {
        "id": "java-13",
        "code": "import java.time.LocalDate;\nimport java.time.format.DateTimeFormatter;\n\npublic class DateExample {\n    public static void main(String[] args) {\n        LocalDate today = LocalDate.now();\n        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(\"dd-MM-yyyy\");\n        System.out.println(today.format(formatter));\n    }\n}"
      },
      {
        "id": "java-14",
        "code": "public class StringBuilderExample {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"Hello\");\n        sb.append(\" World\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "id": "java-15",
        "code": "public class ThreadExample extends Thread {\n    public void run() {\n        System.out.println(\"This code is running in a thread\");\n    }\n\n    public static void main(String[] args) {\n        ThreadExample thread = new ThreadExample();\n        thread.start();\n    }\n}"
      }
    ],
    "swift": [
      {
        "id": "swift-1",
        "code": "import Foundation\n\nlet name = \"Taylor Swift\"\nvar age = 32\nage += 1\n\nprint(\"Olá, meu nome é \\(name) e eu tenho \\(age) anos.\")"
      },
      {
        "id": "swift-2",
        "code": "import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        Text(\"Olá, mundo!\")\n            .padding()\n    }\n}\n\nstruct ContentView_Previews: PreviewProvider {\n    static var previews: some View {\n        ContentView()\n    }\n}"
      },
      {
        "id": "swift-3",
        "code": "func greet(person: String) -> String {\n    let greeting = \"Olá, \" + person + \"!\"\n    return greeting\n}\n\nprint(greet(person: \"Dave\"))"
      },
      {
        "id": "swift-4",
        "code": "let names = [\"Anna\", \"Alex\", \"Brian\", \"Jack\"]\n\nfor name in names {\n    print(\"Olá, \\(name)!\")\n}\n\nif names.isEmpty {\n    print(\"Ninguém para cumprimentar.\")\n}"
      },
      {
        "id": "swift-5",
        "code": "struct Dog {\n    var name: String\n    var age: Int\n\n    func bark() {\n        print(\"Au au!\")\n    }\n}\n\nlet myDog = Dog(name: \"Fido\", age: 5)\nmyDog.bark()"
      },
      {
        "id": "swift-6",
        "code": "enum CompassPoint {\n    case north\n    case south\n    case east\n    case west\n}\n\nvar directionToHead = CompassPoint.west\ndirectionToHead = .east"
      },
      {
        "id": "swift-7",
        "code": "class Vehicle {\n    var currentSpeed = 0.0\n    var description: String {\n        return \"traveling at \\(currentSpeed) miles per hour\"\n    }\n    func makeNoise() {\n    }\n}\n\nclass Bicycle: Vehicle {\n    var hasBasket = false\n}"
      },
      {
        "id": "swift-8",
        "code": "let somePoint = (1, 1)\nswitch somePoint {\ncase (0, 0):\n    print(\"\\(somePoint) is at the origin\")\ncase (_, 0):\n    print(\"\\(somePoint) is on the x-axis\")\ncase (0, _):\n    print(\"\\(somePoint) is on the y-axis\")\ndefault:\n    print(\"\\(somePoint) is outside of the box\")\n}"
      },
      {
        "id": "swift-9",
        "code": "let numbers = [1, 2, 3, 4, 5]\nlet doubledNumbers = numbers.map { $0 * 2 }\nprint(doubledNumbers)"
      },
      {
        "id": "swift-10",
        "code": "var optionalName: String? = \"John Appleseed\"\nif let name = optionalName {\n    print(\"Hello, \\(name)\")\n} else {\n    print(\"No name available\")\n}"
      },
      {
        "id": "swift-11",
        "code": "protocol Togglable {\n    mutating func toggle()\n}\n\nenum OnOffSwitch: Togglable {\n    case off, on\n    mutating func toggle() {\n        switch self {\n        case .off:\n            self = .on\n        case .on:\n            self = .off\n        }\n    }\n}"
      },
      {
        "id": "swift-12",
        "code": "func makeIncrementer(forIncrement amount: Int) -> () -> Int {\n    var runningTotal = 0\n    func incrementer() -> Int {\n        runningTotal += amount\n        return runningTotal\n    }\n    return incrementer\n}\n\nlet incrementByTen = makeIncrementer(forIncrement: 10)\nprint(incrementByTen())\nprint(incrementByTen())"
      },
      {
        "id": "swift-13",
        "code": "extension Double {\n    var km: Double { return self * 1_000.0 }\n    var m: Double { return self }\n}\n\nlet oneInch = 25.4.m\nprint(\"One inch is \\(oneInch) meters\")"
      },
      {
        "id": "swift-14",
        "code": "do {\n    try canThrowAnError()\n    print(\"Success!\")\n} catch {\n    print(\"An error occurred.\")\n}"
      },
      {
        "id": "swift-15",
        "code": "import Combine\n\nlet publisher = (1...5).publisher\n\nlet cancellable = publisher\n    .sink {\n        print($0)\n    }"
      }
    ]
  }
}

export default codingMock;