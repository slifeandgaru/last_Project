#include "Animal.cpp"

using namespace std;

class Lion : public Animal
{
public:
    Lion(){};
    Lion(string name, double weight) : Animal(name, weight){};
    void who()
    {
        Animal::who();
    }
};