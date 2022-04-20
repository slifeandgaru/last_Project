#include "Animal.cpp"

using namespace std;

class Aardvark : public Animal
{
public:
    Aardvark(){};
    Aardvark(string name, double weight) : Animal(name, weight){};
    void who()
    {
        Animal::who();
    }
};