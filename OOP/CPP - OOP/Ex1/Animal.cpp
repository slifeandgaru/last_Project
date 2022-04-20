#pragma once
#include <iostream>
using namespace std;

class Animal
{
private:
    string name;
    double weight;

public:
    Animal(){};
    Animal(string name, double weight)
    {
        this->name = name;
        this->weight = weight;
    }
    void setName(string name) { this->name = name; }
    void setWeight(double weight) { this->weight = weight; }
    string getName() { return name; }
    double getWeight() { return weight; }

protected:
    void who()
    {
        cout << "Name: " << name << endl;
        cout << "Weight: " << weight << " pounds" << endl;
    }
};