#include "Person.cpp"
using namespace std;
class Executive : public Person
{
private:
    int member;

public:
    Executive(){};
    Executive(int age, string name, string gender, int member) : Person(age, name, gender)
    {
        this->member = member;
    }
    void setMember(int member)
    {
        this->member = member;
    };
    int getMember()
    {
        return this->member;
    };
    void who()
    {
        Person::who();
        cout << "Member: " << member << endl;
    }
};
