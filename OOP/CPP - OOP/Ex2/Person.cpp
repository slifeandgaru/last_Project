#pragma once

#include <iostream>

using namespace std;

class Person
{
private:
    int age;
    string name;
    string gender;

public:
    Person(){};
    Person(int age, string name, string gender)
    {
        this->age = age;
        this->name = name;
        this->gender = gender;
    }
    void setName(string name)
    {
        this->name = name;
    }
    void setGender(string gender)
    {
        this->gender = gender;
    }
    void setAge(int age)
    {
        this->age = age;
    }
    string getName()
    {
        return name;
    }
    string getGender()
    {
        return gender;
    }
    int getAge() { return age; }
    void who()
    {
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "Gender: " << gender << endl;
    }
};
