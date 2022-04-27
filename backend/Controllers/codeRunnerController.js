import piston from 'piston-client';

// Fetch the test cases of the particular problem from the db
// According to the req.params.problemCode
const testCases = `1 2
3
34 3
37
10 30
40
50 40
90
1000 9999
10999
444 600
1044
5000 10000
15000
1000000 5000000
6000000`;
const testNum = 8;

const runCodePy = async (req, res) => {
  const client = piston({});

  const { pycode, functionName } = req.body;

  const runtimes = await client.runtimes();
  // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]

  const result = await client.execute(
    'python',
    `tc = """${testCases}"""
dtc = [int(s) for s in tc.split() if s.isdigit()]
print(dtc)


${pycode}


t = ${testNum}
for i in range(t):
    if(add(dtc[3*i], dtc[3*i+1]) == dtc[3*i+2]):
        print(i, "Pass")
    else:
        print("FAILED AT TESTCASE", (i+1))
        break
`
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
