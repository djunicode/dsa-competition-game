import piston from 'piston-client';
import problemStatement from '../Model/problemStatements.js';

// Fetch the test cases of the particular problem from the db
// According to the req.params.problemCode
const testCases = `1 2\n3\n34 3\n37\n10 30\n40\n50 40\n90\n1000 9999\n10999\n444 600\n1044\n5000 10000\n15000\n1000000 5000000\n6000000\n`;
const testNum = 8;

const runCodePy = async (req, res) => {
  let problem;
  try {
    // const problemID = req.params._id;
    const problemId = req.params.problemId;
    problem = await problemStatement.findById(problemId);
    if (problem === null) {
      throw new Error("Couldn't find the given id");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }
  console.log(problem);
  const client = piston({});

  const { pycode, functionName } = req.body;
  console.log('HI FROM CODE RUNNER', pycode, functionName);

  const runtimes = await client.runtimes();
  // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

  const result = await client.execute(
    'python',
    `tc = """${problem.testcases}"""
dtc = [int(s) for s in tc.split() if s.isdigit()]


${pycode}


t = ${problem.testcaseNum}
testCasesValidation = []
for i in range(t):
    if(${functionName}(dtc[3*i], dtc[3*i+1]) == dtc[3*i+2]):
        testCasesValidation.append(1)
    else:
        testCasesValidation.append(0)
print(testCasesValidation, end="")
`
  );
  // { language: 'python', version: '3.9.4', run: {
  //     stdout: 'Hello World!\n',
  //     stderr: '',
  //     code: 0,
  //     signal: null,
  //     output: 'Hello World!\n'
  // }}
  if (result.run.stderr === '') {
    res.status(200).json({ language: req.param.lang, result });
  } else {
    res.status(400).json({ language: req.param.lang, result });
  }
};

// Incomplete implementation
const runCodeCpp = async (req, res) => {
  const client = piston({});

  const { pycode, functionName, returnType } = req.body;

  const runtimes = await client.runtimes();
  // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

  const result = await client.execute(
    'c++',
    `#include <bits/stdc++.h>
using namespace std;

int add(int a, int b)
{
    return a - b;
}
int main()
{
    string tc = "1 2\n3\n34 3\n37";
    int t = 2;
    int n;
    std::stringstream stream(tc);
    int a[t], b[t], c[t];
    int count = 0;
    int i = 0;
    while (stream >> n)
    {
        switch (count)
        {
        case 0:
        {
            a[i] = n;
            count++;
            break;
        }
        case 1:
        {
            b[i] = n;
            count++;
            break;
        }
        case 2:
        {
            c[i] = n;
            count = 0;
            i++;
        }
        }
    }
    for (int j = 0; j < t; j++)
    {
        cout << a[j] << " " << b[j] << " " << c[j] << "\n";
    }
    for (int i = 0; i < t; i++)
    {
        if (add(a[i], b[i]) == c[i])
        {
            cout << "PASS\n";
        }
        else
        {
            cout << "FAILED at Test case " << i + 1 << "\n";
            break;
        }
    }
    return 0;
}`
  );
  // { language: 'python', version: '3.9.4', run: {
  //     stdout: 'Hello World!\n',
  //     stderr: '',
  //     code: 0,
  //     signal: null,
  //     output: 'Hello World!\n'
  // }}
  res.status(200).json({ language: req.param.lang, result });
};

export { runCodeCpp, runCodePy };
