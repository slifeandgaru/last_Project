#include "Animal.cpp"
#include "Lion.cpp"
#include "Aardvark.cpp"
int main()
{
    Lion lion("Leo", 400);
    lion.who();
    Aardvark aardvark("Algernon", 50);
    aardvark.who();
    return 0;
};