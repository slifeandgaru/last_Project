#include "Person.cpp"
using namespace std;
class Employee : public Person
{
private:
    int member;

public:
    Employee(){};
    Employee(int age, string name, string gender, int member) : Person(age, name, gender)
    {
        this->member = member;
    }
    void who()
    {
        Person::who();
        cout << "Member: " << member << endl;
    }
};
