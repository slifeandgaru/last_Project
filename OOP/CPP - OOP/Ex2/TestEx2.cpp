#include <vector>

#include "Employee.cpp"
#include "Person.cpp"
#include "Executive.cpp"
#include <iostream>

using namespace std;

int main()
{
    cout << "---------- Executive ----------" << endl;
    vector<Executive> a;
    a.push_back(Executive(12, "khang", "male", 20));
    a.push_back(Executive(1, "a", "male", 28));
    a.push_back(Executive(3, "b", "male", 22));
    a.push_back(Executive(4, "c", "male", 29));
    a.push_back(Executive(5, "d", "male", 22));
    for (int i = 0; i < a.size(); i++)
    {
        cout << "-----Executive " << i + 1 << endl;
        a[i].who();
    }
    cout << "---------- Person ----------" << endl;
    vector<Person> b;
    b.push_back(Person(12, "Justin", "male"));
    b.push_back(Person(1, "Julia", "female"));
    b.push_back(Person(3, " Antonio", "female"));
    b.push_back(Person(4, "Kendall", "female"));
    b.push_back(Person(5, "Hailey", "female"));
    for (int i = 0; i < b.size(); i++)
    {
        cout << "-----Person " << i + 1 << endl;
        b[i].who();
    }
};