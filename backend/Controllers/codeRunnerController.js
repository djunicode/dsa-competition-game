import piston from 'piston-client';

// Fetch the test cases of the particular problem from the db
// According to the req.params.problemCode
const testCases = [
  [1, 2, 3],
  [34, 3, 37],
  [10, 30, 40],
  [50, 40, 90],
  [1000, 9999, 10999],
  [444, 600, 1044],
  [5000, 10000, 15000],
  [1000000, 5000000, 6000000],
];

const runCodePy = async (req, res) => {
  const client = piston({});

  const { pycode, functionName } = req.body;

  const runtimes = await client.runtimes();
  // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

  const result = await client.execute(
    'python',
    `print("Hello World!")
print("hi")`
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

const runCodeCpp = async (req, res) => {
  const client = piston({});

  const { pycode, functionName, returnType } = req.body;

  const runtimes = await client.runtimes();
  // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

  const result = await client.execute(
    'cpp',
    `#include <bits/stdc++.h>
using namespace std;
int add(int a, int b)
{
    return a + b;
}
int main()
{
    int t = ${testCases.length};

    while (t--)
    {
        if(add(${testCases[t][0]}, ${testCases[t][1]}) == ${testCases[t][1]}) {
            cout<<"passed";
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
